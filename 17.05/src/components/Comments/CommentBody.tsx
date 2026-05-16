import React from "react"
import { AddComment } from "./AddComment"
import type { Comment } from "../types/types"
import { Axios } from "../Feautures/api"
import { useNavigate, useParams } from "react-router-dom"

type Props = {
    comments:Comment[],
    rating:number,
    setComments:React.Dispatch<React.SetStateAction<Comment[]>>,
    setRating:React.Dispatch<React.SetStateAction<number>>
}

export const CommentBody: React.FC<Props> = ({comments, rating, setComments, setRating}) => {
    const params = useParams();
    const navigate = useNavigate()

    React.useEffect(() => {
        Axios.get(`products/${params.id}`)
            .then(response => setComments(response.data.comments))
            .catch(() => navigate('/'))
    })

    return (
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4">
            <h4 className="text-sm text-white/80 font-medium">Comment</h4>
            <p className="text-xs text-white/40 mb-3">Share your mind about product</p>

            <AddComment setComments={setComments} rating={rating} setRating={setRating} />
    
            <div className="mt-6 space-y-4">
                {comments.map(c => (
                    <div key={c.id} className="flex gap-3 items-start">
                        <div className="w-10 h-10 rounded-full bg-white/[0.04] flex items-center justify-center text-white/80 font-semibold">
                            {c.author ? c.author.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-white/90">{c.author || "User"}</div>
                                    <div className="text-xs text-white/40">{c.date}</div>
                                </div>
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={c.rating && i <= c.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" className={`${c.rating && i <= c.rating ? "text-yellow-400" : "text-white/20"}`}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.285 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.285 3.95c.3.921-.755 1.688-1.54 1.118L12 17.77l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.285-3.95a1 1 0 00-.364-1.118L4.64 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.95z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <p className="mt-2 text-sm text-white/80">{c.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}