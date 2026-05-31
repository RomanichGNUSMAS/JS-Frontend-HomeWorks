import React from "react";
import { Like } from "./Like";
import type { Account, WholeRequest } from "../../../config/types/types";
import { useAuth } from "../../../hooks/useAuth";
import { useGetRequest } from "../../../hooks/useGetRequest";
import { Axios } from "../../../config/Axios";
import { Link } from "react-router-dom";

interface Comments {
    comments: {
        id: number,
        text: string,
        user: Account,
        userid: number,
        postid: number
    }[]
}
export const Comment: React.FC<{ postid: number }> = ({ postid }) => {
    const [isCommentsOpen, setIsCommentsOpen] = React.useState(false);
    const [me, setMe] = React.useState<WholeRequest | null>(null);
    const [text, setText] = React.useState('');
    const { data, loading, refetch } = useGetRequest<Comments>(`/posts/${postid}/comments/`);
    useAuth(setMe)

    const handleDelete = (commentId) => {
        Axios.delete(`posts/${postid}/comments/${commentId}`)
            .then(() => {
                refetch();
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const handleSend = () => {
        Axios.post(`/posts/${postid}/comments`, { text })
            .then(() => {
                setText('');
                refetch();
            })
            .catch(err => console.log(err.message))
    }
    if (!me || loading) return <p>loading...</p>
    return me && (
        <>
            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                        className="group flex items-center gap-1.5 text-slate-400 transition-colors duration-200 hover:text-blue-400"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 group-active:scale-95"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48L4.35 19.75a.75.75 0 0 0 .93.98l2.646-1.058c1.226.379 2.535.578 3.824.578Z"
                            />
                        </svg>
                        <span className="text-xs font-medium">{data.comments.length}</span>
                    </button>
                </div>

                <Like postid={postid} />
            </div>

            {/* Выпадающее поле ввода комментария (UI) */}
            {isCommentsOpen && (
                <div className="mt-3 border-t border-white/5 pt-3 animate-fadeIn">
                    {data?.comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                            {/* Avatar */}
                            <Link to={`/otherprofile/${comment.user.username}`}>
                            <img
                                src={
                                    comment.user.avatar
                                        ? `http://localhost:4002/${comment.user.avatar}`
                                        : "https://img.icons8.com/fluent/1200/name.jpg"
                                }
                                alt={comment.user.username}
                                className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10 shrink-0"
                            />
                            </Link>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="text-xs font-semibold text-slate-300">
                                        {comment.user.username}
                                    </span>
                                    {comment.user.id === me.user.id && (
                                        <button
                                            onClick={() => handleDelete(comment.id)}
                                            className="text-slate-600 hover:text-red-400 transition-colors duration-200 text-xs"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                <p className="text-sm text-slate-400 mt-0.5 break-words">
                                    {comment.text}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="flex gap-2">
                        <input
                            value={text}
                            onChange={e => setText(e.target.value)}
                            type="text"
                            placeholder="Write a comment..."
                            className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-1.5 text-sm text-slate-200 placeholder-slate-500 outline-none transition-all duration-200 focus:border-blue-500/50 focus:bg-slate-950/60"
                        />
                        <button onClick={handleSend} className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-blue-500 active:scale-95">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}