import React from "react";
import { Link, useParams } from "react-router-dom";
import { Axios } from "../../config/Axios";
import type { Account, WholeRequest } from "../../config/types/types";
import { useAuth } from "../../hooks/useAuth";

export const OtherProfiles: React.FC = () => {
    const { text } = useParams();
    const [data, setData] = React.useState<Account[]>([])
    const [currentUser,setUser] = React.useState<WholeRequest | null>(null)

    useAuth(setUser)
    React.useEffect(() => {
        Axios.get<{ users: Account[]}>(`/account/search/${text}`)
            .then(response => setData(response.data.users))
            .catch(err => console.log(err))
    }, [text])

    if (data.length < 1) {
        return (
            <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/70 p-8 text-center text-slate-300 shadow-2xl shadow-black/30">
                <p className="text-lg font-semibold text-slate-100">No users found</p>
                <p className="mt-2 text-sm text-slate-400">Try a different search term or check spelling.</p>
            </div>
        )
    }

    return currentUser && (
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:grid-cols-2 xl:grid-cols-3">
            {data.map(user => currentUser.user.id == user.id ? undefined : (
                <div
                    key={user.id}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-violet-950/40 transition duration-300 hover:-translate-y-1 hover:bg-slate-900/90"
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={user.avatar || "https://img.icons8.com/fluent/1200/name.jpg"}
                            alt={user.username}
                            className="h-20 w-20 rounded-3xl object-cover ring-2 ring-violet-500/50"
                        />
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-xl font-semibold text-slate-100">{user.username}</p>
                            <p className="mt-1 text-sm text-slate-400">{user.firstName || "No name"} {user.lastName || ""}</p>
                        </div>
                    </div>

                    <div className="mt-6 space-y-3">
                        <div className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300">
                            <p className="font-medium text-slate-100">About</p>
                            <p className="mt-2 text-slate-400">Browse this profile and discover more from the network.</p>
                        </div>
                        <Link
                            to={`/otherprofile/${user.username}`}
                            className="block rounded-2xl bg-violet-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-violet-400"
                        >
                            View Profile
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
