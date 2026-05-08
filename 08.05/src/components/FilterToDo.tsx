import React from "react";
import { ToDoList } from "./ToDoList";

export const FilterToDo:React.FC = function () {
    const [selected,setSelected] = React.useState('all')
    return (
        <div className="todoLayout">
            <select className="todoFilter" value={selected} onChange={e => setSelected(e.target.value)}>
                <option value="all">all</option>
                <option value="true">completed</option>
                <option value="false">uncompleted</option>
            </select>
            <ToDoList option={selected}/>
        </div>
    )
}