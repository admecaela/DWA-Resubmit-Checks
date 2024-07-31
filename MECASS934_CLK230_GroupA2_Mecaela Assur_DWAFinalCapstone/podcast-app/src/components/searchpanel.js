import React, { useState } from 'react';

export default function SearchPanel(){
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        console.log('Search term:', searchTerm);
    };

    return (
        <div className="search-pannel-section">
            <input 
                type="text"
                placeholder="Filter"
                className="form-input"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button className="form--button" onClick={handleSearch}>
                Search
            </button>
            </div>
    );
}