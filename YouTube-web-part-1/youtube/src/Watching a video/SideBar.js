import React from 'react';
import './SideBar.css';
import SideBarVideo from './SideBarVideo.js';

function SideBar({ videosList, changeVideo }) {
    //function that creates video elements
    const videoList = videosList.map((video, key) => {
        return <SideBarVideo video = {video} key = {key} changeVideo = {changeVideo} />
    });

    return (
        <div className="col-md-4">
            <div className="sidebar">
                {videoList}
            </div>
        </div>
    );
}

export default SideBar;