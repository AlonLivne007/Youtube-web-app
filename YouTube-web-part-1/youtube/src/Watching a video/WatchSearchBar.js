import React from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Video.css';
import { useNavigate } from 'react-router-dom';

function WatchSearchBar({ searchQuery, handleSearch }) {
    //function to navigate to home page
    const navigate = useNavigate();
    const handleSearchButton = () => {
        navigate('/home');
    }

    return (
        <div className="search-bar flex-grow-1 d-flex justify-content-center align-items-center">
            <input
                type="text"
                className="form-control"
                placeholder="Search"
                style={{ maxWidth: '400px' }}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <button className="btn btn-outline-secondary ml-2">
                <i className="bi bi-search" onClick={handleSearchButton}></i>
            </button>
        </div>
    );
}

export default WatchSearchBar;
