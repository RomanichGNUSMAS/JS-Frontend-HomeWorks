import React from "react"
import { useNavigate } from "react-router-dom"

export const About: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="relative min-h-[calc(100vh-120px)] flex items-start justify-center py-14 px-6 overflow-hidden before:content-[''] before:absolute before:top-[-100px] before:left-1/2 before:-translate-x-1/2 before:w-[700px] before:h-[260px] before:bg-[radial-gradient(ellipse,rgba(139,92,246,0.22),transparent_70%)] before:pointer-events-none after:content-[''] after:absolute after:bottom-[-80px] after:left-[-80px] after:w-[380px] after:h-[280px] after:bg-[radial-gradient(ellipse,rgba(59,130,246,0.13),transparent_70%)] after:pointer-events-none">

            <div className="relative z-10 w-full max-w-2xl flex flex-col gap-4">

                {/* hero */}
                <div className="text-center mb-10">
                    <span className="inline-block text-[11px] font-medium tracking-[0.18em] uppercase text-violet-400/70 border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 rounded-full backdrop-blur-md mb-5">
                        About us
                    </span>
                    <h1 className="text-5xl font-thin tracking-tighter text-white/95 leading-tight mb-4">
                        Books for <span className="font-semibold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">curious</span> minds
                    </h1>
                    <p className="text-[15px] text-white/40 leading-relaxed max-w-md mx-auto">
                        We believe every great idea starts with a book. Our platform brings together readers, authors, and stories that matter.
                    </p>
                </div>

                {/* stats */}
                <div className="grid grid-cols-3 gap-3 mb-2">
                    {[
                        { num: "12k+", label: "Books" },
                        { num: "4k+",  label: "Authors" },
                        { num: "98%",  label: "Happy readers" },
                    ].map(s => (
                        <div key={s.label} className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl py-6 text-center backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.07)] overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.04] before:to-transparent before:pointer-events-none">
                            <p className="text-3xl font-bold text-white tracking-tight leading-none">{s.num}</p>
                            <p className="text-[11px] tracking-[0.08em] uppercase text-white/35 mt-2">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* mission */}
                <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-3xl px-8 py-7 backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.07)] overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.05] before:to-transparent before:pointer-events-none">
                    <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-violet-400/70 mb-3">Our mission</p>
                    <h2 className="text-lg font-semibold text-white/90 mb-3 tracking-tight">Making knowledge accessible to everyone</h2>
                    <p className="text-sm text-white/40 leading-relaxed">
                        We started this project with a simple idea: great books should be easy to find, buy, and love. From classic philosophy to modern science fiction — every genre, every author, one place.
                    </p>
                </div>

                {/* values */}
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { icon: "✦", title: "Curated selection", text: "Every book is hand-picked by our editorial team for quality and depth." },
                        { icon: "◈", title: "Fair pricing",      text: "Transparent prices, no hidden fees. Authors get what they deserve." },
                        { icon: "⬡", title: "Fast delivery",     text: "Physical or digital — your books arrive the way you want them." },
                        { icon: "◎", title: "Community first",   text: "Reviews, discussions, recommendations — built around readers." },
                    ].map(v => (
                        <div key={v.title} className="relative bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 backdrop-blur-xl overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/[0.04] before:to-transparent before:pointer-events-none">
                            <p className="text-xl mb-3 select-none">{v.icon}</p>
                            <p className="text-[13px] font-semibold text-white/85 mb-1.5">{v.title}</p>
                            <p className="text-[12px] text-white/35 leading-relaxed">{v.text}</p>
                        </div>
                    ))}
                </div>

                {/* cta */}
                <div className="relative bg-violet-500/[0.08] border border-violet-500/[0.22] rounded-3xl px-8 py-8 text-center backdrop-blur-2xl overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-violet-500/[0.08] before:to-transparent before:pointer-events-none">
                    <h3 className="text-xl font-semibold text-white/90 mb-2 tracking-tight">Ready to find your next read?</h3>
                    <p className="text-sm text-white/40 leading-relaxed mb-6">
                        Browse thousands of titles across every genre.<br />Your next favourite book is one click away.
                    </p>
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <button
                            onClick={() => navigate('/products')}
                            className="px-7 py-2.5 rounded-full bg-violet-500/[0.20] border border-violet-500/[0.38] text-violet-300/95 text-sm font-medium tracking-wide hover:bg-violet-500/[0.32] hover:border-violet-400/58 hover:text-white active:scale-95 transition-all duration-200"
                        >
                            Browse products
                        </button>
                        <button
                            onClick={() => navigate('/add')}
                            className="px-7 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.12] text-white/55 text-sm font-medium tracking-wide hover:bg-white/[0.10] hover:text-white/85 active:scale-95 transition-all duration-200"
                        >
                            Add your book
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}