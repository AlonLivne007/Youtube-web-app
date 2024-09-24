import './AddVideoContainer.css';
import Logo from './logo.png';
import AddVideoForm from './AddVideoForm.js'
import AddVideoButton from './AddVideoButton.js';
import AddVideoLogo from './AddVideoLogo.js';
import UploadVideo from './UploadVideo.js';
import UploadImage from './UploadImage.js';
import { useState } from 'react';

function AddVideoContainer({ addVideo, videoList, currentUser }) {
    //state of newVideo
    const [newVideo, setNewVideo] = useState(null);

    //state of new display image
    const [newDisplayImage, setNewDisImage] = useState('./localPhotos/stamLogo.png');

    //function to add the video to the state
    const uploadNewVideo = (newVideo) => {
        setNewVideo(newVideo);
    }

    return (
        <>
            <div className="container-rec">
                <div className="inner-container form-container">
                    <AddVideoForm />
                    <AddVideoButton addVideo={addVideo} videoList={videoList} newVideo={newVideo}
                        currentUser={currentUser} displayImage={newDisplayImage} />
                </div>
                <div className="image-container">
                    <AddVideoLogo />
                    <UploadVideo uploadNewVideo={uploadNewVideo} />
                </div>
            </div>
        </>
    );
}

export default AddVideoContainer;
