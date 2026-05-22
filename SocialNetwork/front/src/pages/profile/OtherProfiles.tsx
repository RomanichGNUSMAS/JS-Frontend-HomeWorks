import { NavLink, useNavigate, useParams } from "react-router-dom";
import type { Account } from "../../config/types/types";
import React from "react";
import { Axios } from "../../config/Axios";
import { useAuth } from "../../hooks/useAuth";

const defaultAvatar =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80";

export const OtherProfiles = () => {
    const { text } = useParams();
    const navigate = useNavigate();
    const [me, setMe] = React.useState<Account | null>(null);
    const [myRequests, setRequests] = React.useState<Account[]>([]);
    useAuth(setMe)
    const [users, setUsers] = React.useState<Account[]>([]);

    React.useEffect(() => {
        if (!text) {
            navigate('/profile');
            return;
        }

        Axios.get<{ requests: Account[] }>('/follow/requests')
            .then(response => setRequests(response.data.requests))
            .catch(() => navigate('/profile'));
        
        Axios.get<{ users: Account[] }>(`/account/search/${text}`)
            .then((response) => {
                setUsers(response.data.users || []);
            })
            .catch(() => {
                navigate('/profile');
            });
    }, [text, navigate]);

    const isFollowingUser = (userId: number) => {
        return !!me?.followings?.some((follow: any) => follow.receiver?.id === userId);
    };

    const handleFollow = (to: number): void => {
        if (!me) return;

        const isFollowing = isFollowingUser(to);

        // keep snapshots for rollback
        const prevMe = structuredClone(me);
        const prevUsers = structuredClone(users);

        // optimistic update
        if (isFollowing) {
            setMe((m) => m ? { ...m, followings: m.followings?.filter((follow: any) => follow.receiver?.id !== to) ?? [] } : m);
            setUsers((list) => list.map(u => u.id === to ? { ...u, followers: (u.followers ?? []).slice(0, Math.max(0, (u.followers ?? []).length - 1)) } : u));
        } else {
            setMe((m) => m ? { ...m, followings: [ ...(m.followings ?? []), { receiver: { id: to } } as any ] } : m);
            setUsers((list) => list.map(u => u.id === to ? { ...u, followers: [ ...(u.followers ?? []), { id: me.id } as any ] } : u));
        }

        Axios.post(`follow/${to}`)
            .then(() => {
                // no-op: optimistic update already applied
            })
            .catch(err => {
                console.error('follow failed', err?.message || err);
                // rollback on failure
                setMe(prevMe);
                setUsers(prevUsers);
            });
    }

    return me && myRequests && (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
                <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-400/70">Search results</p>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                People matching “{text}”
                            </h1>
                        </div>
                        <div className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-300 ring-1 ring-white/10">
                            {users.filter(user => user.id != me.id).length} profile{users.filter(user => user.id != me.id).length === 1 ? '' : 's'} found
                        </div>
                    </div>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">
                        Browse matching accounts and tap follow to connect. If the search didn't return results, try a different username or keyword.
                    </p>
                </div>

                {users.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-10 text-center text-slate-400 shadow-inner shadow-black/20">
                        <p className="text-lg font-semibold text-white">No users found</p>
                        <p className="mt-2 text-sm text-slate-400">Try another search term or check your spelling.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {users.map((user) => user.id != me.id && (
                            <div key={user.id} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-violet-500/30 hover:bg-slate-900/95">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={user.avatar ? `http://localhost:4002/${user.avatar}` : defaultAvatar}
                                        alt={user.username}
                                        className="h-16 w-16 rounded-3xl object-cover ring-2 ring-violet-500/40"
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate text-lg font-semibold text-white">{user.firstName} {user.lastName}</p>
                                        <p className="truncate text-sm text-slate-400">@{user.username}</p>
                                    </div>
                                </div>

                                <div className="mt-5 space-y-3 text-sm text-slate-400">
                                    <p>{user.bio || 'No bio available yet.'}</p>
                                    <NavLink
                                        to={`/otherprofile/${user.username}`}
                                        className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white"
                                    >
                                        View profile
                                    </NavLink>
                                </div>

                                <button
                                    onClick={() => handleFollow(user.id)}
                                    type="button"
                                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-fuchsia-500"
                                >
                                    {isFollowingUser(user.id) ? "Unfollow" : "Follow" }
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};