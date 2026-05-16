import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Comment, Product } from "../types/types";
import { Axios } from "../Feautures/api";
import { CommentBody } from "../Comments/CommentBody";



export const ProductDetails: React.FC = () => {
    const params = useParams();
    const [product, setProduct] = React.useState<Product | null>(null);
    React.useEffect(() => {
        Axios.get(`products/${params.id}`)
            .then(response => setProduct(response.data))
            .catch(() => {
                console.log('not found');
            });
    }, [params.id]);

    const navigate = useNavigate();

    const [rating, setRating] = React.useState<number>(0);
    const [hoverRating, setHoverRating] = React.useState<number>(0);
    const [comments, setComments] = React.useState<Comment[]>([]);

    const renderStar = (idx: number, size = 20) => {
        const filled = hoverRating ? idx <= hoverRating : idx <= rating;
        return (
            <button
                key={idx}
                type="button"
                onMouseEnter={() => setHoverRating(idx)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(idx)}
                aria-label={`${idx} star`}
                className="p-1"
            >
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill={filled ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className={`transition-colors duration-150 ${filled ? "text-yellow-400" : "text-white/40 hover:text-yellow-400"}`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.285 3.95a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.285 3.95c.3.921-.755 1.688-1.54 1.118L12 17.77l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.285-3.95a1 1 0 00-.364-1.118L4.64 9.377c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.285-3.95z" />
                </svg>
            </button>
        );
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0f0f13] via-[#1a1625] to-[#0d1117] p-6 relative overflow-hidden before:content-[''] before:absolute before:top-[-150px] before:right-[-150px] before:w-[500px] before:h-[500px] before:rounded-full before:bg-violet-600/[0.12] before:blur-[100px] before:pointer-events-none after:content-[''] after:absolute after:bottom-[-100px] after:left-[-100px] after:w-[400px] after:h-[400px] after:rounded-full after:bg-blue-600/[0.10] after:blur-[80px] after:pointer-events-none">
            {!product && (
                <p className="relative z-10 text-white/30 text-sm tracking-widest uppercase animate-pulse">
                    Loading...
                </p>
            )}

            {product && (
                <div className="relative z-10 w-full max-w-4xl bg-white/[0.04] border border-white/[0.08] rounded-3xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <img
                            src={product.photo}
                            alt={product.title}
                            className="w-full h-72 object-cover object-center rounded-2xl border border-white/[0.06]"
                        />
                        <h2 className="mt-4 text-lg font-semibold text-white/90 leading-snug tracking-tight">
                            {product.title}
                        </h2>
                        <p className="mt-1 text-xs font-medium tracking-[0.12em] uppercase text-violet-400/70">
                            by {product.author}
                        </p>
                        <h3 className="mt-3 text-3xl font-bold text-white tracking-tight flex items-baseline">
                            <span className="text-sm font-normal text-violet-400 mr-1">$</span>
                            {product.price}
                        </h3>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 flex flex-col">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm text-white/80 font-medium">Rating</h4>
                                    <p className="text-xs text-white/40">Rate this product</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center">
                                        {[1,2,3,4,5].map(i => renderStar(i, 24))}
                                    </div>
                                    <div className="text-sm text-white/60 pl-2">
                                        {rating > 0 ? `${rating}.0` : "—"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <CommentBody comments={comments} setComments={setComments} rating={rating} setRating={setRating}/>
                    </div>
                </div>
            )}

            <button
                onClick={() => navigate('/products')}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 px-8 py-3 rounded-full bg-white/[0.06] border border-white/[0.12] text-white/60 text-sm font-medium tracking-wide hover:bg-white/[0.12] hover:border-white/25 hover:text-white/90 hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-sm"
            >
                ← Back to products
            </button>
        </div>
    );
};