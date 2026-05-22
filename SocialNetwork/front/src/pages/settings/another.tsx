import { useNavigate } from "react-router-dom";

export const Another = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
            <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
                <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
                <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>

            <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-10 sm:px-6 lg:px-8">
                <div className="w-full rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-violet-400/80">Settings</p>
                            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Account actions</h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                                Log out of your account safely. This clears local session data and returns you to the sign-in flow.
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.clear();
                                navigate('/signup');
                            }}
                            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-fuchsia-500 active:scale-[0.98]"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Session</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                Your local session data will be cleared immediately. This includes tokens and any cached account information stored in the browser.
                            </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">Security</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                Use this action if you want to sign out from this device and return to the login screen. Your account data remains safe on the server.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};