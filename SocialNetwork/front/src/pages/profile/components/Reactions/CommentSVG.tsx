import React from "react";
import type { Comments } from "../../../../config/types/types";
type Props = {
    data:Comments | null,
    setIsCommentsOpen:(prev:boolean) => void,
    isCommentsOpen:boolean,
    handleSend:(arg:string) => void
}
export const CommentSVG: React.FC<Props> = ({ handleSend, data, setIsCommentsOpen, isCommentsOpen }) => {
    const quickReactions = ["❤️", "😂", "😮", "😢"];

    return (
        <div className="flex items-center gap-3">
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
                <span className="text-xs font-medium">{data?.comments.length}</span>
            </button>

            <div className="flex items-center gap-1">
                {quickReactions.map((emoji) => (
                    <button
                        key={emoji}
                        onClick={() => handleSend(emoji)}
                        className="text-base leading-none transition-transform duration-150 hover:scale-125 active:scale-95"
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};