"use client";

import React, { use, useContext, useEffect, useReducer } from "react";
import { reducer } from "../(configs)/reducer";
import { allUsers } from "../(configs)/requests";
import Link from "next/link";
import { ReducerContext } from "../(configs)/context";

export const TBody: React.FC = () => {
    const context = useContext(ReducerContext)
    if(!context) return <p>loading</p>;
    const [users,dispatchUsers] = context;
    useEffect(() => {
        allUsers()
            .then(data => dispatchUsers({ type: "GOTREQUEST", payload: data }));
    }, [])

    return (
        <tbody className="divide-y divide-slate-200">
            {
                users.map((user) =>
                    <tr key={user.id} className="hover:bg-blue-50 transition-colors duration-200 even:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{user.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{user.email}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-green-600">${user.salary.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm space-x-3 flex">
                            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg">Delete</button>
                            <Link href={`/users/update/${user.id}`} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 font-medium shadow-md hover:shadow-lg">Update</Link>
                        </td>
                    </tr>
                )
            }
        </tbody>
    )
}