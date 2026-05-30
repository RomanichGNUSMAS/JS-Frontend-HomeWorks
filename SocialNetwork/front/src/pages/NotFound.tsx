import React from "react";
import { Link } from "react-router-dom";

export const NotFound: React.FC = () => {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 flex items-center justify-center px-4 sm:px-6 lg:px-8"
        >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 right-0 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
                aria-hidden
            />

            {/* Content */}
            <div className="relative z-10 text-center max-w-2xl mx-auto">
                {/* 404 Number with gradient */}
                <div className="mb-8">
                    <div className="relative inline-block">
                        <div className="text-9xl sm:text-[12rem] font-black bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 animate-pulse">
                            404
                        </div>
                        <div
                            className="absolute inset-0 text-9xl sm:text-[12rem] font-black text-transparent blur-lg"
                            style={{
                                backgroundImage: "linear-gradient(135deg, #a78bfa, #ec4899, #06b6d4)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                opacity: 0.3,
                            }}
                            aria-hidden
                        >
                            404
                        </div>
                    </div>
                </div>

                {/* Main text */}
                <div className="space-y-4 mb-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white">
                        Page Not Found
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-300">
                        Oops! The page you're looking for has wandered off into the digital void.
                    </p>
                </div>

                {/* Decorative line */}
                <div className="mb-8 flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500/50" />
                    <span className="text-sm text-slate-400">Something went wrong</span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-fuchsia-500/50" />
                </div>

                {/* Error details */}
                <div className="mb-12 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                    <p className="text-sm text-slate-400 mb-4">
                        The resource you requested could not be found. This might happen if:
                    </p>
                    <ul className="text-sm text-slate-300 space-y-2 text-left">
                        <li className="flex items-start gap-3">
                            <span className="text-violet-400 mt-0.5">→</span>
                            <span>The page has been moved or deleted</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-fuchsia-400 mt-0.5">→</span>
                            <span>You followed a broken or outdated link</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-cyan-400 mt-0.5">→</span>
                            <span>There's a typo in the URL</span>
                        </li>
                    </ul>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        to="/posts"
                        className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/50 hover:scale-105"
                    >
                        <svg
                            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>

                    <Link
                        to="/"
                        className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-lg border-2 border-cyan-500/50 text-cyan-300 font-semibold text-sm transition-all duration-300 hover:bg-cyan-500/10 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
                    >
                        <svg
                            className="w-5 h-5 transition-transform group-hover:rotate-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        View Profile
                    </Link>
                </div>

                {/* Footer text */}
                <div className="mt-12 text-sm text-slate-500">
                    <p>Need help? <Link to="/profile" className="text-violet-400 hover:text-violet-300 transition-colors">Contact support</Link></p>
                </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-20 left-10 w-3 h-3 bg-violet-400/30 rounded-full blur-sm animate-bounce" style={{ animationDelay: "0s" }} />
            <div className="absolute bottom-32 right-16 w-2 h-2 bg-cyan-400/30 rounded-full blur-sm animate-bounce" style={{ animationDelay: "0.5s" }} />
            <div className="absolute top-1/3 right-20 w-2 h-2 bg-fuchsia-400/30 rounded-full blur-sm animate-bounce" style={{ animationDelay: "1s" }} />
        </div>
    );
};
