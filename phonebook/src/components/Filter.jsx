import React from 'react';


const Filter = (props) => {
    return (
        <input 
            onChange={props.handleSearchChange}
            value={props.showPerson}
            id="filterInput"
        >
        </input>
    )
}

export default Filter;