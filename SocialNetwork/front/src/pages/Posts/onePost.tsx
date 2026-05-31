import React from "react";
import { useNavigate, useParams } from "react-router-dom"
import type { Post } from "../../config/types/types";
import { Axios } from "../../config/Axios";
import { Comment } from "../profile/components/Comment";

export const OnePost: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = React.useState<Post | null>(null);
    const [isFullscreen, setIsFullscreen] = React.useState(false);

    React.useEffect(() => {
        if (!id) {
            navigate('/posts');
            return;
        }

        Axios.get<Post>(`/posts/${id}`)
            .then((response) => {
                const data = response.data && (response.data.postInfo || response.data);
                setPost(data);
            })
            .catch(() => navigate('/posts'));
    }, [id, navigate])

    const fallbackImage =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%232a303c'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23a1a1aa' font-family='system-ui, sans-serif' font-size='24'%3ENo Image Available%3C/text%3E%3C/svg%3E";

    const imageUrl = (img?: string | null) => {
        if (!img) return fallbackImage;
        if (/^(https?:)?\/\//.test(img)) return img;
        return `${Axios.defaults.baseURL}/${img}`;
    };

    return post && (
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
                    <button
                        onClick={() => setIsFullscreen(true)}
                        className="absolute right-2 top-2 rounded-lg bg-black/50 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/70"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                    </button>

                    {/* Fullscreen overlay */}
                    {isFullscreen && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
                            onClick={() => setIsFullscreen(false)}
                        >
                            <button
                                className="absolute right-4 top-4 rounded-lg bg-white/10 p-2 text-white transition hover:bg-white/20"
                                onClick={() => setIsFullscreen(false)}
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <img
                                src={imageUrl(post.postImage)}
                                alt={post.title}
                                className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-300 max-h-16 overflow-hidden">{post.description}</p>

                <div className="mt-4 flex items-center justify-between">
                    <time className="text-xs text-slate-400">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}</time>
                </div>

                {/* Блок действий (Инпуты и Кнопки) */}
                <Comment postid={post.id} />
            </div>
        </article>
    )
}
