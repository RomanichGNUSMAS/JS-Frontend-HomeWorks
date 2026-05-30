import React from "react";
import type { Account } from "../../../config/types/types";
import { Link } from "react-router-dom";

type Props = {
    user: Account
}
export const UserDetails: React.FC<Props> = ({ user }) => {
    return (
        <>
            <section className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <h2 className="text-sm font-semibold text-slate-300">Account details</h2>
                    <dl className="mt-4 space-y-3">
                        {[
                            { label: "First name", value: user.firstName },
                            { label: "Last name", value: user.lastName },
                            { label: "Username", value: `@${user.username}` },
                        ].map((row) => (
                            <div
                                key={row.label}
                                className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5"
                            >
                                <dt className="text-xs text-slate-500">{row.label}</dt>
                                <dd className="truncate text-sm font-medium text-slate-200">{row.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-slate-500">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-400">Posts</p>
                    <p className="mt-1 text-xs text-slate-600">{user.posts.length || 0} total</p>
                    <Link
                        to="/posts"
                        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-violet-500"
                    >
                        View all posts
                    </Link>
                </div>
            </section>
        </>
    )
}