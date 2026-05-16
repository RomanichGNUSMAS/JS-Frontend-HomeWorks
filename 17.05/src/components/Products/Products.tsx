import React from "react";
import type { Product } from "../types/types";
import { Axios } from "../Feautures/api";
import { useNavigate } from "react-router-dom";

export const Products: React.FC = () => {
    const [products, setProducts] = React.useState<Product[]>([]);
    const navigate = useNavigate();

    React.useEffect(() => {
        Axios.get<Product[]>('/products')
            .then(response => setProducts(response.data));
    }, [])

    const handleDelete = (id:number) => {
        Axios.delete(`products/${id}`)
            .then(() => setProducts(products.filter(product => product.id != id)))
            .catch(() => console.error('product not found'))
    }

    const handleEdit = (id:number) => {
        navigate(`/edit/${id}`)
    }
    return (
        <div className="w-full py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 auto-rows-max">
                {
                    products.map(product =>
                        <div
                            key={product.id}
                            className="group relative h-full bg-white/[0.05] rounded-2xl border border-white/[0.09] backdrop-blur-xl hover:bg-white/[0.09] hover:border-white/[0.18] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.5)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent pointer-events-none z-10"></div>

                            <div className="relative flex flex-col h-full">
                                <div className="relative overflow-hidden h-48 bg-white/[0.03]">
                                    <img
                                        className="w-full h-full object-cover brightness-90 group-hover:brightness-100 group-hover:scale-[1.07] transition-all duration-500"
                                        src={product.photo}
                                        alt={product.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0c29]/70 pointer-events-none"></div>
                                </div>

                                <div className="flex flex-col flex-1 p-4 pt-3.5 relative z-10">
                                    <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-violet-400/70 mb-1.5">
                                        by <span className="text-violet-400/90">{product.author}</span>
                                    </p>

                                    <h2 className="text-[15px] font-semibold text-white/90 leading-snug line-clamp-2 mb-4 flex-1">
                                        {product.title}
                                    </h2>

                                    <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/[0.07]">
                                        <h4 className="text-[22px] font-bold text-white tracking-tight leading-none">
                                            <span className="text-[13px] font-normal text-violet-400/80 mr-0.5">$</span>
                                            {product.price}
                                        </h4>
                                        <button
                                            onClick={() => navigate(`/products/${product.id}`)}
                                            className="px-4 py-2 rounded-full bg-violet-500/[0.18] border border-violet-500/[0.35] text-violet-300/95 text-[12px] font-medium tracking-wide hover:bg-violet-500/[0.32] hover:border-violet-400/60 hover:text-white transition-all duration-200"
                                        >
                                            Details
                                        </button>
                                        <button 
                                            className="px-4 py-2 rounded-full bg-red-500/[0.18] border border-red-500/[0.35] text-red-300/95 text-[12px] font-medium tracking-wide hover:bg-red-500/[0.32] hover:border-red-400/60 hover:text-white transition-all duration-200"
                                            onClick={() => handleDelete(product.id)}>Delete
                                        </button>
                                        <button
                                            className="px-4 py-2 rounded-full bg-yellow-500/[0.18] border border-yellow-500/[0.35] text-yellow-300/95 text-[12px] font-medium tracking-wide hover:bg-yellow-500/[0.32] hover:border-yellow-400/60 hover:text-white transition-all duration-200"
                                            onClick={() => handleEdit(product.id)}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}