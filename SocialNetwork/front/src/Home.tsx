import React from "react";
import { Link, Outlet } from "react-router-dom";
import type { Account, WholeRequest } from "./config/types/types";
import { Header } from "./components/Header";
import { NavItems } from "./components/navItems";
import { NavMobileItems } from "./pages/profile/components/NavMobileItems";
import { useAuth } from "./hooks/useAuth";

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

export const Home: React.FC = () => {
    const [text,setText] = React.useState<string>('')
    const [{user}, setUser] = React.useState<WholeRequest | { user: null } >({user : null});
    useAuth(setUser)

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
                            <NavItems navItems={navItems}/>
                        </nav>

                        {/* user card */}
                        <div className="mt-auto rounded-xl border border-white/10 bg-slate-900/60 p-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={`http://localhost:4002/${user.avatar}` || "https://img.icons8.com/fluent/1200/name.jpg" }
                                    alt=""
                                    className="h-11 w-11 rounded-full object-cover ring-2 ring-violet-500/50"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-semibold">{`${user.firstName} ${user.lastName}`}</p>
                                    <p className="truncate text-xs text-slate-400">@{user.username}</p>
                                </div>
                            </div>
                            <Link
                                to="/settings"
                                className="mt-3 block w-full rounded-lg border border-white/10 bg-white/5 py-2 text-center text-xs font-medium text-slate-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
                            >
                                Settings
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* main column */}
                <div className="flex min-w-0 w-full flex-1 flex-col">
                    {/* top bar */}
                    <Header user={user} text={text} setText={setText}/>

                    {/* page content */}
                    <main className="flex w-full flex-1 flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-4 shadow-inner shadow-black/20 sm:p-6">
                        <div className="w-full min-h-full flex-1">
                            <Outlet />
                        </div>
                    </main>
                </div>

            </div>

            {/* mobile bottom nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-slate-950/95 px-2 py-2 backdrop-blur-xl lg:hidden">
                <ul className="mx-auto flex max-w-md justify-around">
                    <NavMobileItems navItems={navItems} />
                </ul>
            </nav>

            <div className="h-20 lg:hidden" />
        </div>
    );
};
