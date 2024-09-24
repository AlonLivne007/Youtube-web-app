import React from 'react';
import '../Watching a video/SideBar.css';
import './Home.css'
import SideBarVideo from '../Watching a video/SideBarVideo.js';

function HomeVideosList({ videosList, changeVideo }) {
    //function that creates video elements
    const videoList = videosList.map((video, key) => {
        return <SideBarVideo video = {video} key = {key} changeVideo = {changeVideo} />
    });

    return (
        // change here
            <div className="video-grid">
                {videoList}
            </div>
    );
}

export default HomeVideosList;