import React from 'react';
import './AddVideoContainer.css'
import { VerifyVideo } from './VerifyNewVideo.js';
import { useNavigate } from 'react-router-dom';

function AddVideoButton({ addVideo, videoList, newVideo, currentUser, displayImage }) {

    //function to handle click on the add video
    const handleAddVideoClick = () => {
        var valid = VerifyVideo({ currentUser, newVideo });
        if(valid){
            const video = createNewVideo();
            addVideo(video);
            navigateToVideo();
        }
    };

    //function to create a new video
    const createNewVideo = () => {
        var title = document.getElementById("title-input").value;
        var artist = currentUser.username;
        var views = "0";
        var time = "0";
        var subscribers = "0";
        var likes = 0;
        var description = document.getElementById("description-input").value;
        var image = displayImage;
        var avatar = currentUser.avatar;
        var videoUrl = newVideo;
        var comments = [];

        return {title, artist, views, time, subscribers, likes, description, image, avatar, videoUrl, comments};
    }

    //function to navigate to video page - need to change to home!
    const navigate = useNavigate();
    const navigateToVideo = () => {
        navigate('/video');
          };

    return (
        <>
            <div className="Dubi">
                <button className="add-button" onClick={handleAddVideoClick}>Add Video</button>
            </div>
        </>
    );
}

export default AddVideoButton;