import React from 'react';


const Filter = (props) => {
    return (
        <>
            <label htmlFor="filterInput">Find countries </label>
            <input 
                onChange={props.handleSearchChange}
                value={props.showCountry}
                id="filterInput"
            > 
            </input>
        </>
    )
}

export default Filter;