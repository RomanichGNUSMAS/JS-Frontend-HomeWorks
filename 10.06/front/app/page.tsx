"use client";
import { useReducer } from "react";
import { Table } from "./(components)/Table";
import { ReducerContext } from "./(configs)/context";
import { reducer } from "./(configs)/reducer";

export default function Home() {
  return (
    <div>
      <ReducerContext.Provider value={
        useReducer(reducer,[])
      }>
      <Table />
      </ReducerContext.Provider>
    </div>
  )
}