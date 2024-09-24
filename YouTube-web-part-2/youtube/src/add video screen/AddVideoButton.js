import React from 'react';
import './AddVideoContainer.css'
import { VerifyVideo } from './VerifyNewVideo.js';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

function AddVideoButton({ addVideo, videoList, newVideo, currentUser, displayImage }) {
    //state of token with useEffect hook to render it from the local storage
    const [jwt, setJwt] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwt(token);
    }, []);


    //function to handle click on the add video
    const handleAddVideoClick = () => {
        var valid = VerifyVideo({ currentUser, newVideo, jwt });
        if (valid) {
            const videoObject = createNewVideo();
            addVideo(newVideo, videoObject);
            navigateToVideo();
        }
    };

    //function to create a new video
    const createNewVideo = () => {
        var userId = currentUser._id;
        var title = document.getElementById("title-input").value;
        var artist = currentUser.username;
        var views = 0;
        var subscribers = 0;
        var likes = 0;
        var description = document.getElementById("description-input").value;
        var avatar = currentUser.avatar;
        var comments = "[]";

        //return a new video object
        return { userId, title, artist, views, subscribers, likes, description, avatar, comments };
    }

    //function to navigate to home page
    const navigate = useNavigate();
    const navigateToVideo = () => {
        navigate('/home');
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