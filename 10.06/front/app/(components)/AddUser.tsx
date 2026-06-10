"use client"

import React, { useContext, useState } from "react"
import { ReducerContext } from "../(configs)/context"
import { addUser } from "../(configs)/requests";

export const AddUser:React.FC<{setClick:(p:boolean) => void}> = function ({ setClick }) {
    const context = useContext(ReducerContext);
    if (!context) return <p>loading...</p>

    const [form, setForm] = useState({
        name: "",
        email: "",
        salary: 0
    })
    const handleSend = () => {
        let flag = false
        for (const key in form) {
            const value = (form)![key as keyof typeof form];
            if (
                typeof value === 'string' && !value.trim()
            ) {
                setForm({...form,[key]:"!Set Value!"})
                flag = true
            }
        }
        if(form.salary == 0) setForm({...form,salary:1000});
        if(flag) return;
        addUser(form)
            .then((r) => {
                context.dispatch({ type:"ADD",payload:[{id:r.id,...form}]})
            })
            .finally(() => {
                setClick(false);
            })
    }
    return (
        <tr className="border-b hover:bg-gray-50">
            <td></td>
            <td className="px-4 py-2">
                <input
                    placeholder="name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="text-amber-950 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </td>
            <td className="px-4 py-2">
                <input
                    placeholder="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="text-amber-950 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </td>
            <td className="px-4 py-2">
                <input
                    placeholder="salary"
                    type="number"
                    value={form.salary}
                    onChange={e => setForm({ ...form, salary: +e.target.value })}
                    className="text-amber-950 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </td>
            <td className="px-4 py-2"><button onClick={handleSend} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors">Save</button></td>
        </tr>
    )
}