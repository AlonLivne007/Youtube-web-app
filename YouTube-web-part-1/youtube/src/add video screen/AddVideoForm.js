import React from "react";
import './AddVideoContainer.css'

function AddVideoForm() {
    return (
        <>
            {/* enter video title */}
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="title-input" placeholder="title" />
                <label htmlFor="floatingInput">Title</label>
            </div>
            {/* enter video description */}
            <div className="form-floating">
                <input type="text" className="form-control" id="description-input" placeholder="description" />
                <label htmlFor="floatingInput">Description</label>
            </div>
        </>
    );
}

export default AddVideoForm;