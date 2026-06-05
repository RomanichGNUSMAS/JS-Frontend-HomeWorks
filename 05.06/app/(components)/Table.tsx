import React, { use } from "react"
import { User } from "../(types)/types"
import { TBody } from "./TableBody"
export const Table: React.FC<{ users:Promise<User[]>}> = ({ users }) => {
    const promiseReturned:User[] = use(users)
    return (
        <div className="overflow-x-auto px-4 py-6 sm:px-6">
            {promiseReturned.length ? (
                <table className="min-w-full divide-y divide-slate-800">
                    <thead className="bg-slate-950/80 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Surname</th>
                            <th className="px-4 py-3">Salary</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <TBody users={promiseReturned} />
                </table>
            ) : (
                <div className="w-full flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-xl px-6 py-8">
                        <svg className="h-10 w-10 text-slate-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-sm font-semibold text-slate-200">No users found</p>
                        <p className="text-xs text-slate-400">Add a user to get started.</p>
                    </div>
                </div>
            )}

        </div>
    )
}