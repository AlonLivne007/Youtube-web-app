import React, { useState } from "react";

function RegistUpload({imageUpload}) {
  //state for preview of uploaded avatar
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      imageUpload(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="upload-container">
      <label htmlFor="upload-input" className="upload-label">Upload Profile Picture</label>
      <input type="file" id="upload-input" className="upload-input" onChange={handleImageChange} />
      {preview && <img src={preview} alt="Profile Preview" style={{ width: "100px", height: "100px", borderRadius: "50%" }} />}
    </div>
  );

}

export default RegistUpload;