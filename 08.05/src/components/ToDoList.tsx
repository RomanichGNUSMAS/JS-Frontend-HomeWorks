import React from "react";
import { ToDoContext } from "../context/Provider";
import { ToDoItem } from "./ToDoItem";

export const ToDoList: React.FC<{ option: string }> = function ({ option }) {
    const context = React.useContext(ToDoContext);
    return (
        <div className="todoList">
            {
                context.ToDos.map(t => {
                    if (option === 'all' || `${t.completed}` === option)
                        return (
                            <ToDoItem
                                key={t.id}
                                todo={t}
                            />
                        )
                })
            }
        </div>
    )
}