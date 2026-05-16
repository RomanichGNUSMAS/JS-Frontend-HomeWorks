import { useParams } from "react-router-dom";
import { Axios } from "../Feautures/api";
import type { Comment } from "../types/types";
import React from 'react'

type Props = {
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
    rating: number,
    setRating: React.Dispatch<React.SetStateAction<number>>
}
export const AddComment: React.FC<Props> = ({ setComments, rating, setRating }) => {
    const [commentText, setCommentText] = React.useState<string>("");
    const params = useParams();

    const addComment = async () => {
        if (!commentText.trim()) return;

        const response = await Axios.get(`products/${params.id}`);

        const newComment: Comment = {
            id: Date.now(),
            author: "You",
            text: commentText.trim(),
            date: `${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()}`,
            rating: rating || undefined,
        };

        const updatedComments = [
            ...response.data.comments,
            newComment
        ];

        await Axios.patch(`products/${params.id}`, {
            comments: updatedComments,
            rating: rating
        });

        setComments(prev => [newComment, ...prev]);

        setCommentText("");
        setRating(0);
    };

    return (
        <div className="flex gap-3">
            <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-violet-500 to-blue-400 flex items-center justify-center text-white font-semibold">
                    Y
                </div>
            </div>
            <div className="flex-1">
                <textarea
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full resize-none bg-white/[0.02] border border-white/[0.04] rounded-xl p-3 text-sm text-white/90 placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
                />
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map(i => (
                            <button
                                key={`mini-${i}`}
                                type="button"
                                onClick={() => setRating(i)}
                                className={`p-1 ${i <= rating ? "text-yellow-400" : "text-white/30"} hover:text-yellow-400`}
                                aria-label={`rate-${i}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill={i <= rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.2" className="">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.285 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.285 3.95c.3.921-.755 1.688-1.54 1.118L12 17.77l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.285-3.95a1 1 0 00-.364-1.118L4.64 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.95z" />
                                </svg>
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => { setCommentText(""); setRating(0); }}
                            className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm hover:bg-white/[0.06] transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={addComment}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white text-sm font-medium hover:brightness-105 transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}