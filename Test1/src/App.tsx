import React from "react"
import { DataContext, type User } from "./types/contextType"
import reducer from "./components/reducer/reducer"
import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, []);

  return (
    <div>
      <DataContext.Provider value={{
        users: state,
        onAdd: (userData: User) => {
          dispatch({
            type: "ADDUSER",
            payload: userData
          })
        },
        onDel: (id: number) => {
          dispatch({
            type: "DELETEUSER",
            payload: id
          })
        },
        salaryUp: (id: number) => {
          dispatch({
            type: "SALARYUP",
            payload: id
          })
        },
        salaryDown: (id: number) => {
          dispatch({
            type: "SALARYDOWN",
            payload: id
          })
        }
      }}
      >
        <AddUser />
        <UserList />
      </DataContext.Provider>
    </div>
  )
}