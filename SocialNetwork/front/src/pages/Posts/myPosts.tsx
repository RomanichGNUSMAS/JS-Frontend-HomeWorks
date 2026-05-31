import React from "react";
import type { Account, Post, WholeRequest } from "../../config/types/types";
import { useAuth } from "../../hooks/useAuth";
import { Axios } from "../../config/Axios";
import { Link } from "react-router-dom";
import { Like } from "../profile/components/Reactions/Like";

export const MyPosts: React.FC = () => {
    const [{ user }, setUser] = React.useState<WholeRequest | { user: null }>({ user: null });
    useAuth(setUser);

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this post?")) return;

        try {
            await Axios.delete(`/posts/${id}`);

            if (!user) return;

            setUser((prevState) => {
                if (!prevState || !prevState.user) return prevState;

                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        posts: prevState.user.posts.filter((post) => post.id !== id)
                    }
                } as WholeRequest;
            });

        } catch (err: any) {
            console.error(err?.message || err);
        }
    };

    const fallbackImage =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%232a303c'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23a1a1aa' font-family='system-ui, sans-serif' font-size='24'%3ENo Image Available%3C/text%3E%3C/svg%3E";

    const imageUrl = (img?: string | null) => {
        if (!img) return fallbackImage;
        if (/^(https?:)?\/\//.test(img)) return img;
        return `${Axios.defaults.baseURL}/${img}`;
    };

    if (!user) return null;

    return (
        <div className="space-y-6 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-white">My Posts</h1>
                    <span className="text-sm text-slate-400">{user.posts?.length ?? 0} posts</span>
                </div>
            </div>

            {(!user.posts || user.posts.length === 0) ? (
                <div className="rounded-2xl border border-dashed border-white/6 bg-white/3 p-8 text-center text-slate-300">
                    You haven't created any posts yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {user.posts.map((post: Post) => (
                        <article key={post.id} className="group overflow-hidden rounded-2xl border border-white/5 bg-slate-900/60 transition hover:border-violet-500/20 hover:bg-slate-900/80">

                            {/* image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={imageUrl(post.postImage)}
                                    alt={post.title}
                                    onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
                                    loading="lazy"
                                    className="h-48 w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <button
                                    onClick={() => handleDelete(post.id)}
                                    className="absolute right-3 top-3 rounded-xl bg-black/50 p-2 text-white/70 opacity-0 backdrop-blur-sm transition group-hover:opacity-100 hover:bg-red-500 hover:text-white"
                                    aria-label="Delete post"
                                >
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.02-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916" />
                                    </svg>
                                </button>
                            </div>

                            {/* content */}
                            <div className="p-4">
                                <h3 className="font-semibold text-slate-100 line-clamp-1">{post.title}</h3>
                                <p className="mt-1 text-sm text-slate-400 line-clamp-2">{post.description}</p>

                                <div className="mt-4 flex items-center justify-between">
                                    <time className="text-xs text-slate-500">
                                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
                                    </time>
                                    <Link
                                        to={`/posts/${post.id}`}
                                        className="rounded-lg bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-400 transition hover:bg-violet-500/20 hover:text-violet-300"
                                    >
                                        View →
                                    </Link>
                                </div>
                                <Like postid={post.id} />
                            </div>

                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};