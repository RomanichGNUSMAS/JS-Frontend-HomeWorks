import React from "react";
import { Link } from "react-router-dom";
import type { Account } from "../config/types/types";

type Props = {
    user : Account,
    text: string,
    setText : (text:string) => void
}
export const Header:React.FC<Props> = ({ user,text,setText}) => {
    return (
        <>
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

                            <div className="hidden flex-1 items-center gap-3 sm:flex">
                                <div className="relative flex-1">
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
                                        value={text}
                                        onChange={e => setText(e.target.value)}
                                        placeholder="Search people, posts, tags…"
                                        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                                    />
                                </div>
                                <Link
                                    to={`/account/search/${text}`}
                                    className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-fuchsia-500"
                                >
                                    Search
                                </Link>
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
                                <Link
                                    to='newpost'
                                    className="hidden rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:from-violet-500 hover:to-fuchsia-500 sm:block"
                                >
                                    New Post
                                </Link>
                                <img
                                    src={(user.avatar && `http://localhost:4002/${user.avatar}`) || "https://img.icons8.com/fluent/1200/name.jpg"}
                                    alt=""
                                    className="h-9 w-9 rounded-full object-cover ring-2 ring-violet-500/40 lg:hidden"
                                />
                            </div>
                        </div>
                    </header>
        </>
    )
}