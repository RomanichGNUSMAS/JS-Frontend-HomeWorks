import React from "react";
import { useNavigate, useParams } from "react-router-dom"
import type { Post } from "../../config/types/types";
import { Axios } from "../../config/Axios";

export const OnePost: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = React.useState<Post | null>(null);
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
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                    <p className="mt-2 text-sm text-slate-300 max-h-16 overflow-hidden">{post.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                        <time className="text-xs text-slate-400">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}</time>
                    </div>

                </div>
            </article>
    )
}