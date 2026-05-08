import React from "react";
import { ToDoContext } from "./context/Provider";
import type { ToDo } from "./context/ToDoType";
import { FilterToDo } from "./components/FilterToDo";
import { AddToDo } from "./components/AddToDo";
import "./App.css";

export default function App() {
  const [ToDos, setToDos] = React.useState<ToDo[]>([])

  React.useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'GET'
    })
      .then(v => v.json())
      .then(v => {
        setToDos(v.slice(0, 5))
      });
  }, [])

  return (
    <>
      <ToDoContext.Provider value={{
        ToDos: ToDos,
        onAdd: (e: React.FormEvent) => {
          e.preventDefault();
          const title = e.target[0].value.trim();
          if (!title) return;
          setToDos([...ToDos, { id: Date.now(), completed: false, title }])
        },
        onChange: (id: number) => {
          const find = ToDos.find(t => t.id == id);
          if (find) {
            setToDos([...ToDos.filter(t => t.id !== id), { ...find, completed: !find.completed }])
          }
        },
        onDel: (id: number) => {
          setToDos(ToDos.filter(t => t.id !== id));
        }
      }}>
        <FilterToDo />
        <AddToDo />
      </ToDoContext.Provider>
    </>
  )
}