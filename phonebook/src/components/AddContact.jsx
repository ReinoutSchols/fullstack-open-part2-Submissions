import React from 'react';


const AddContact = (props) => {
    return (
        <form onSubmit={props.addName}>
        <div>
          name: <input 
           id="nameInput"
          value={props.newName} 
          onChange={props.handleNameChange} />
        </div>
        <div>
          number: <input 
          id="numberInput"
          value={props.newNumber} 
          onChange={props.handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> 
    );
}

export default AddContact;