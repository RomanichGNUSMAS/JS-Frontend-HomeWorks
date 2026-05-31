import React from "react";
import { useGetRequest } from "../../../../hooks/useGetRequest";
import type { WholeRequest } from "../../../../config/types/types";
import { useAuth } from "../../../../hooks/useAuth";
import { Axios } from "../../../../config/Axios";

interface LikeType {
    reactions: {
        id: number,
        postId: number,
        userId: number
    }[]
}
export const Like: React.FC<{ postid: number }> = ({ postid }) => {
    const { data, loading, refetch } = useGetRequest<LikeType>(`/posts/${postid}/likes`);
    const [me, setMe] = React.useState<WholeRequest | null>(null);
    useAuth(setMe);

    const handleLike = () => {
        Axios.post(`/posts/${postid}/likes`)
            .then(() => {
                refetch();
            })
            .catch(err => console.log(err.message));
    }

    if (!me || loading) return <p>loading</p>;

    return me && (
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
            <button onClick={handleLike} className="group flex items-center gap-2 text-slate-400 transition-colors duration-200 hover:text-red-500">
                <svg
                    xmlns="http://w3.org"
                    fill={!!data?.reactions.find(reaction => reaction.userId == me.user.id) ? "red" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
                <span className="text-xs font-medium">{data?.reactions.length}</span>
            </button>
        </div>
    )
}