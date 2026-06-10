import { allUsers } from "../(configs)/requests"
import { TBody } from "./Tbody";

export const Table = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Users Management</h1>
                    <p className="text-slate-600">Manage and update user information</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-slate-200">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                                <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Salary</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <TBody />
                    </table>
                </div>
            </div>
        </div>
    )
}