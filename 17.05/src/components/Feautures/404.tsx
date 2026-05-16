import React from "react";
import { useNavigate } from "react-router-dom";

export const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-zinc-900 dark:to-zinc-800 p-6">
            <div className="w-full max-w-sm bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md rounded-2xl border border-white/30 dark:border-zinc-700 shadow-lg p-8 flex flex-col items-center">
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Error</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Страница не найдена.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 bg-gradient-to-b from-white/80 to-white/40 dark:from-sky-600/90 dark:to-sky-500/80 border border-white/40 dark:border-sky-700 text-slate-900 dark:text-white shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                >
                    Back to home
                </button>
            </div>
        </div>
    );
}
