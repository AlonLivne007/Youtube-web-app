import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import videos from './database/videosList.json'
import axios from 'axios';

export const VideosStates = () => {
    //state of list of videos
    const [videosList, setVideosList] = useState([]);

    //function to fetch videos from user
    const fetchVideos = async () => {
        try {
            //send a get request to fetch videos from server
            const response = await axios.get('http://localhost:80/api/videos');
            //check if valid info was fetched
            if (Array.isArray(response.data.videos)) {
                setVideosList(response.data.videos);
            } else {
                console.error('Fetched videos data is not an array:', response.data.videos);
            }
        }
        catch (error) {
            console.error('Error message:', error.message);
        }
    };

    //function to get a video from the server
    const fetchVideo = async (userId, videoId) => {
        try {
            //send a get request to fetch a video from server
            const response = await axios.get(`http://localhost:80/api/users/${userId}/videos/${videoId}`);
            const video = response.data.video;
            //make URL fully qualified
            video.videoUrl = `http://localhost:80${video.videoUrl}`; 
            return video;
        } catch (error) {
            console.error(`Error fetching video with ID: ${videoId} - ${error.message}`);
        }
    };

    //call the function in hook
    useEffect(() => {
        //call the function in the hook
        fetchVideos();
        // console.log(videosList);
    }, []);

     //default new video object - only to prevent runtime errors
     const newVideo = {
        likes: 0,
        title: "no video chosen",
        description: "go to home page and choose a video",
        videoUrl: "",
        artist: "If you see this, you tried to crash my app :(",
        avatar: "",
        subscribers: 0,
        views: 0,
        time: new Date(),
        _id: ""
    };

    //retrieve video from localStorage on component mount
    const savedVideo = localStorage.getItem('currentVideo');
    const initialVideo = savedVideo ? JSON.parse(savedVideo) : newVideo;

    //state of currnet video that plays
    const defualtVideo = videosList[0];
    const [currentVideo, setCurrentVideo] = useState(initialVideo);

    //function to add videos
    const addVideo = async (videoFile, videoBody) => {
        try {
            //fetch token from local storage
            const token = localStorage.getItem('token');

            //create FormData object
            const formData = new FormData();

             //ensure video matches the field name in multer setup
            formData.append('video', videoFile);

            //add additional video details to the FormData object
            for (const key in videoBody) {
                formData.append(key, videoBody[key]);
            }

            //send a post request to the server with FormData to add video
            const response = await axios.post(`http://localhost:80/api/users/${videoBody.userId}/videos`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Error message:', error.message);
        }
        //fetch videos when finished
        fetchVideos();
    }


    //function to change the currnet video
    const changeVideo = (clickedOnVideo) => {
        setCurrentVideo(clickedOnVideo);
    }

    //function to update comments - not in use
    const updateComments = (videoUrl, newComments) => {
        //lambada function to update the comments of the specific video that was changed
        const updatedVideosList = videosList.map(video =>
            video.videoUrl === videoUrl ? { ...video, comments: newComments } : video
        );

        //update video list and the current video
        setVideosList(updatedVideosList);
        setCurrentVideo(updatedVideosList.find(video => video.videoUrl === videoUrl));
    };

    const deleteVideo = async (videoId, userId) => {
        try {
            //fetch token from storage
            const token = localStorage.getItem('token');

            //call delete request with the id in the request
            const response = await axios.delete(`http://localhost:80/api/users/${userId}/videos/${videoId}`, {  
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
              
            //call fetch videos to set the videos list to be the updated
            fetchVideos();

            //set the current video to be the first in the list
            setCurrentVideo(videosList[0]);
        }
        catch (error) {
            console.error('Error message:', error.message);
        }
    }

    const updateVideoDetails = async (videoId, newDetails, currentUser) => { 
    try{
        //fetch token from storage
        const token = localStorage.getItem('token');

        //call a put request with the id and the details
        const response = await axios.put(`http://localhost:80/api/users/${currentUser._id}/videos/${videoId}`, newDetails ,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        //fetch the updated video details
        const updatedVideo = await fetchVideo(currentUser._id, videoId); //check if works
        setCurrentVideo(updatedVideo); // Ensure this sets the video correctly

        //store updated video in local storage
        localStorage.setItem('currentVideo', JSON.stringify(updatedVideo));
        console.log('Updated video details:', updatedVideo);
    }
    catch(error){
        console.error('Error message:', error.message);
    }
};

//function video by id
const featchVideosByID = async (userId) => {
    try {
        //send a get request to fetch videos of a specific user
        const response = await axios.get(`http://localhost:80/api/users/${userId}/videos`);
        //ensure video URLs are fully qualified
        const videos = response.data.videos.map(video => {
            video.videoUrl = `http://localhost:80${video.videoUrl}`;
            return video;
        });        
        return videos;
    } catch (error) {
        console.error('Error message:', error.message);
    }
}
    return { videosList, currentVideo, defualtVideo, addVideo, changeVideo, updateComments, deleteVideo, updateVideoDetails, featchVideosByID, setVideosList, setCurrentVideo};
};

