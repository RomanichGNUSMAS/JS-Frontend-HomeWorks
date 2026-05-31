import React from "react";
import { Like } from "./Like";
import type { Comments, WholeRequest } from "../../../../config/types/types";
import { useAuth } from "../../../../hooks/useAuth";
import { useGetRequest } from "../../../../hooks/useGetRequest";
import { Axios } from "../../../../config/Axios";
import { Link } from "react-router-dom";
import { PeopleComments } from "./PeopleComments";
import { CommentSVG } from "./CommentSVG";


export const Comment: React.FC<{ postid: number }> = ({ postid }) => {
    const [isCommentsOpen, setIsCommentsOpen] = React.useState(false);
    const [me, setMe] = React.useState<WholeRequest | null>(null);
    const [text, setText] = React.useState('');
    const { data, loading, refetch } = useGetRequest<Comments>(`/posts/${postid}/comments/`);
    useAuth(setMe)

    const handleDelete = (commentId:number) => {
        Axios.delete(`posts/${postid}/comments/${commentId}`)
            .then(() => {
                refetch();
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    const handleSend = (textArg:string) => {
        if(!text?.trim() && !textArg?.trim()) return;
        Axios.post(`/posts/${postid}/comments`, { text:!text?.trim() ? textArg : text })
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
                <CommentSVG handleSend={handleSend} data={data} isCommentsOpen={isCommentsOpen} setIsCommentsOpen={setIsCommentsOpen} />

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
                            <PeopleComments me={me} comment={comment} handleDelete={handleDelete}/>
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
                        <button onClick={e => handleSend('')} className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-blue-500 active:scale-95">
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}