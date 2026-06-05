"use client";

import Link from "next/link";
import { User } from "../(types)/types";
import React, { useActionState } from "react";
import { addNewUser } from "../(helpers)/fileWorker";

export default function AddUser() {
    const [form,setForm] = React.useState<Omit<User, 'id'>>({
        name:"",
        surname:"",
        salary:0
    })

    const [ ,dispatch] = useActionState(addNewUser,'');


   return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
                <h1 className="text-3xl font-bold text-white mb-2">Add New User</h1>
                <p className="text-blue-100">Fill in the details below</p>
            </div>

            {/* Form Content */}
            <form action={dispatch} className="p-8 space-y-6">

                {/* Name Field */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        First Name
                    </label>
                    <input 
                        name="name"
                        value={form.name}
                        onChange={e => setForm({...form,name:e.target.value})}
                        placeholder="John"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition"
                    />
                </div>

                {/* Surname Field */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Surname
                    </label>
                    <input 
                        type="text"
                        name="surname"
                        value={form.surname}
                        onChange={e => setForm({...form,surname:e.target.value})}
                        placeholder="Doe"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition"
                    />
                </div>

                {/* Salary Field */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Salary
                    </label>
                    <input 
                        type="number"
                        value={form.salary}
                        onChange={e => setForm({...form,salary:+e.target.value})}
                        name="salary"
                        placeholder="50000"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition"
                    />
                </div>

                {/* Submit Button */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800">
                    Add User
                </button>
            </form>

            {/* Back Link */}
            <div className="bg-gray-50 dark:bg-slate-700/50 px-6 py-4 border-t border-gray-200 dark:border-slate-700">
                <Link href={'/'} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition">
                    ← Back to Home
                </Link>
            </div>
        </div>
    </div>
   ) 
}