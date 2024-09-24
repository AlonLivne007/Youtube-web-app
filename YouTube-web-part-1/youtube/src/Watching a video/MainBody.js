import { useState, useEffect } from "react";
import Comments from "./Comments";
import Video from "./Video";

function MainBody({ currentVideo, currentUser, updateComments, deleteVideo, updateVideoDetails }) {

    //state of comments of the videos displayed
    const [commentsList, setComments] = useState(currentVideo.comments);

    //use effect to change the comments to be the currentVideo's comments
    useEffect(() => {
        setComments(currentVideo.comments);
    }, [currentVideo]);

    //add comment function
    const addComment = (newComment) => {
        const updatedComments = [...commentsList, newComment];
        setComments(updatedComments);
        updateComments(currentVideo.videoUrl, updatedComments);
    }

    //delete comment function
    const deleteComment = (commentIndex) => {
        //filter function to keep all the other comments
        const updatedComments = commentsList.filter((_, index) => index !== commentIndex);

        //update comments
        setComments(updatedComments);
        updateComments(currentVideo.videoUrl, updatedComments);
    };

    //edit comment function
    const editComment = (commentIndex, newText) => {
        const updatedComments = commentsList.map((comment, index) =>
            index === commentIndex ? { ...comment, text: newText } : comment
        );
        setComments(updatedComments);
        updateComments(currentVideo.videoUrl, updatedComments);
    };

    return (
        <div className="col-md-8">
            <Video currentVideo={currentVideo} currentUser={currentUser} deleteVideo={deleteVideo} updateVideoDetails={updateVideoDetails}/>
            <Comments comments={commentsList} currentUser={currentUser} addComment={addComment} deleteComment={deleteComment} editComment={editComment}/>
        </div>
    );
}
export default MainBody;