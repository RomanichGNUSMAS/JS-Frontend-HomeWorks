import React from "react";
import { useNavigate } from "react-router-dom";

export const LogOut: React.FC = () => {
    const navigate = useNavigate();
    const handleLogOut = () => {
        sessionStorage.clear();
        navigate('/signup');
    }
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] p-6 relative overflow-hidden before:content-[''] before:absolute before:top-[-80px] before:left-1/2 before:-translate-x-1/2 before:w-[500px] before:h-[200px] before:bg-[radial-gradient(ellipse,rgba(239,68,68,0.15),transparent_70%)] before:blur-[70px] before:pointer-events-none after:content-[''] after:absolute after:bottom-[-60px] after:right-[-60px] after:w-[300px] after:h-[220px] after:bg-[radial-gradient(ellipse,rgba(139,92,246,0.10),transparent_70%)] after:blur-[60px] after:pointer-events-none">

            <div className="relative z-10 w-full max-w-sm bg-white/[0.04] border border-white/[0.09] rounded-[28px] px-9 py-10 backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.09)] text-center before:content-[''] before:absolute before:inset-0 before:rounded-[28px] before:bg-gradient-to-br before:from-white/[0.06] before:to-transparent before:pointer-events-none">

                <div className="relative z-10 flex items-center justify-center w-14 h-14 mx-auto mb-6 rounded-2xl bg-red-500/[0.12] border border-red-500/[0.22]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400/80" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 17l-5-5 5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M15 12H3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <h1 className="relative z-10 text-[22px] font-extralight tracking-tight text-white/90 leading-snug mb-2">
                    Log out of <span className="font-semibold">Shoply</span>?
                </h1>
                <p className="relative z-10 text-[13px] text-white/30 leading-relaxed mb-8">
                    Are you sure you want to log out of your account?
                </p>

                <div className="relative z-10 flex gap-3">
                    <button
                        onClick={() => navigate('/about')}
                        className="flex-1 py-3 rounded-xl bg-white/[0.05] border border-white/[0.10] text-white/50 text-sm font-medium tracking-wide hover:bg-white/[0.10] hover:text-white/80 active:scale-[0.98] transition-all duration-200"
                    >
                        No
                    </button>
                    <button
                        onClick={handleLogOut}
                        className="flex-1 py-3 rounded-xl bg-red-500/[0.15] border border-red-500/[0.30] text-red-400/90 text-sm font-medium tracking-wide hover:bg-red-500/[0.25] hover:border-red-400/50 hover:text-red-300 active:scale-[0.98] transition-all duration-200"
                    >
                        Yes, log out
                    </button>
                </div>

            </div>
        </div>
    )
}