import React, { useState, useEffect, useRef } from 'react';

function Comments({ comments, currentUser, addComment, deleteComment, editComment }) {
    //state of three dots - open or not
    const [openCommentId, setOpenCommentId] = useState(null);

    //state of a new comment
    const [newComment, setNewComment] = useState('');

    //state of adding a new comment
    const [isAddingComment, setIsAddingComment] = useState(false);

    //state of editing an existing comment
    const [isEditingComment, setIsEditingComment] = useState(null);

    //state of the edited comment text
    const [editCommentText, setEditCommentText] = useState('');

    // ref for the three dots menu
    const menuRef = useRef(null);

    //function to handle click outside the menu
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenCommentId(null);
        }
    };

    useEffect(() => {
        if (openCommentId !== null) {
            //add a slight delay before adding the event listener to prevent immediate closing
            const timer = setTimeout(() => {
                document.addEventListener("click", handleClickOutside);
            }, 0);

            //clean up the timeout if the component unmounts or openCommentId changes
            return () => clearTimeout(timer);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [openCommentId]);

    //function to handle three dots click
    const handleThreeDotsClick = (index, event) => {
        event.stopPropagation(); // Prevent the event from propagating to the document
        if (currentUser.username === "username") {
            alert("You need to log in to edit comments!");
            return;
        }
        setOpenCommentId(openCommentId === index ? null : index);
    };

    //function to handle add comment click
    const handleAddComment = () => {
        if (currentUser.username === "username") {
            alert("You need to log in to add a new comment!");
            return;
        }
        if (newComment.trim() !== '') {
            addComment({
                username: currentUser.username,
                avatar: currentUser.avatar,
                text: newComment,
            });
            setNewComment('');
            setIsAddingComment(false);
        }
    };

    //function to handle cancel adding a new comment click
    const handleCancelComment = () => {
        setNewComment('');
        setIsAddingComment(false);
    };

    //function to handle clicking on edit in three dots opening menu
    const handleEditComment = (index, text) => {
        setIsEditingComment(index);
        setEditCommentText(text);
    };

    //function to handle saving the comment after editing
    const handleSaveEditComment = (index) => {
        editComment(index, editCommentText);
        setIsEditingComment(null);
        setEditCommentText('');
    };

    //function to handle canceling the comment when editing
    const handleCancelEditComment = () => {
        setIsEditingComment(null);
        setEditCommentText('');
    };

    return (
        <div className="comment-section">
            <h4>Comments</h4>
            <div className="new-comment-section">
                <div className="new-comment-input d-flex mb-3">
                    <img src={currentUser.avatar} alt="User Avatar" width="40" height="40" className="mr-2" />
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        onFocus={() => setIsAddingComment(true)}
                    />
                </div>
                {isAddingComment && (
                    <div className="new-comment-actions d-flex justify-content-end mt-2">
                        <button onClick={handleCancelComment} className="btn btn-secondary mr-2">Cancel</button>
                        <button onClick={handleAddComment} className="btn btn-primary">Comment</button>
                    </div>
                )}
            </div>
            {comments.map((comment, index) => (
                <div className="comment d-flex mb-3" key={index}>
                    <img src={comment.avatar} alt="User Avatar" width="40" height="40" className="mr-2" />
                    <div className="comment-content">
                        <div className="username">{comment.username}</div>
                        {isEditingComment === index ? (
                            <div className="edit-comment">
                                <input
                                    type="text"
                                    value={editCommentText}
                                    onChange={(e) => setEditCommentText(e.target.value)}
                                    placeholder="Edit your comment..."
                                />
                                <div className="edit-comment-actions d-flex justify-content-end mt-2">
                                    <button onClick={handleCancelEditComment} className="btn btn-secondary mr-2">Cancel</button>
                                    <button onClick={() => handleSaveEditComment(index)} className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        ) : (
                            <div className="text">{comment.text}</div>
                        )}
                        <i className="bi bi-three-dots" onClick={(event) => handleThreeDotsClick(index, event)}></i>
                        <div>
                            {openCommentId === index && (
                                <div className="three-dots-menu" ref={menuRef}>
                                    <ul>
                                        <li className='three-dots-option' onClick={() => handleEditComment(index, comment.text)}>Edit comment</li>
                                        <li className='three-dots-option' onClick={() => deleteComment(index)}>Delete comment</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Comments;
