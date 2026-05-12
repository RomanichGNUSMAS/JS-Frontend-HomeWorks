import type { Dispatch } from "react"
import type { User } from "./contextType"

export interface Action {
    type:string,
    payload:unknown
}

export interface reducerType {
    users:User[],
    dispatch:Dispatch<Action>
}