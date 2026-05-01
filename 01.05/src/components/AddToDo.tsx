import React from "react"

type Props = {
    onAdd: (title: string) => void;
}
export const AddToDo:React.FC<Props> = ({onAdd}) => {
    const [val,setVal] = React.useState<string>("");

    
    return (
        <div>
            <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Add a new todo" />
            <button onClick={() => { onAdd(val); setVal(""); }}>Add</button>
        </div>
    )
}