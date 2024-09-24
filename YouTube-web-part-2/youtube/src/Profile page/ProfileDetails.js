import axios from "axios";
import { useEffect, useState, useRef } from "react";
import './ProfilePage.css';
import { useNavigate } from "react-router-dom";

function ProfileDetails({ currentVideo }) {
    //fetch the user state and useEffect hook to render it
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    //useRef hook to make the useEffect hook render once
    const alertShownRef = useRef(false);

    useEffect(() => {
        const fetchUser = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:80/api/users/${userId}`);
                const user = response.data.loggedInUser;
                if (!user) {
                    if (!alertShownRef.current) {
                        alert("User isn't a member of our community anymore");
                        alertShownRef.current = true;
                    }
                    navigate('/video');
                    return;
                }
                setUser(user);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        //reset alertShownRef when userId changes
        if (currentVideo.userId) {
            alertShownRef.current = false;
            fetchUser(currentVideo.userId);
        }
    }, [currentVideo.userId, navigate]);

    return (
        <div className="profile-details text-center">
            <img src={user.avatar} alt="Channel Avatar" className="profile-avatar" />
            <div className="profile-info">
                <div className="username">{user.username}</div>
                <div className="subscribers">{currentVideo.subscribers} subscribers</div>
                <div className="welcome-message">
                    <b>Welcome to {user.nickname}'s profile page!</b>
                </div>
            </div>
        </div>
    );
}

export default ProfileDetails;
