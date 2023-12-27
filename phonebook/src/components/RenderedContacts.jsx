import React from 'react';


const RenderedContacts = (props) => {
    return (
        <ul>
        {props.namesToShow.map((person) => (
        <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() => props.handleDelete(person.id, person.name)}>delete</button>
        </li>
        ))}
        </ul>
    );
};

export default RenderedContacts;
