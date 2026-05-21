import React from "react";
import { Link } from "react-router-dom";
import type { User } from "../../config/types/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Axios } from "../../config/Axios";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

export const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const navigate = useNavigate();
    const [error, setError] = React.useState<string>("");

    const handleLogIn: SubmitHandler<User> = (data) => {
        Axios.post("/auth/signin", data)
            .then((response) => {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            })
            .catch((err) => {
                if (isAxiosError(err)) {
                    const response = err.response?.data?.message as string;
                    setError(response);
                }
            });
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-slate-100">
            {/* ambient background */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
                <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-violet-600/25 blur-3xl" />
                <div className="absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-fuchsia-600/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl shadow-violet-950/50 backdrop-blur-xl lg:grid-cols-2">
                {/* left — branding */}
                <div className="relative hidden flex-col justify-between bg-gradient-to-br from-violet-600/90 via-violet-700/80 to-fuchsia-700/90 p-10 lg:flex">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.06%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-80" />
                    <div className="relative">
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 shadow-lg backdrop-blur-sm">
                            <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-violet-100/90">
                            Sign in to Connect — share moments, follow friends, and stay in the loop.
                        </p>
                    </div>
                    <div className="relative space-y-4">
                        {[
                            "End-to-end encrypted messages",
                            "Curated feed & stories",
                            "Private or public profiles",
                        ].map((feature) => (
                            <div key={feature} className="flex items-center gap-3 text-sm text-violet-50/90">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20">
                                    <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                </span>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>

                {/* right — form */}
                <div className="flex flex-col justify-center p-8 sm:p-10">
                    {/* mobile logo */}
                    <div className="mb-8 flex items-center gap-3 lg:hidden">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30">
                            <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-lg font-bold">Connect</p>
                            <p className="text-xs text-slate-400">Sign in to your account</p>
                        </div>
                    </div>

                    <div className="mb-8 hidden lg:block">
                        <h2 className="text-2xl font-bold tracking-tight">Sign in</h2>
                        <p className="mt-1 text-sm text-slate-400">Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleSubmit(handleLogIn)} className="space-y-5">
                        {/* server error */}
                        {error && (
                            <div
                                role="alert"
                                className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                            >
                                <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* validation errors */}
                        {Object.values(errors).length > 0 && (
                            <div className="space-y-1 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3">
                                {Object.values(errors).map((err) => (
                                    <p key={err.message} className="flex items-center gap-2 text-sm text-amber-300">
                                        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                        </svg>
                                        {err.message}
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* username */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-slate-300">
                                Username
                            </label>
                            <div className="relative">
                                <svg
                                    className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                <input
                                    id="username"
                                    type="text"
                                    autoComplete="username"
                                    placeholder="your_username"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                                    {...register("username", { required: "please fill a valid username" })}
                                />
                            </div>
                        </div>

                        {/* password */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <div className="relative">
                                <svg
                                    className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                                    {...register("password", {
                                        minLength: { value: 8, message: "password can't be shorter than 8 character" },
                                        required: "please fill a valid password",
                                    })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:from-violet-500 hover:to-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2 focus:ring-offset-slate-950 active:scale-[0.99]"
                        >
                            Log in
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold text-violet-400 transition hover:text-violet-300"
                        >
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
