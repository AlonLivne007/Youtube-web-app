import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './FloatingMenu.css';
import axios from 'axios';

function FloatingMenu({ isOpen, onClose, currentUser, handleSignOut, defualtUser, handleDeleteUser, setCurrentUser }) {
    //state of token with useEffect hook to render it from the local storage
    const [jwt, setJwt] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwt(token);
    }, []);

    //states for editing nickname
    const [isEditing, setIsEditing] = useState(false);
    const [newNickname, setNewNickname] = useState(currentUser.nickname);

    //states for editing avatar
    const [newAvatar, setNewAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(currentUser.avatar);

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
        if (jwt === 'null' || !jwt) {
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

    //function to handle the avatar change
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        setNewAvatar(file);
        setPreviewAvatar(URL.createObjectURL(file));
    }

    //use the deleteUser function in an onClick function and send to the button
    const handleDeleteUserClick = () => {
        //delete user if one is logged in
        if (jwt === 'null' || !jwt) {
            alert("You need to log in to delete user");
            return;
        }
        //delete the current user from the list
        handleDeleteUser(currentUser);

        //sign out - sign the defualt user in
        handleSignOut(defualtUser);
        navigate('/');
    }

    //function to handle the edit button click
    const handleEditClick = () => {
        //check if user is logged in
        if (jwt === 'null' || !jwt) {
            alert('You need to log in to edit your profile!');
            return;
        }
        setIsEditing(true);
    }

    //function to handle cancel edit click
    const handleCancelEditClick = () => {
        setNewNickname(currentUser.nickname);
        setIsEditing(false);
    }

    //function to save the provided details
    const handleSaveEditClick = async () => {
        try {
            //fetch token from storage
            const token = localStorage.getItem('token');

            //create a form data object to add to request
            const formData = new FormData();
            formData.append('nickname', newNickname);
            if (newAvatar) {
                formData.append('avatar', newAvatar);
            }

            //send a put request to server
            const response = await axios.put(`http://localhost:80/api/users/${currentUser._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
            });
            //set the currentUser to be the new edited one
            setCurrentUser(response.data.user);

            //save the user in local storage
            localStorage.setItem('currentUser', JSON.stringify(response.data.user));
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }

    //only if isOpen is true open the menu
    if (!isOpen) return null;
    return (
        <div className="floating-menu">
            <div className="menu-content">
                <button className="close-button" onClick={onClose}>×</button>
                <ul className="menu-list">
                    <li><i>Profile</i></li>
                    <li><i className="bi bi-person-circle"></i> {currentUser.username}</li>
                    <li><i className="bi bi-person-raised-hand"></i> {currentUser.nickname}</li>
                    <li>
                        <i className="bi bi-gear"> Edit your profile</i>
                        {isEditing ? (
                            <div>
                                <input type="text" value={newNickname} onChange={(e) => setNewNickname(e.target.value)} />
                                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                                {previewAvatar && <img src={previewAvatar} alt="avatar preview" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
                                <button onClick={handleSaveEditClick}>Save</button>
                                <button onClick={handleCancelEditClick}>Cancel</button>
                            </div>
                        ) : (
                            <button onClick={handleEditClick}>Edit</button>
                        )}
                    </li>
                    <li><i>Actions</i></li>
                    <li onClick={handleLoginClick}><i className="bi bi-box-arrow-in-right"></i> Log in</li>
                    <li onClick={handleSignOutClick}><i className="bi bi-box-arrow-in-left"></i> Log out</li>
                    <li onClick={uploadVideoClick}><i className="bi bi-download"></i> Upload video</li>
                    <li onClick={handleThemeChange}><i className="bi bi-moon-stars-fill"></i> Change mode</li>
                    <li onClick={handleDeleteUserClick}><i className="bi bi-person-x"></i> Delete user</li>
                    <li><i>Help and more</i></li>
                    <li><i className="bi bi-question-circle"></i> Help</li>
                </ul>
            </div>
        </div>
    );
}

export default FloatingMenu;
