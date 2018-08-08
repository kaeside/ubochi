import React from 'react';

function SearchModal({value}) {
    return (
        <div className="search-modal">
            <button className="close">X</button>
            <div className="search-modal-form">
                <input type="text" value={value} placeholder="Please enter a city and state"/>
                <input type="button" value="Submit"/>
            </div>
        </div>
    )
}

export default SearchModal;