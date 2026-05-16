import React from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Axios } from "../Feautures/api"
import { useNavigate } from "react-router-dom"
import type { Product } from "../types/types"

type Props = Omit<Product, 'id'>

export const AddProduct: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Props>();
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState<Props>({
        title: "",
        author: "",
        photo: "",
        price: 0,
        rating:0,
        comments:[]
    });

    const onAdd: SubmitHandler<Props> = (data) => {
        Axios.post('/products', data)
            .then(() => navigate('/products'));
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-6">
            <form className="relative w-full max-w-md bg-white/[0.04] border border-white/[0.09] rounded-3xl p-9 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)] before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/[0.05] before:to-transparent before:pointer-events-none">
                {errors.title && (
                    <p className="text-[11px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-1.5 mb-2">
                        {errors.title.message}
                    </p>
                )}
                {errors.author && (
                    <p className="text-[11px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-1.5 mb-2">
                        {errors.author.message}
                    </p>
                )}
                {errors.price && (
                    <p className="text-[11px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-1.5 mb-2">
                        {errors.price.message}
                    </p>
                )}
                {errors.photo && (
                    <p className="text-[11px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-1.5 mb-2">
                        {errors.photo.message}
                    </p>
                )}

                <label className="block text-[11px] font-medium tracking-[0.08em] uppercase text-violet-400/75 mb-2">
                    Title
                </label>
                <input
                    type="text"
                    placeholder="title"
                    value={formData.title}
                    {...register("title", { required: "please fill title" })}
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
                    {...register("author", { required: "author is required" })}
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
                    {...register("price", { min: { value: 1, message: "minimum value is 1" }, required: "please fill a valid price", setValueAs: a => +a })}
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
                    {...register("photo", { required: "please fill the photo url" })}
                    onChange={e => setFormData({ ...formData, photo: e.target.value })}
                    className="w-full mb-7 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white/90 placeholder-white/20 text-sm outline-none focus:bg-white/[0.08] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all duration-200"
                />

                <button
                    onClick={handleSubmit(onAdd)}
                    className="w-full py-3.5 rounded-xl bg-violet-500/[0.18] border border-violet-500/[0.35] text-violet-300/95 text-sm font-medium tracking-wide hover:bg-violet-500/[0.30] hover:border-violet-400/55 hover:text-white active:scale-[0.98] transition-all duration-200"
                >
                    Save
                </button>
            </form>
        </div>
    )
}