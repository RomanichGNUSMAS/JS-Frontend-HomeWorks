import React from "react";
import type { Account } from "../../../config/types/types";
import { Link } from "react-router-dom";

type Props = {
    user: Account,
    defaultAvatar:string
}
export const FollowsPreview: React.FC<Props> = ({ user,defaultAvatar }) => {
    return (
        <>
            {(user.followers?.length > 0 || user.followings?.length > 0) && (
                <div className="grid gap-4 sm:grid-cols-2">
                    {user.followers?.length > 0 && (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <h3 className="text-sm font-semibold text-slate-300">
                                Recent followers
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {user.followers.slice(0, 4).map((person) => (
                                    <Link key={person.sender.id} to={`/otherprofile/${person.sender.username}`}>
                                    <li className="flex items-center gap-3">
                                        <img
                                            src={(person.sender.avatar && `http://localhost:4002/${person.sender.avatar}`) || defaultAvatar}
                                            alt=""
                                            className="h-10 w-10 rounded-full object-cover ring-2 ring-violet-500/30"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-white">
                                                {person.sender.firstName} {person.sender.lastName}
                                            </p>
                                            <p className="truncate text-xs text-slate-500">
                                                @{person.sender.username}
                                            </p>
                                        </div>
                                    </li>
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                    {user.followings?.length > 0 && (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <h3 className="text-sm font-semibold text-slate-300">
                                Following
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {user.followings.slice(0, 4).map((person) => (
                                    <Link key={person.receiver.id}  to={`/otherprofile/${person.receiver.username}`}>
                                    <li className="flex items-center gap-3">
                                        <img
                                            src={(person.receiver.avatar && `http://localhost:4002/${person.receiver.avatar}`) || defaultAvatar}
                                            alt=""
                                            className="h-10 w-10 rounded-full object-cover ring-2 ring-fuchsia-500/30"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-white">
                                                {person.receiver.firstName} {person.receiver.lastName}
                                            </p>
                                            <p className="truncate text-xs text-slate-500">
                                                @{person.receiver.username}
                                            </p>
                                        </div>
                                    </li>
                                    </Link> 
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}