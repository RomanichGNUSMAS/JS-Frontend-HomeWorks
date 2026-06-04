"use server";

import Link from "next/link";
import { TBody } from "./(components)/TableBody";
import { getAllUsers } from "./(helpers)/fileWorker";
import { User } from "./(types)/types";

export default async function Home() {
  const users: User[] = await getAllUsers();
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-12">
      <Link href="/add">Add User</Link>
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-700/40">
        <div className="border-b border-slate-800 px-6 py-6 sm:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Employees</h1>
          <p className="mt-2 text-sm text-slate-400">Browse the employee list and remove users directly from the table.</p>
        </div>

        <div className="overflow-x-auto px-4 py-6 sm:px-6">
          <table className="min-w-full divide-y divide-slate-800">
            <thead className="bg-slate-950/80 text-left text-xs uppercase tracking-[0.18em] text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Surname</th>
                <th className="px-4 py-3">Salary</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <TBody users={users} />
          </table>
        </div>
      </div>
    </main>
  )
}