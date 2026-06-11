"use client";
import { useState } from "react";
import { Table } from "./(components)/Table";
import { ContextProvider, ReducerContext } from "./(configs)/context";

export default function Home() {
  const [isClicked,setClick] = useState(false);

  return (
    <div>
      <ContextProvider>
        <button
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={e => setClick(true)}
        >
          AddUser
        </button>
        <Table setClick={setClick} isClicked={isClicked}/>
      </ContextProvider>
    </div>
  )
}``