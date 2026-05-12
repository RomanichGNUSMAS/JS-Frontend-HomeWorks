import React from "react";

export interface User {
    name:string
    id:number
    salary:number
    age:number
}

export interface ContextType {
    users:User[],
    onAdd: (userData:User) => void,
    onDel: (id:number) => void,
    salaryUp:(id:number) => void,
    salaryDown:(id:number) => void
}

export const DataContext = React.createContext<ContextType | null>(null)