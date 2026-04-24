import React from "react"
import './App.css'
import RegistryForm from "./components/Registry/RegistryForm";
import UserList from "./components/UserList/UserList";

export default function App() {

  const [person,setPerson] = React.useState({
    name:'set your name',
    age: 0
  })

  const [error,setError] = React.useState('');

  const [persons,addPersons] = React.useState([{name:'Roman', age:16, id:0}]);
  const createUserHandler = (e) => {
    e.preventDefault()
    const [name,age] = e.target;
    let errorStr = '';
    if((age.value < 14 && age.value <= 150) || isNaN(age.value)) errorStr += ' a valid age';
    if(/set\s*your\s*name/i.test(name.value) || !name.value.trim()) {
      errorStr += ' a valid name'
    }
    if(errorStr) {
      setError(`please fill ${errorStr}`);
      return;
    }
    addPersons([...persons,{name:name.value,age:age.value,id:persons.length}]);
  }

  const handleDeletion = (id) => {
    addPersons(persons.filter(person => person.id !== id))
  }

  return (
    <>
      {error && <p>{error}</p>}
      <RegistryForm 
        createUserHandler={createUserHandler}
        person={person}  
        setPerson={setPerson}
      />

      <UserList 
        persons={persons}
        onDel={handleDeletion}
       />
    </>
  )
}