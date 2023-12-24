import React from 'react';


const RenderedContacts = (props) => {
    return (
        <ul>
        {props.namesToShow.map((person) => (
        <li key={person.id}>{person.name} {person.number}</li>
        ))}
        </ul>
    )
}

export default RenderedContacts;
