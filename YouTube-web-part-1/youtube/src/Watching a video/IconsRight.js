import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './IconsRight.css';

function IconsRight({ currentUser, defualtUser, handleSignOut }) {
    //useState of the avatar menu
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    //function to open and close avatar menu
    const handleAvatarClick = () => {
        setIsOptionsOpen(!isOptionsOpen);
    };

    //function to navigate to add new video page
    const navigate = useNavigate();
    const handleButtonClick = () => {
        if(currentUser.username === "username"){
            navigate('/');
            return;
        };
        navigate('/add');
    };

    //function to navigate to sign in page
    const handnleSignInClick = () => {
        navigate('/');
    };

    //function to navigate to sign up page
    const handleRegisterClick = () => {
        navigate('/signup');
    };

    //function to sign out
    const handleSignOutClick = () => {
        handleSignOut(defualtUser);
        navigate('/');
    }
    return (
        <div className="d-flex align-items-center position-relative">
            <i className="bi bi-camera-video text-white mx-2 button-like" onClick={handleButtonClick} style={{ fontSize: '1.5rem' }}></i>
            <div className="avatar mx-2" onClick={handleAvatarClick}>
                <img src={currentUser.avatar} alt="Avatar" />
            </div>
            {isOptionsOpen && (
                <div className="options-menu">
                    <ul>
                        <li>Hello {currentUser.nickname}!</li>
                        <li onClick={handnleSignInClick}>Sign in</li>
                        <li onClick={handleRegisterClick}>Join us</li>
                        <li onClick={handleSignOutClick}>Sign out</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default IconsRight;
