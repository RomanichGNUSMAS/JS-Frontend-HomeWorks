import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export const Home: React.FC = () => {
    return (
        <div className="bg-gradient-to-br from-[#0f0c29] via-[#1a1040] to-[#0d1117]">
            <header className="sticky top-0 z-50 flex justify-center px-4 pt-4 pb-2">
                <nav className="flex items-center gap-1 p-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.10)]">
                    <NavLink
                        to="products"
                        className={({ isActive }) => `flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 ${isActive ? 'bg-white/15 text-white border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.3)]' : 'text-white/55 hover:text-white/90 hover:bg-white/10'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h18v4H3zM3 7h18v14H3z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Products
                    </NavLink>
                    <NavLink
                        to="about"
                        className={({ isActive }) => `flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 ${isActive ? 'bg-white/15 text-white border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.3)]' : 'text-white/55 hover:text-white/90 hover:bg-white/10'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.4 15A7.9 7.9 0 0012 9a7.9 7.9 0 00-7.4 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        About
                    </NavLink>
                    <NavLink
                        to="add"
                        className={({ isActive }) => `flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 ${isActive ? 'bg-white/15 text-white border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.3)]' : 'text-white/55 hover:text-white/90 hover:bg-white/10'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 5v14M5 12h14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Add Product
                    </NavLink>
                    <NavLink
                        to="signup"
                        className={({ isActive }) => `flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 ${isActive ? 'bg-white/15 text-white border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.3)]' : 'text-white/55 hover:text-white/90 hover:bg-white/10'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Sign Up
                    </NavLink>
                    <NavLink
                        to="login"
                        className={({ isActive }) => `flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 ${isActive ? 'bg-white/15 text-white border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.3)]' : 'text-white/55 hover:text-white/90 hover:bg-white/10'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 17l5-5-5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Log In
                    </NavLink>
                </nav>
            </header>
            <div className="min-h-screenpt-8 pb-16 relative overflow-hidden before:content-[''] before:absolute before:top-[-100px] before:left-1/2 before:-translate-x-1/2 before:w-[700px] before:h-[300px] before:bg-[radial-gradient(ellipse,rgba(139,92,246,0.22),transparent_70%)] before:pointer-events-none after:content-[''] after:absolute after:bottom-[-80px] after:right-[10%] after:w-[400px] after:h-[300px] after:bg-[radial-gradient(ellipse,rgba(59,130,246,0.12),transparent_70%)] after:pointer-events-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl p-6 border border-white/[0.07] shadow-[0_32px_64px_rgba(0,0,0,0.4)]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}