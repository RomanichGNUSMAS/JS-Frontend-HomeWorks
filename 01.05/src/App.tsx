import React from "react"
import type { ToDo } from "./types/ToDoType";
import { Api } from "./axios.config";
import { List } from "./components/List";
import { FilterToDo } from "./components/FilterToDo";
import { AddToDo } from "./components/AddToDo";
import "./App.css";

export default function App() {
  const [toDos, setToDos] = React.useState<ToDo[]>([]);
  const [isLoaded, setLoad] = React.useState<boolean>(false);
  React.useEffect(() => {
    Api.get('/ToDos')
      .then(v => {
        setToDos(v.data)
        setLoad(true)
      });
  }, [])

  const onDelete = (id: number): void => {
    Api.delete(`/ToDos/${id}`)
      .then(() => {
        setToDos(prev => prev.filter(todo => todo.id !== id))
      });
  }
  const onComplete = (id: number): void => {
    const current = toDos.find(todo => todo.id === id);
    if (!current) return;
    Api.patch(`/ToDos/${id}`, { completed: !current.completed })
      .then(v => {
        const updated: ToDo = v.data;
        setToDos(prev => prev.map(t => (t.id === id ? updated : t)));
      });
  }
  const onAdd = (title: string): void => {
    const trimmed = title.trim();
    if (!trimmed) return;
    Api.post('/ToDos', { title: trimmed, completed: false })
      .then(v => {
        const created: ToDo = v.data;
        setToDos(prev => [...prev, created])
      });
  }
  return (
    <div className="container">
      <div className="Lists">
        <List
          toDos={toDos}
          onDelete={onDelete}
          onComplete={onComplete}
        />
      </div>
      <div className="filter">
        {
          isLoaded ?
            <FilterToDo
              toDos={toDos}
            />
            :
            <div>Loading...</div>
        }
      </div>
      <div className="addList">
        {
          isLoaded ?
            <AddToDo
              onAdd={onAdd}
            />
            :
            <div>Loading...</div>
        }
      </div>
    </div>
  )
}