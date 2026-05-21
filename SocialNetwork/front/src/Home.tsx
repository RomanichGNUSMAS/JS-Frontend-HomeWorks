import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Axios } from "./config/Axios";
import type { Account, User } from "./config/types/types";
import type { AxiosDefaults } from "axios";

const navItems = [
    {
        to: "/",
        label: "Profile",
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
        ),
    },
    {
        to: "/posts",
        label: "Posts",
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
        ),
    },
    {
        to: "/chats",
        label: "Chats",
        icon: (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a48.109 48.109 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.02-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
        ),
    },
];

const suggestedUsers = [
    { name: "Alex Rivera", handle: "@alex_r", avatar: "https://i.pravatar.cc/80?img=12" },
    { name: "Jordan Lee", handle: "@jordan", avatar: "https://i.pravatar.cc/80?img=32" },
    { name: "Sam Chen", handle: "@samc", avatar: "https://i.pravatar.cc/80?img=45" },
];

export const Home: React.FC = () => {
    
    const navigate = useNavigate();
    const [user, setUser] = React.useState<Account | null>(null);

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signup");
        } else {
            Axios.get<{ user: Account}>("/auth/user", {
                headers: { Authorization:`Bearer ${localStorage.getItem('token')}`}
            })
                .then((res) => {
                    setUser(res.data.user);
                })
                .catch(() => {
                    navigate("/signup");
                });
        }
    }, []);

    return user && (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            {/* ambient background */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
                <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
                <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-7xl gap-0 px-4 py-6 lg:gap-8 lg:px-6">
                {/* left sidebar */}
                <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 flex-col lg:flex">
                    <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-violet-950/40 backdrop-blur-xl">
                        {/* logo */}
                        <div className="mb-8 flex items-center gap-3 px-1">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
                                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-lg font-bold tracking-tight">Connect</p>
                                <p className="text-xs text-slate-400">Social Network</p>
                            </div>
                        </div>

                        {/* nav */}
                        <nav className="flex flex-1 flex-col gap-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === "/"}
                                    className={({ isActive }) =>
                                        [
                                            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-gradient-to-r from-violet-600/80 to-fuchsia-600/60 text-white shadow-lg shadow-violet-900/40"
                                                : "text-slate-400 hover:bg-white/5 hover:text-white",
                                        ].join(" ")
                                    }
                                >
                                    {item.icon}
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>

                        {/* user card */}
                        <div className="mt-auto rounded-xl border border-white/10 bg-slate-900/60 p-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={user.avatar}
                                    alt=""
                                    className="h-11 w-11 rounded-full object-cover ring-2 ring-violet-500/50"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold">{`${user.firstName} ${user.lastName}`}</p>
                                    <p className="truncate text-xs text-slate-400">@{user.username}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mt-3 w-full rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
                            >
                                Settings
                            </button>
                        </div>
                    </div>
                </aside>

                {/* main column */}
                <div className="flex min-w-0 flex-1 flex-col">
                    {/* top bar */}
                    <header className="sticky top-0 z-20 mb-6 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 shadow-lg shadow-black/20 backdrop-blur-xl sm:px-5">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 lg:hidden">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500">
                                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                    </svg>
                                </div>
                                <span className="font-bold">Connect</span>
                            </div>

                            <div className="relative hidden flex-1 sm:block">
                                <svg
                                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                                <input
                                    type="search"
                                    placeholder="Search people, posts, tags…"
                                    className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                                    readOnly
                                />
                            </div>

                            <div className="ml-auto flex items-center gap-2 sm:gap-3">
                                <button
                                    type="button"
                                    className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-400 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white"
                                    aria-label="Notifications"
                                >
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                                    </svg>
                                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-fuchsia-500 ring-2 ring-slate-950" />
                                </button>
                                <button
                                    type="button"
                                    className="hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:from-violet-500 hover:to-fuchsia-500 sm:block"
                                >
                                    New Post
                                </button>
                                <img
                                    src={user.avatar || "https://i.pravatar.cc/150?img=68"}
                                    alt=""
                                    className="h-9 w-9 rounded-full object-cover ring-2 ring-violet-500/40 lg:hidden"
                                />
                            </div>
                        </div>
                    </header>

                    {/* page content */}
                    <main className="flex-1 rounded-2xl border border-white/10 bg-white/[0.02] p-1 shadow-inner shadow-black/20 sm:p-2">
                        <div className="min-h-[420px] rounded-xl p-4 sm:p-6">
                            <Outlet />
                        </div>
                    </main>
                </div>

                {/* right sidebar */}
                <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-72 shrink-0 xl:block">
                    <div className="flex h-full flex-col gap-4">
                        {/* stats card */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                            <h2 className="text-sm font-semibold text-slate-300">Your network</h2>
                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-violet-500/10 p-3 text-center ring-1 ring-violet-500/20">
                                    <p className="text-2xl font-bold text-violet-300">{user?.followers?.length ?? "—"}</p>
                                    <p className="text-xs text-slate-400">Followers</p>
                                </div>
                                <div className="rounded-xl bg-fuchsia-500/10 p-3 text-center ring-1 ring-fuchsia-500/20">
                                    <p className="text-2xl font-bold text-fuchsia-300">{user?.followings?.length ?? "—"}</p>
                                    <p className="text-xs text-slate-400">Following</p>
                                </div>
                            </div>
                        </div>

                        {/* suggestions */}
                        <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                            <h2 className="text-sm font-semibold text-slate-300">Suggested for you</h2>
                            <ul className="mt-4 space-y-3">
                                {suggestedUsers.map((person) => (
                                    <li key={person.handle} className="flex items-center gap-3">
                                        <img
                                            src={person.avatar}
                                            alt=""
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{person.name}</p>
                                            <p className="truncate text-xs text-slate-500">{person.handle}</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="shrink-0 rounded-lg bg-violet-600/80 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-violet-500"
                                        >
                                            Follow
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* trending */}
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-violet-950/40 p-5">
                            <h2 className="text-sm font-semibold text-slate-300">Trending</h2>
                            <ul className="mt-3 space-y-2 text-sm">
                                {["#weekendvibes", "#photography", "#devlife"].map((tag) => (
                                    <li
                                        key={tag}
                                        className="cursor-default rounded-lg px-2 py-1.5 text-slate-400 transition hover:bg-white/5 hover:text-violet-300"
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>

            {/* mobile bottom nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-slate-950/95 px-2 py-2 backdrop-blur-xl lg:hidden">
                <ul className="mx-auto flex max-w-md justify-around">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.to === "/"}
                                className={({ isActive }) =>
                                    [
                                        "flex flex-col items-center gap-0.5 rounded-lg px-4 py-2 text-[10px] font-medium transition",
                                        isActive ? "text-violet-400" : "text-slate-500",
                                    ].join(" ")
                                }
                            >
                                {item.icon}
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="h-20 lg:hidden" />
        </div>
    );
};
