import React from "react";
import type { ToDo } from "../types/ToDoType";
import { List } from "./List";

type Props = {
    toDos:ToDo[]
}
export const FilterToDo:React.FC<Props> = ({ toDos }) => {
    const [selected,changeSelect] = React.useState<string>('');
    const [toDoS,setToDos] = React.useState<ToDo[]>(toDos);
    React.useEffect(() => {  
        if(!selected || selected == '--') return;      
        setToDos(toDos.filter(ToDo => `${ToDo.completed}` == selected ));
    },[selected, toDos]);

    return (
        <>
        <select value={selected || '--'} onChange={(e) => changeSelect(e.target.value)}>
            <option disabled={true} value="--">Select an option</option>
            <option value="true">only completed</option>
            <option value="false">only uncompleted</option>
        </select>   
        <List
            toDos={toDoS}
        />    
        </>
    )
}