import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import type { Post } from "../../config/types/types";
import { Axios } from "../../config/Axios";

export const AnotherPosts: React.FC = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [posts, setPosts] = React.useState<Post[] | null>(null);

    const fallbackImage =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%232a303c'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23a1a1aa' font-family='system-ui, sans-serif' font-size='24'%3ENo Image Available%3C/text%3E%3C/svg%3E";

    const imageUrl = (img?: string | null) => {
        if (!img) return fallbackImage;
        if (/^(https?:)?\/\//.test(img)) return img;
        return `${Axios.defaults.baseURL}/${img}`;
    };

    React.useEffect(() => {
        console.log(username)
        if (!username) {
            navigate('/profile');
            return;
        }

        Axios.get<{ user: { posts: Post[] } }>(`/account/${username}`)
            .then((response) => {
                setPosts(response.data.user.posts || []);
            })
            .catch((err) => {
                console.log(err.message)
            });
    }, [username, navigate]);


    return posts && (
        <div className="space-y-6 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-white">Posts</h1>
                    <span className="text-sm text-slate-400">{posts.length} posts</span>
                </div>
            </div>

            {posts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/6 bg-white/3 p-8 text-center text-slate-300">
                    This user hasnt posted anything yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <article key={post.id} className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-800/40 shadow-lg ring-1 ring-white/5">
                            <div className="relative">
                                <img
                                    src={imageUrl(post.postImage)}
                                    alt={post.title}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = fallbackImage;
                                    }}
                                    loading="lazy"
                                    className="h-56 w-full min-h-[14rem] object-cover"
                                />
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                                <p className="mt-2 text-sm text-slate-300 max-h-16 overflow-hidden">{post.description}</p>

                                <div className="mt-4 flex items-center justify-between">
                                    <time className="text-xs text-slate-400">
                                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
                                    </time>
                                    <div className="flex items-center gap-2">
                                        <Link to={`/posts/${post.id}`} className="text-xs text-violet-400 hover:underline">
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}