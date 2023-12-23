import { useState } from 'react'

/*2.6: The Phonebook Step1 (Done)
Decided to use the id method learned in the coursework and not use the name as key. 
Does not make sense to me because maybe it's possible the name can change in a later version.
Note for myself: logging stuff to the console really helps, use .map to log the state.
2.7: The Phonebook Step2 (Done)
Note for myself: .some is a good way to check if the callback function returns true for one or more elements, else it returns false.
2.8: The Phonebook Step3(Done)
add phone numbers with new button and new event handler
2.9*: The Phonebook Step4 (Done)
Note for myself: with using filter and .includes you can filter an array and check if it contains values. 
Also the ? operator checks if the showPerson is truthy which means it only filters if something is filled in! 
2.10: The Phonebook Step5
extract three components
*/

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showPerson, setShowPerson] = useState('')


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {name: newName, id: persons.length + 1, number:newNumber}
    if (persons.some(person => person.name === newName || person.number === newNumber)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setShowPerson(event.target.value)
  }


  const namesToShow = showPerson
  ? persons.filter(person => person.name.toLowerCase().includes(showPerson.toLowerCase()))
  : persons;


  console.log(persons.map(person => person));

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with<input 
        onChange={handleSearchChange}
        value={showPerson}

      >
      </input>
      <h2>Add a new </h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName} 
          onChange={handleNameChange} />
        </div>
        <div>
          number: <input 
          value={newNumber} 
          onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {namesToShow.map((person) => (
      <li key={person.id}>{person.name} {person.number}</li>
      ))}
      </ul>
    </div>
  )
}

export default App