import { useState, useEffect } from "react";
import Comments from "./Comments";
import Video from "./Video";
import axios from "axios";

function MainBody({ currentVideo, currentUser, deleteVideo, updateVideoDetails, setVideosList, setCurrentVideo, videosList, changeVideo }) {
    //state of comments of the videos displayed
    const [commentsList, setComments] = useState([]);

    //fetch comments by Id of video
    const getCommentsByVideoId = async (videoId) => {
        try {
            const response = await axios.get(`http://localhost:80/api/videos/${videoId}/comments`);
            const newCommenstList = response.data.comments;
            setComments(newCommenstList);
        } catch (error) {
            console.error('Error message:', error.message);
        }
    };

    //use effect to change the comments to be the currentVideo's comments
    useEffect(() => {
        getCommentsByVideoId(currentVideo._id);
    }, []);

    //add comment function
    const addComment = async (newComment) => {
        try {
            //fetch token from storage
            const token = localStorage.getItem('token');

            //send post request to server
            const response = await axios.post(`http://localhost:80/api/videos/${currentVideo._id}/comments/${currentUser._id}`, newComment , {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            //update the comment list
            const updatedComments = [...commentsList, response.data.comment];
            setComments(updatedComments);
        } catch (error) {
            console.error('Error message:', error.message);
        }
    };


    //delete comment function
    const deleteComment = async (commentId) => {
        try {

            const token = localStorage.getItem('token');

            //delete the comment from the server
            const response = await axios.delete(`http://localhost:80/api/videos/${currentUser._id}/${currentVideo._id}/comments/${commentId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            //if successful, update the list
            if (response.status === 200) {
                //filter out the deleted comment from the comments list
                const updatedComments = commentsList.filter(comment => comment._id !== commentId);

                //update the state with the filtered list
                setComments(updatedComments);
            } else {
                console.error('Failed to delete comment, server responded with status:', response.status);
            }
        } catch (error) {
            console.error('Error message:', error.message);
        }
    };

    //edit comment function
    const editComment = async (commentId, newContent) => {

        const token = localStorage.getItem('token');

        try {
            const response = await axios.put(`http://localhost:80/api/videos/${currentUser._id}/${currentVideo._id}/comments/${commentId}`, { content: newContent }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            //if successful, update the list
            if (response.status === 200) {
                //extract the updated comment from the response
                const updatedComment = response.data.updatedComment;

                //map over the comments list and update the specific comment
                const updatedComments = commentsList.map(comment =>
                    comment._id === commentId ? updatedComment : comment
                );

                // Update the state with the updated list
                setComments(updatedComments);
            } else {
                console.error('Failed to edit comment, server responded with status:', response.status);
            }
        } catch (error) {
            console.error('Error message:', error.message);
        }
    };

    return (
        <div className="col-md-8">
            <Video currentVideo={currentVideo} currentUser={currentUser} deleteVideo={deleteVideo} updateVideoDetails={updateVideoDetails} changeVideo={changeVideo}/>
            <Comments comments={commentsList} currentUser={currentUser} addComment={addComment} deleteComment={deleteComment} editComment={editComment} />
        </div>
    );
}
export default MainBody;