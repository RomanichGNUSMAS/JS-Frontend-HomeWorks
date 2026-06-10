"use client";
import { useReducer, useState } from "react";
import { Table } from "./(components)/Table";
import { ContextProvider, ReducerContext } from "./(configs)/context";
import { reducer } from "./(configs)/reducer";

export default function Home() {
  const [isClicked,setClick] = useState(false);

  return (
    <div>
      <ContextProvider>
        <button onClick={e => setClick(true)}>AddUser</button>
        <Table setClick={setClick} isClicked={isClicked}/>
      </ContextProvider>
    </div>
  )
}