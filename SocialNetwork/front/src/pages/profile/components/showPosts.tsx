import React from "react";
import type { WholeRequest } from "../../../config/types/types";

export const ShowPosts:React.FC<{ data:WholeRequest}> = ({ data }) => {
    return (
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/30">
                <h2 className="text-xl font-semibold text-slate-100">Posts</h2>

                {data.user.isAccountPrivate && !data.followsMe && !data.followStatus ? (
                    <div className="mt-6 rounded-3xl bg-white/5 p-6 text-slate-300">
                        <p className="text-base text-slate-200">This account is private.</p>
                        <p className="mt-2 text-sm text-slate-400">Follow them to see their posts.</p>
                    </div>
                ) : (
                    <div className="mt-6 space-y-5">
                        {data.user.posts.length === 0 ? (
                            <div className="rounded-3xl bg-white/5 p-6 text-slate-300">
                                <p className="text-base text-slate-200">No posts yet.</p>
                            </div>
                        ) : (
                            data.user.posts.map((post, index) => (
                                <div key={post.id ?? index} className="w-60 rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                                    <img
                                        src={`http://localhost:4002/${post.postImage}`}
                                        alt={post.title}
                                        className="w-[200] rounded-3xl object-cover"
                                    />
                                    <div className="mt-4 space-y-2 text-slate-300">
                                        <p className="text-lg font-semibold text-slate-100">{post.title}</p>
                                        <p className="text-sm leading-6 text-slate-400">{post.description}</p>
                                        <p className="text-xs uppercase tracking-wide text-slate-500">{post.updatedAt}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
    )
} 