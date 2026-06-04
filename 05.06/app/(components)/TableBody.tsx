"use client";
import { useActionState } from "react";
import { User } from "../(types)/types"
import { removeUser } from "../(helpers)/fileWorker";

export const TBody:React.FC<{ users:User[] }> = ({ users }) => {
    const [state,dispatch] = useActionState(removeUser,"")

    return (
        <>
        {state && (
          <p className="mx-4 mb-4 rounded-2xl bg-emerald-500/15 px-4 py-3 text-sm text-emerald-100 ring-1 ring-emerald-500/25 sm:mx-6">
            {state}
          </p>
        )}
        <tbody className="divide-y divide-slate-800 bg-slate-900 text-sm text-slate-200">
          {users.map(user => (
            <tr key={user.id} className="transition hover:bg-slate-800/70">
              <td className="px-4 py-4">
                <p className="font-medium text-slate-100">{user.name}</p>
              </td>
              <td className="px-4 py-4 text-slate-300">{user.surname}</td>
              <td className="px-4 py-4 text-slate-300">{user.salary}</td>
              <td className="px-4 py-4">
                <button
                  type="button"
                  className="inline-flex rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                  onClick={() => dispatch(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </>
    )
}