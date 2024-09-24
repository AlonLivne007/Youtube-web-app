import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './FloatingMenu.css';

function FloatingMenu({ isOpen, onClose, currentUser, handleSignOut, defualtUser }) {
    //state for theme 
    const [isDarkTheme, setIsDarkTheme] = useState(false); 

    //function to change theme 
    const handleThemeChange = () => {
        setIsDarkTheme(!isDarkTheme);
        document.body.classList.toggle('dark-theme', !isDarkTheme);
    };

    //use navigate to move to different pages
    const navigate = useNavigate();

    //handle login page click
    const handleLoginClick = () => {
        navigate('/');
    }

    //handle add video page
    const uploadVideoClick = () => {
        //if not logged in, go to sign in page
        if(currentUser.username === "username"){
            navigate('/');
            return;
        }
        navigate('/add');
    }

    //function to sign out
    const handleSignOutClick = () => {
        handleSignOut(defualtUser);
        navigate('/');
    }

    if (!isOpen) return null;

    return (
        <div className="floating-menu">
            <div className="menu-content">
                <button className="close-button" onClick={onClose}>×</button>
                <ul className="menu-list">
                    <li><i>Profile</i></li>
                    <li><i className="bi bi-person-circle"></i> {currentUser.username}</li>
                    <li><i className="bi bi-person-raised-hand"></i> {currentUser.nickname}</li>
                    <li><i>Actions</i></li>
                    <li onClick={handleLoginClick}><i className="bi bi-box-arrow-in-right"></i> Log in</li>
                    <li onClick={handleSignOutClick}><i className="bi bi-box-arrow-in-left"></i> Log out</li>
                    <li onClick={uploadVideoClick}><i className="bi bi-download"></i> Upload video</li>
                    <li onClick={handleThemeChange}><i className="bi bi-moon-stars-fill"></i> Change mode</li>
                    <li><i>Help and more</i></li>
                    <li><i className="bi bi-question-circle"></i> Help</li>
                    <li><i className="bi bi-gear"> Settings</i></li>
                </ul>
            </div>
        </div>
    );
}

export default FloatingMenu;
