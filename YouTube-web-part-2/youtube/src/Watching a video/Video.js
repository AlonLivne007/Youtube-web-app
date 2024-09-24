import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

function Video({ currentVideo, currentUser, deleteVideo, updateVideoDetails, changeVideo }) {
    //state of token with useEffect hook to render it from the local storage
    const [jwt, setJwt] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJwt(token);
    }, []);

    //state of like button
    const [likeButton, setLikeButton] = useState(false);

    //state of three dots
    const [ThreeDots, setThreeDots] = useState(false);

    //state of counting likes
    const [likesCount, setLikesCount] = useState(currentVideo.likes);

    //states for editing title and description
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(currentVideo.title);
    const [editedDescription, setEditedDescription] = useState(currentVideo.description);

    //useref element
    const menuRef = useRef(null);

    //useref function
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setThreeDots(false);
        }
    };

    //listener function
    useEffect(() => {
        if (ThreeDots) {
            //add a slight delay before adding the event listener to prevent immediate closing
            const timer = setTimeout(() => {
                document.addEventListener("click", handleClickOutside);
            }, 0);

            //clean up the timeout if the component unmounts or ThreeDots changes
            return () => clearTimeout(timer);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ThreeDots]);

    //useEffect to update likesCount when currentVideo changes
    useEffect(() => {
        setLikesCount(currentVideo.likes);
    }, [currentVideo]);

    //function to handle like click
    const handleLikeClick = () => {
        //if like button is pressed and there was no like before, add 1
        if (!likeButton) {
            setLikesCount(likesCount + 1);
        }
        else {
            setLikesCount(likesCount - 1);
        }
        setLikeButton(!likeButton);
    };

    //function to handle share click
    const handleShare = () => {
        const shareData = {
            title: currentVideo.title,
            text: `Check out this video: ${currentVideo.title}`,
            url: currentVideo.videoUrl,
        };

        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Video shared successfully!'))
                .catch((error) => console.log('Error sharing video:', error));
        } else {
            //if browser does not support this action
            alert('Web Share API is not supported in your browser. Please copy the link manually.');
            console.log('Share data:', shareData);
        }
    };

    //function to handle three dots click
    const handleThreeDotsClick = (event) => {
        //prevent the event from propagating to the document
        event.stopPropagation(); 
        //check if user is logged in
        if (jwt === 'null' || !jwt) {
            alert("You need to log in to edit videos!");
            return;
        }

        //check if user is the user that uploaded the video
        if (currentUser.username !== currentVideo.artist) {
            alert("You cannot update or delete a video that isn't yours!");
            return;
        }
        setThreeDots(!ThreeDots);
    };

    //function to handle delete function
    const handleDeleteVidClick = () => {
        deleteVideo(currentVideo._id, currentUser._id);
        setThreeDots(false);
    }

    //function to handle download click
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = currentVideo.videoUrl;
        link.download = currentVideo.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    //function to handle edit video click
    const handleEditVideo = () => {
        setIsEditing(true);

        //close the menu when editing starts
        setThreeDots(false);
    };

    //function to handle save edit click
    const handleSaveEdit = () => {
        //use the outer function to edit the videos details
        updateVideoDetails(currentVideo._id, { title: editedTitle, description: editedDescription }, currentUser); //check if works
        setIsEditing(false);
        setThreeDots(false);
    };

    //function to handle cancel edit click
    const handleCancelEdit = () => {
        //close the editing menu
        setIsEditing(false);

        //set the fields of the video to their original
        setEditedTitle(currentVideo.title);
        setEditedDescription(currentVideo.description);
    };

    //function to navigate to profile page
    const navigate = useNavigate();
    const handleProfileClick = () => {
        navigate('/profile');
    };

    //function to display date in dd/mm/yy format
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    return (
        <>
            <div className="video-player mb-3">
                <video src={currentVideo.videoUrl} controls width="100%" frameBorder="0" allowFullScreen type="video/mp4"></video>
            </div>
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <>
                    <h3 className="video-title">{currentVideo.title}</h3>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="details d-flex align-items-center" onClick={handleProfileClick}>
                            <img src={currentVideo.avatar} alt="Channel Avatar" className="mr-2" width="50" height="50" />
                            <div>
                                <div>{currentVideo.artist}</div>
                                <div>{currentVideo.subscribers} subscribers</div>
                            </div>
                        </div>
                        <div className="video-actions">
                            <div className="like-count" onClick={handleLikeClick}>
                                <i className={likeButton ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"}></i>
                                <span>{likesCount}</span>
                            </div>
                            <i className="bi bi-share" onClick={handleShare}> Share</i>
                            <i className="bi bi-download" onClick={handleDownload}> Download</i>
                            <i className="bi bi-three-dots" onClick={handleThreeDotsClick}></i>
                            {ThreeDots && (
                                <div className="options-menu" ref={menuRef}>
                                    <ul>
                                        <li onClick={handleEditVideo}>Edit video</li>
                                        <li onClick={handleDeleteVidClick}>Delete video</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="descriptin-head">
                        {currentVideo.views} views • {formatDate(currentVideo.time)}
                    </div>
                    <div className="descriptin">
                        {currentVideo.description}
                    </div>
                </>
            )}
        </>
    );
}

export default Video;
