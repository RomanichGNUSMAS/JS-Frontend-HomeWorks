import React from "react"
import type { ToDo } from "../types/ToDoType"
import { ToDoItem } from "./ToDoItem"

type Props = {
    toDos:ToDo[]
    onDelete?: (id: number) => void
    onComplete?: (id: number) => void
}
export const List:React.FC<Props> = ({toDos,onDelete,onComplete}) => {
    if(toDos.length === 0) return <div>No todos found</div>
    return (
        <div>
            {
                toDos.map(ToDo => {
                    return (
                        <ToDoItem key={ToDo.id}
                            id={ToDo.id}
                            quest={ToDo.title}
                            isComplete={ToDo.completed}
                            onDelete={onDelete}
                            onComplete={onComplete}
                        />
                    )
                })
            }
        </div>
    )
}