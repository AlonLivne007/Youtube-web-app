import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Video.css';
import IconsLeft from './IconsLeft';
import WatchSearchBar from './WatchSearchBar';
import IconsRight from './IconsRight';
import SideBar from './SideBar';
import MainBody from './MainBody';

function VideoContainer({ videosList, currentVideo, changeVideo, currentUser, defualtUser, handleSignOut, updateComments, deleteVideo, updateVideoDetails, searchQuery, handleSearch }) {
    return (
        <>
            <header className="header d-flex justify-content-between align-items-center">
                <IconsLeft currentUser={currentUser} defualtUser={defualtUser} handleSignOut={handleSignOut}/>
                <WatchSearchBar searchQuery={searchQuery} handleSearch={handleSearch}/>
                <IconsRight currentUser={currentUser} defualtUser={defualtUser} handleSignOut={handleSignOut} /> 
            </header>
            <div className="container-fluid mt-4">
                <div className="row">
                    <MainBody currentVideo={ currentVideo } currentUser={currentUser} updateComments={updateComments} deleteVideo={deleteVideo} updateVideoDetails={updateVideoDetails}/>
                    <SideBar videosList={ videosList } changeVideo={changeVideo}/>
                </div>
            </div>
        </>
    );
}

export default VideoContainer;