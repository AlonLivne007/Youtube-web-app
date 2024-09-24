import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../Watching a video/Video.css';
import IconsLeft from '../Watching a video/IconsLeft';
import WatchSearchBar from '../Watching a video/WatchSearchBar';
import IconsRight from '../Watching a video/IconsRight';
import HomeVideosList from './HomeVideosList';

function HomeContainer({ videosList, currentVideo, changeVideo, currentUser, defualtUser, handleSignOut, handleDeleteUser, updateComments, deleteVideo, updateVideoDetails, searchQuery, handleSearch, setCurrentUser }) {
    //function to filter 20 videos from the list - 10 most viewed, and 10 random
    const getTopAndRandomVideos = (videos) => {
        if (videos.length <= 10) {
            //if there are 10 or fewer videos, return them all
            return videos;
        } else if (videos.length <= 20) {
            //if there are more than 10 but 20 or fewer videos, return the top 10 most viewed and the rest
            const mostViewed = [...videos].sort((a, b) => b.views - a.views).slice(0, 10);
            const remainingVideos = videos.filter(video => !mostViewed.includes(video));
            return [...mostViewed, ...remainingVideos];
        } else {
            //get the top 10 most viewed videos
            const mostViewed = [...videos].sort((a, b) => b.views - a.views).slice(0, 10);

            //get 10 random videos from the remaining list
            const remainingVideos = videos.filter(video => !mostViewed.includes(video));
            const randomVideos = [];
            while (randomVideos.length < 10 && remainingVideos.length > 0) {
                const randomIndex = Math.floor(Math.random() * remainingVideos.length);
                randomVideos.push(remainingVideos.splice(randomIndex, 1)[0]);
            }

            //combine the two sets of videos
            return [...mostViewed, ...randomVideos];
        }
    };

    //filter videos based on search query
    const filteredVideosList = videosList.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //get the combined list of top and random videos
    const videosToShow = getTopAndRandomVideos(filteredVideosList);
    
    return (
        <>
            <header className="header d-flex justify-content-between align-items-center">
                <IconsLeft currentUser={currentUser} defualtUser={defualtUser} handleSignOut={handleSignOut} handleDeleteUser={handleDeleteUser} setCurrentUser={setCurrentUser}/>
                <WatchSearchBar searchQuery={searchQuery} handleSearch={handleSearch}/>
                <IconsRight currentUser={currentUser} defualtUser={defualtUser} handleSignOut={handleSignOut} />
            </header>
            <div className="container-fluid mt-4">
                <div className="row">
                    <HomeVideosList videosList={videosToShow} changeVideo={changeVideo} />
                </div>
            </div>
        </>
    );
}

export default HomeContainer;