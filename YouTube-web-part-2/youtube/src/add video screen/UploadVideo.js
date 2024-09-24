import React, { useState } from "react";

function UploadVideo({ uploadNewVideo }) {
    //state of preview of the user input
    const [preview, setPreview] = useState(null);

    //function to handle video upload
    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        //preview the video using a URL
        setPreview(URL.createObjectURL(file));
        //pass the file object
        uploadNewVideo(file);
    };
    return (
        <>
            <label htmlFor="upload-input" className="upload-label">Upload your video</label>
            <input type="file" id="upload-input" className="upload-input" onChange={handleVideoChange} />
            {preview && <video src={preview} alt="Video Preview" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />}
        </>

    );
}

export default UploadVideo;
