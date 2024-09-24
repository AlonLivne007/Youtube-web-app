import React, { useState } from "react";

function UploadImage({uploadNewDisImage}) {
    //state of preview of the user input
    const [preview, setPreview] = useState(null);

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            uploadNewDisImage(reader.result);
        };
        reader.readAsDataURL(file);
    };
    return (
        <>
            <label htmlFor="upload-input" className="upload-label">Upload a preview image - optional</label>
            <input type="file" id="upload-input-img" className="upload-input"/>
            {preview && <img src={preview} alt="Image Preview" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />}
        </>
    );
}

export default UploadImage;
