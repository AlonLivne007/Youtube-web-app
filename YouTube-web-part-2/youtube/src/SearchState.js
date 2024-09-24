import { useState, useEffect } from 'react';

export const SearchState = () => {
    //state for search query
    const [searchQuery, setSearchQuery] = useState("");

    //function to handle search query update
    const handleSearch = (query) => {
        setSearchQuery(query);
    };
    
    return {searchQuery, handleSearch, setSearchQuery};
};