import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Axios } from "../Feautures/api";
import type { Product, PseudoProduct } from "../types/types";
import { useForm, type SubmitHandler } from "react-hook-form";

type Props = Omit<PseudoProduct, 'id'>
export const EditProduct: React.FC = () => {
    const { id } = useParams();
    const [formData, setFormData] = React.useState<Props>({
        title: "",
        author: "",
        photo: "",
        price: 0
    })
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<Props>();
    React.useEffect(() => {
        Axios.get<Product>(`/products/${id}`)
            .catch(() => navigate('/products'));
    })


    const handleChange: SubmitHandler<Partial<Product>> = (data) => {
        const obj:Partial<Product> = {};

        for (const key in data) {
            const productKey = key as keyof Product;

            const value = data[productKey];

            if (value !== undefined && value !== null && value !== '') {
                (obj as unknown)[productKey] = value;
            }
        }

        Axios.patch(`products/${id}`, obj)
            .then(() => navigate('/products'));
    }
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-6">
            <form className="relative w-full max-w-md bg-white/[0.04] border border-white/[0.09] rounded-3xl p-9 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/[0.05] before:to-transparent before:pointer-events-none">
                <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-violet-400/75 mb-2">
                    Title
                </label>
                <input
                    type="text"
                    placeholder="title"
                    value={formData.title}
                    {...register("title", { required: false })}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full mb-5 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white/90 placeholder-white/20 text-sm outline-none focus:bg-white/[0.08] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all duration-200"
                />

                <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-violet-400/75 mb-2">
                    Author
                </label>
                <input
                    type="text"
                    placeholder="author"
                    value={formData.author}
                    {...register("author", { required: false })}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    className="w-full mb-5 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white/90 placeholder-white/20 text-sm outline-none focus:bg-white/[0.08] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all duration-200"
                />

                <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-violet-400/75 mb-2">
                    Price
                </label>
                <input
                    type="number"
                    placeholder="price"
                    value={formData.price}
                    {...register("price", { required: false, setValueAs: a => +a })}
                    onChange={e => setFormData({ ...formData, price: +e.target.value })}
                    className="w-full mb-5 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white/90 placeholder-white/20 text-sm outline-none focus:bg-white/[0.08] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all duration-200"
                />

                <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-violet-400/75 mb-2">
                    Photo URL
                </label>
                <input
                    type="text"
                    placeholder="photo url"
                    value={formData.photo}
                    {...register("photo", { required: false })}
                    onChange={e => setFormData({ ...formData, photo: e.target.value })}
                    className="w-full mb-7 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white/90 placeholder-white/20 text-sm outline-none focus:bg-white/[0.08] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all duration-200"
                />

                <button
                    onClick={handleSubmit(handleChange)}
                    className="w-full py-3.5 rounded-xl bg-violet-500/[0.18] border border-violet-500/[0.35] text-violet-300/95 text-sm font-medium tracking-wide hover:bg-violet-500/[0.30] hover:border-violet-400/55 hover:text-white active:scale-[0.98] transition-all duration-200"
                >
                    Save
                </button>
            </form>
        </div>
    )
}