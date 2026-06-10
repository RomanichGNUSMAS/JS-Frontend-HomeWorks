"use client";
import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { reducer } from "./reducer";
import { Action, User } from "./types";

export const ReducerContext = createContext<{state:User[],dispatch:React.Dispatch<Action>}| null>(null);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, []); 

  return (
    <ReducerContext.Provider value={{ state, dispatch }}>
      {children}
    </ReducerContext.Provider>
  );
}
