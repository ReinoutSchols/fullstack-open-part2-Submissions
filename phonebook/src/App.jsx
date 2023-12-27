import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// using this to create custom id's.
import Filter from './components/Filter';
import AddContact from './components/AddContact';
import RenderedContacts from './components/RenderedContacts';
import PhonebookServices from './PhonebookServices';

//2.16: Phonebook step11
// I wanted to play around a bit and make the message of deleting a contact be in red. (Error className)
const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null
  };
  console.log('isSuccess:', isSuccess); 
  const className = isSuccess ===  'Watch out, you deleted a contact!' ? 'Error' : 'Success';
 
  return (
    <div className={className}>
      {message}
    </div>
  );
};
// 2.17*: Phonebook step12
// Probably a better and smarter way to show the messages based on one notification component, could not make it work.
const ErrorNotification = ({errorMessage}) => {
  if (errorMessage === null) {
    return null
  };
  return (
    <div className="Error">
      {errorMessage}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showPerson, setShowPerson] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    PhonebookServices
    .getAll()
    .then(initialContacts => {
    setPersons(initialContacts)
    });
}, []);
      

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {name: newName, id: uuidv4(), number:newNumber};
    if (persons.some(person => person.name === newName && person.number !== newNumber)) {
      if (window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(person => person.name === newName);
        const updatedPerson = { ...existingPerson, number: newNumber };
        PhonebookServices
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id === returnedPerson.id ? returnedPerson : person
            ));
            setNewName('');
            setNewNumber('');
            setSuccessMessage('Contact updated successfully!', true);
            setTimeout(() => {
             setSuccessMessage(null);
             }, 5000);
            }).catch(() => {
            setErrorMessage(`Information of ${nameObject.name} has already been removed from the server`, true);
            setTimeout(() => {
             setSuccessMessage(null);
             }, 5000);
            });
        return;
      }
    }
    PhonebookServices
    .create(nameObject)
    .then(returnedName => {
      setPersons(persons.concat(returnedName));
      setNewName('');
      setNewNumber('');
      setSuccessMessage('Contact created successfully!', true);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
     })
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      PhonebookServices.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setSuccessMessage('Watch out, you deleted a contact!', false);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 10000);
        });
    }
  };
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    //console.log(event.target.value)
    setShowPerson(event.target.value);
  };


  // to filter the contacts
  const namesToShow = showPerson
  ? persons.filter(person => person.name.toLowerCase().includes(showPerson.toLowerCase()))
  : persons;

  return (
    <div>
      <Notification 
        message={successMessage} 
        isSuccess={successMessage}
      />
      <ErrorNotification 
      errorMessage={errorMessage}
      />
      <h2>Phonebook</h2>
      filter shown with
      <Filter 
        handleSearchChange={handleSearchChange}
        showPerson={showPerson}
      /> 
      <h2>Add a new </h2>
      <AddContact
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />  
       
      <h2>Numbers</h2>
      <RenderedContacts 
        namesToShow={namesToShow}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;