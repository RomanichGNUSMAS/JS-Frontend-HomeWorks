import React from "react";
import type { Account } from "../../../config/types/types";

type Props = {
    fullName :string,
    setChange: (attr:boolean) => void,
    user : Account;
    inputRef : React.RefObject<HTMLInputElement | null> 
    avatar : string | undefined
}
export const UserHeader: React.FC<Props> = ({fullName,setChange,user,inputRef,avatar}) => {
    return inputRef && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-violet-950/30">
            <div className="relative h-36 sm:h-44">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/80 via-fuchsia-600/60 to-cyan-500/40" />
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                    aria-hidden
                />
                <div className="pointer-events-none absolute -right-8 top-4 h-32 w-32 rounded-full bg-fuchsia-400/20 blur-2xl" aria-hidden />
                <div className="pointer-events-none absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl" aria-hidden />
            </div>

            <div className="relative px-5 pb-6 sm:px-8">
                <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
                        <input onChange={e => setChange(true)} className="hidden" ref={inputRef} type="file" />
                        <img
                            onClick={e => inputRef.current?.click()}
                            src={`http://localhost:4002/${avatar}` || `http://localhost:4002/${user.avatar}`}
                            alt=""
                            className="h-28 w-28 shrink-0 rounded-2xl border-4 border-slate-950 object-cover shadow-xl shadow-black/40 ring-2 ring-violet-500/40 sm:h-32 sm:w-32"
                        />
                        <div className="min-w-0 pb-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    {fullName}
                                </h1>
                                <span
                                    className={[
                                        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                                        user.isAccountPrivate
                                            ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                                            : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
                                    ].join(" ")}
                                >
                                    {user.isAccountPrivate ? "Private" : "Public"}
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-violet-300/90">@{user.username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}