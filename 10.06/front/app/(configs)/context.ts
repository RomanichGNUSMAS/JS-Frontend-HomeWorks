"use client";
import { createContext, Dispatch, useReducer } from "react";
import { reducer } from "./reducer";
import { Action, User } from "./types";

export const ReducerContext = createContext<[state:User[],Dispatch:React.Dispatch<Action>] | null>(null);