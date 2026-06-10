"use client";
import { ReducerContext } from "@/app/(configs)/context";
import { updateUser } from "@/app/(configs)/requests";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";

export default function Page() {
    const { id } = useParams();
    const context = useContext(ReducerContext);
    console.log(context,id)
    if(!context || !id) return <p>loading</p>
    const [,dispatchUsers] = context;
    const [form,setForm] = useState({
        name:"",
        email:"",
        salary:0
    })
    const handleSend = () => {
        updateUser(+id,form)
            .then(() => {
                dispatchUsers({ type:"UPDATE", payload: [
                   { id:+id,...form }
                ]})
            })
    }
    return (
        <div>
            <input
                placeholder="name"
                value={form.name}
                onChange={e => setForm({...form,name:e.target.value})}
            />
            <input 
                placeholder="email"
                value={form.email}
                onChange={e => setForm({...form,email:e.target.value})}
            />
            <input 
                placeholder="salary"
                type="number" 
                value={form.salary}
                onChange={e => setForm({...form,salary:+e.target.value})}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    )
}