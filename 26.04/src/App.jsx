import React from "react"
import './App.css'
import Lists from "./components/Lists";
import AddTodo from "./components/AddTodo";
import ButtonCollections from "./components/ButtonCollections";

export default function App() {
  const [quests, setQuests] = React.useState([]);
  const [inputVal, setInputVal] = React.useState('');
  const [error, setError] = React.useState('');
  React.useEffect(() => {
    console.log('called')
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(v => v.json())
      .then(v => setQuests(
        v.filter((t, i) => {
          if (i >= 8) return;
          return t;
        })
      ));
  }, [])

  const handleDelete = (id) => {
    setQuests(quests.filter(quest => {
      if (quest.id == id) return;
      return quest;
    }));
  }

  const handleComplete = (id) => {
    console.log(id)
    setQuests(
      [...quests].filter(quest => {
        console.log(quest)
        if (quest.id == id) {
          quest.completed = true;
        }
        return quest;
      })
    )
  }

  const handleCancel = (id) => {
    setQuests(
      [...quests].filter(quest => {
        if (quest.id == id && quest.completed) {
          quest.completed = false;
        }
        return quest;
      })
    )
  }

  const setHandler = (state) => {
    if (typeof state !== 'boolean') return;
    setQuests(
      prev => [...prev].filter(p => {
        p.completed = state;
        return p;
      })
    )
  }

  const handleAdd = () => {
    const title = inputVal;
    if (!title) {
      return setError('please fill a valid todo name!');
    }
    else if (quests.find(t => t.title === title)) {
      return setError('this todo exists!');
    }
    setError('');
    setInputVal('');
    setQuests([...quests, { title, id: Date.now(), completed: false }])
  }
  return (
    <>
      <AddTodo
        handleAdd={handleAdd}
        setInputVal={setInputVal}
        inputVal={inputVal}
        error={error}
      />
      <ButtonCollections
        setHandler={setHandler}
        setQuests={setQuests}
      />
      <Lists
        quests={quests}
        handleCancel={handleCancel}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />

    </>
  )
}