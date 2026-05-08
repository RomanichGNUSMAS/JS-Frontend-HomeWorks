import React from "react";
import type { ToDo } from "../context/ToDoType";
import { ToDoContext } from "../context/Provider";

export const ToDoItem: React.FC<{ todo: ToDo }> = function ({ todo }) {
    const context = React.useContext(ToDoContext);
    return (
        <div className={`todoItem ${todo.completed ? "todoItem--done" : ""}`}>
            <h3 className="todoItem__title">{todo.title}</h3>
            <p className="todoItem__status">{todo.completed + ''}</p>
            <div className="todoItem__actions">
                <button className="todoItem__btn" onClick={() => context.onChange(todo.id)}>{
                todo.completed ?
                    'Cancel' :
                    'Complete'
                }</button>
                <button className="todoItem__btn todoItem__btn--danger" onClick={() => context.onDel(todo.id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}