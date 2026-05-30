import React from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../config/Axios";
import type { Account } from "../../config/types/types";

type Props = {
    followStatus: boolean,
    followsMe: boolean,
    requestSent: boolean,
    user: Account
}

export const OtherProfile: React.FC = () => {
    const { username } = useParams();
    const [data, setData] = React.useState<Props | null>(null);

    React.useEffect(() => {
        if (!username) return;

        Axios.get(`/account/${username}`)
            .then(response => setData(response.data))
            .catch(err => console.log(err));
    }, [username]);

    if (!data) {
        return (
            <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center text-slate-300 shadow-2xl shadow-black/30">
                <p className="text-lg font-semibold text-slate-100">Loading profile…</p>
            </div>
        )
    }

    return (
        <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-violet-950/40">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-5">
                        <img
                            src={data.user.avatar || "https://img.icons8.com/fluent/1200/name.jpg"}
                            alt={data.user.username}
                            className="h-28 w-28 rounded-[2rem] object-cover ring-2 ring-violet-500/60"
                        />
                        <div>
                            <p className="text-2xl font-semibold text-slate-100">{data.user.username}</p>
                            <p className="mt-2 max-w-xl text-sm text-slate-400">{data.user.bio || "No bio provided yet."}</p>
                        </div>
                    </div>

                    <button className="inline-flex rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                        {data.requestSent ?
                            "Cancel Request" :
                            data.followStatus ?
                                "Unfollow" :
                                data.followsMe ?
                                    "Follow Back" :
                                    "Follow"
                        }
                    </button>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white/5 p-5 text-slate-300">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Followers</p>
                        <p className="mt-3 text-3xl font-semibold text-slate-100">{data.user.followers.length}</p>
                    </div>
                    <div className="rounded-3xl bg-white/5 p-5 text-slate-300">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Following</p>
                        <p className="mt-3 text-3xl font-semibold text-slate-100">{data.user.followings.length}</p>
                    </div>
                </div>
            </div>

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
                                <div key={post.id ?? index} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                                    <img
                                        src={post.postImage}
                                        alt={post.title}
                                        className="w-full rounded-3xl object-cover"
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
        </div>
    )
}
