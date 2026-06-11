import { useContext, useEffect, useState } from "react";
import { User } from "../(configs)/types";
import { allUsers, removeUser, updateUser } from "../(configs)/requests";
import { ReducerContext } from "../(configs)/context";

export const TBody: React.FC = () => {
    const context = useContext(ReducerContext)
    if (!context) return <p>loading</p>;
    const users = context.state as User[];
    const dispatch = context.dispatch;
    useEffect(() => {
        allUsers()
            .then(data => dispatch({ type: "GOTREQUEST", payload: data }));
    }, [])

    const handleDelete = (id: number) => {
        removeUser(id)
            .then(() => dispatch({ type: "DELETE", payload: id }))
    }

    const [editingId, setEditingId] = useState<number | null>(null)
    const [form, setForm] = useState({
        name: "",
        email: "",
        salary: 0
    })

    const startEdit = (user: User) => {
        setEditingId(user.id)
        setForm({ name: user.name, email: user.email, salary: user.salary })
    }

    const handleSend = (form: Omit<User, 'id'>, id: number,email:string) => {
        updateUser(id, form,email)
            .then(() => {
                dispatch({ type: "UPDATE", payload: [{ ...form, id }] })
            })
            .finally(() => {
                setEditingId(null);
            })
    }

    return (
        <>
            {
                users.map((user) => {
                    const isUpdate = editingId === user.id;
                    return (
                        <tr key={user.id} className="hover:bg-blue-50 transition-colors duration-200 even:bg-slate-50">

                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{user.id}</td>

                            {
                                isUpdate ? <td className="px-6 py-4 text-sm font-medium text-slate-900"><input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" /></td> : <td className="px-6 py-4 text-sm text-slate-700">{user.name}</td>
                            }

                            {
                                isUpdate ? <td className="px-6 py-4 text-sm font-medium text-slate-900"><input type="text" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" /></td> : <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                            }
                            {
                                isUpdate ? <td className="px-6 py-4 text-sm font-medium text-slate-900"><input type="number" value={form.salary} onChange={e => setForm({ ...form, salary: +e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" /></td> : <td className="px-6 py-4 text-sm font-semibold text-green-600">${user.salary.toLocaleString()}</td>
                            }
                            <td className="px-6 py-4 text-sm space-x-3 flex">
                                <button onClick={() => handleDelete(user.id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg">Delete</button>
                                {
                                    isUpdate ? <button onClick={() => handleSend(form, user.id,user.email)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg">Save</button>
                                        : <button onClick={() => startEdit(user)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg">Update</button>
                                }
                            </td>
                        </tr>
                    )
                })
            }
        </>
    )
}