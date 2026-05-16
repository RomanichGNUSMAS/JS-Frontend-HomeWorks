import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { UserINFO } from "../types/types";

export const Signup: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserINFO>();
    const [User, setUser] = React.useState<UserINFO>({
        name: '',
        password: '',
        email: ''
    })
    const navigate = useNavigate();

    const handleRegistr: SubmitHandler<UserINFO> = (data) => {
        //Axios.post('/api/backend/regist')
        navigate('/login')
    }

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-6 relative overflow-hidden before:content-[''] before:absolute before:top-[-80px] before:left-1/2 before:-translate-x-1/2 before:w-[600px] before:h-[220px] before:bg-[radial-gradient(ellipse,rgba(139,92,246,0.25),transparent_70%)] before:blur-[70px] before:pointer-events-none after:content-[''] after:absolute after:bottom-[-60px] after:right-[-60px] after:w-[320px] after:h-[240px] after:bg-[radial-gradient(ellipse,rgba(59,130,246,0.13),transparent_70%)] after:blur-[60px] after:pointer-events-none">

            <form className="relative z-10 w-full max-w-sm bg-white/[0.04] border border-white/[0.09] rounded-[28px] px-9 py-10 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.09)] before:content-[''] before:absolute before:inset-0 before:rounded-[28px] before:bg-gradient-to-br before:from-white/[0.06] before:to-transparent before:pointer-events-none">

                <span className="inline-block text-[11px] font-medium tracking-[0.16em] uppercase text-violet-400/70 border border-violet-500/25 bg-violet-500/10 px-3.5 py-1 rounded-full mb-4 backdrop-blur-md">
                    Create account
                </span>

                <h1 className="text-[26px] font-extralight tracking-tight text-white/92 mb-1.5 leading-snug">
                    Join <span className="font-semibold">Shoply</span>
                </h1>
                <p className="text-[13px] text-white/30 leading-relaxed mb-8">
                    Start your reading journey today.
                </p>

                {errors.name && (
                    <p className="text-[11px] text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-1.5 mb-3">
                        {errors.name.message}
                    </p>
                )}
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
                    Name
                </label>
                <input
                    type="text"
                    placeholder="Your name"
                    value={User.name}
                    {...register("name", { required: "please fill valid name" })}
                    onChange={e => setUser({ ...User, name: e.target.value })}
                    className="w-full mb-5 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white/90 placeholder-white/20 text-sm outline-none focus:bg-white/[0.08] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all duration-200"
                />

                <label className="block text-[11px] font-medium tracking-[0.10em] uppercase text-violet-400/72 mb-2">
                    Email
                </label>
                <input
                    type="text"
                    placeholder="you@example.com"
                    value={User.email}
                    {...register("email", { required: "please fill valid email" })}
                    onChange={e => setUser({ ...User, email: e.target.value })}
                    className="w-full mb-5 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white/90 placeholder-white/20 text-sm outline-none focus:bg-white/[0.08] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all duration-200"
                />

                <label className="block text-[11px] font-medium tracking-[0.10em] uppercase text-violet-400/72 mb-2">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={User.password}
                    {...register("password", { minLength: { value: 8, message: "password can't be minimum 8 characters" }, required: "please fill valid password" })}
                    onChange={e => setUser({ ...User, password: e.target.value })}
                    className="w-full mb-7 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white/90 placeholder-white/[0.18] text-sm outline-none focus:bg-white/[0.08] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/15 transition-all duration-200"
                />

                <button
                    onClick={handleSubmit(handleRegistr)}
                    className="w-full py-3.5 rounded-xl bg-violet-500/[0.18] border border-violet-500/[0.35] text-violet-300/95 text-sm font-medium tracking-wide hover:bg-violet-500/[0.30] hover:border-violet-400/55 hover:text-white active:scale-[0.98] transition-all duration-200 mb-5"
                >
                    Sign Up
                </button>

                <p className="text-center text-[12px] text-white/25">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate('/login')}
                        className="text-violet-400/75 hover:text-violet-300 cursor-pointer transition-colors duration-200"
                    >
                        Log in
                    </span>
                </p>

            </form>
        </div>
    )
}