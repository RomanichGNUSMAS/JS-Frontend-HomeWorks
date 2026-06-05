import Link from "next/link";
import { getAllUsers } from "./(helpers)/fileWorker";
import { User } from "./(types)/types";
import { Table } from "./(components)/Table";

export default async function Home() {
  const users: Promise<User[]> = getAllUsers();
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-12">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <Link href="/add" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-6 py-2.5 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950">
          <span>+</span> Add User
        </Link>
      </div>
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-700/40">
        <div className="border-b border-slate-800 px-6 py-6 sm:px-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Employees</h1>
          <p className="mt-2 text-sm text-slate-400">Browse the employee list and remove users directly from the table.</p>
        </div>

        <Table users={users} />
      
      </div>
    </main>
  )
}