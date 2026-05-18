import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { UserINFO } from "../types/types";
import { Axios } from "../Feautures/api";

type FormData = Omit<UserINFO, 'name'>

export const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState<FormData>({
        email: '',
        password: ''
    })

    const handleLogIn: SubmitHandler<FormData> = (data) => {
        Axios.post('/api/login',data)
            .then(response => {
                sessionStorage.setItem('token',response.data.token)
                navigate('/')
            })
            .catch(e => {
                console.log(e.message)
            })
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-6 relative overflow-hidden before:content-[''] before:absolute before:top-[-80px] before:left-1/2 before:-translate-x-1/2 before:w-[600px] before:h-[220px] before:bg-[radial-gradient(ellipse,rgba(139,92,246,0.25),transparent_70%)] before:blur-[70px] before:pointer-events-none after:content-[''] after:absolute after:bottom-[-60px] after:right-[-60px] after:w-[320px] after:h-[240px] after:bg-[radial-gradient(ellipse,rgba(59,130,246,0.13),transparent_70%)] after:blur-[60px] after:pointer-events-none">

            <form className="relative z-10 w-full max-w-sm bg-white/[0.04] border border-white/[0.09] rounded-[28px] px-9 py-10 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.09)] before:content-[''] before:absolute before:inset-0 before:rounded-[28px] before:bg-gradient-to-br before:from-white/[0.06] before:to-transparent before:pointer-events-none">

                <span className="inline-block text-[11px] font-medium tracking-[0.16em] uppercase text-violet-400/70 border border-violet-500/25 bg-violet-500/10 px-3.5 py-1 rounded-full mb-4 backdrop-blur-md">
                    Welcome back
                </span>

                <h1 className="text-[26px] font-extralight tracking-tight text-white/92 mb-1.5 leading-snug">
                    Sign in to <span className="font-semibold">Shoply</span>
                </h1>
                <p className="text-[13px] text-white/30 leading-relaxed mb-8">
                    Enter your credentials to continue reading.
                </p>

                {errors.email && (
                    <p className="text-[11px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-1.5 mb-3">
                        {errors.email.message}
                    </p>
                )}
                {errors.password && (
                    <p className="text-[11px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-1.5 mb-3">
                        {errors.password.message}
                    </p>
                )}

                <label className="block text-[11px] font-medium tracking-[0.10em] uppercase text-violet-400/72 mb-2">
                    Email
                </label>
                <input
                    type="text"
                    placeholder="you@example.com"
                    value={formData.email}
                    {...register("email", { required: "please fill valid email" })}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full mb-5 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white/90 placeholder-white/20 text-sm outline-none focus:bg-white/[0.08] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all duration-200"
                />

                <label className="block text-[11px] font-medium tracking-[0.10em] uppercase text-violet-400/72 mb-2">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    {...register("password", { required: "please fill a valid password" })}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    className="w-full mb-7 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white/90 placeholder-white/[0.18] text-sm outline-none focus:bg-white/[0.08] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all duration-200"
                />

                <button
                    onClick={handleSubmit(handleLogIn)}
                    className="w-full py-3.5 rounded-xl bg-violet-500/[0.18] border border-violet-500/[0.35] text-violet-300/95 text-sm font-medium tracking-wide hover:bg-violet-500/[0.30] hover:border-violet-400/55 hover:text-white active:scale-[0.98] transition-all duration-200 mb-5"
                >
                    Log In
                </button>

                <p className="text-center text-[12px] text-white/25">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate('/signup')}
                        className="text-violet-400/75 hover:text-violet-300 cursor-pointer transition-colors duration-200"
                    >
                        Sign up
                    </span>
                </p>

            </form>
        </div>
    )
}