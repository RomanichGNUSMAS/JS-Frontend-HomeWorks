import React from "react";
import { Axios } from "../../config/Axios";
import { useNavigate } from "react-router-dom";

/** Public — open shackle, gap above lock body */
const LockOpenIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0V3"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 21.75h16.5a1.5 1.5 0 0 0 1.5-1.5v-9a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v9a1.5 1.5 0 0 0 1.5 1.5Z"
        />
    </svg>
);

/** Private — shackle connected to lock body */
const LockClosedIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
    </svg>
);

export const Privacy: React.FC = () => {
    const [isPrivate, setPrivate] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const handlePrivate = () => {
        const nextPrivacyValue = isPrivate ? 0 : 1;

        Axios.patch<{ user: { isAccountPrivate: number } }>(
            '/account/privacy',
            { isAccountPrivate: nextPrivacyValue },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            }
        )
        .then(() => {
            setPrivate(Boolean(nextPrivacyValue));
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    React.useEffect(() => {
        Axios.get<{ user: { isAccountPrivate: boolean } }>("/auth/user", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then((response) => {
                setPrivate(response.data.user.isAccountPrivate);
            })
            .catch(() => {
                navigate("/signup");
            });
    }, [navigate]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-white">Profile visibility</h2>
                <p className="mt-1 text-sm text-slate-400">
                    Control who can view your profile, posts, and follower list.
                </p>
            </div>

            {/* status card */}
            <div
                className={[
                    "relative overflow-hidden rounded-2xl border p-6 transition-colors duration-300",
                    isPrivate
                        ? "border-violet-500/30 bg-gradient-to-br from-violet-950/50 to-slate-900/80"
                        : "border-cyan-500/25 bg-gradient-to-br from-cyan-950/30 to-slate-900/80",
                ].join(" ")}
            >
                <div
                    className={[
                        "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl",
                        isPrivate ? "bg-violet-600/25" : "bg-cyan-500/20",
                    ].join(" ")}
                    aria-hidden
                />

                <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                    <div
                        className={[
                            "flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl ring-1",
                            isPrivate
                                ? "bg-violet-500/15 text-violet-300 ring-violet-500/30"
                                : "bg-cyan-500/15 text-cyan-300 ring-cyan-500/30",
                        ].join(" ")}
                    >
                        {isPrivate ? (
                            <LockClosedIcon className="h-10 w-10" />
                        ) : (
                            <LockOpenIcon className="h-10 w-10" />
                        )}
                    </div>

                    <div className="min-w-0 flex-1 text-center sm:text-left">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider">
                            {isPrivate ? (
                                <>
                                    <LockClosedIcon className="h-3.5 w-3.5 text-violet-400" />
                                    <span className="text-violet-300">Private</span>
                                </>
                            ) : (
                                <>
                                    <LockOpenIcon className="h-3.5 w-3.5 text-cyan-400" />
                                    <span className="text-cyan-300">Public</span>
                                </>
                            )}
                        </div>

                        <p className="mt-3 text-base font-semibold text-white">
                            {isPrivate ? "Your profile is private" : "Your profile is public"}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-slate-400">
                            {isPrivate
                                ? "Only approved followers can see your posts and full profile. Everyone else sees a limited view."
                                : "Anyone on Connect can discover your profile, see your posts, and follow you without approval."}
                        </p>
                    </div>
                </div>
            </div>

            {/* action hint */}
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-400">
                        {isPrivate ? (
                            <LockOpenIcon className="h-5 w-5" />
                        ) : (
                            <LockClosedIcon className="h-5 w-5" />
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-200">
                            {!isPrivate ? "Make your profile private" : "Make your profile public"}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            {!isPrivate
                                ? "Require follow requests and hide your content from non-followers."
                                : "Open your profile to everyone and allow instant follows."}
                        </p>
                        <button
                            type="button"
                            onClick={handlePrivate}
                            className={[
                                "mt-4 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition",
                                isPrivate
                                    ? "bg-gradient-to-r from-cyan-600 to-cyan-500 shadow-cyan-900/30 hover:from-cyan-500 hover:to-cyan-400"
                                    : "bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-violet-900/40 hover:from-violet-500 hover:to-fuchsia-500",
                            ].join(" ")}
                        >
                            {!isPrivate ? "Switch to private" : "Switch to public"}
                        </button>
                    </div>
                </div>
            </div>

            {/* visibility details */}
            <ul className="space-y-3">
                {[
                    {
                        label: "Profile page",
                        public: "Visible to everyone",
                        private: "Followers only",
                    },
                    {
                        label: "Posts",
                        public: "Shown in feed & search",
                        private: "Hidden from non-followers",
                    },
                    {
                        label: "Follow requests",
                        public: "Anyone can follow instantly",
                        private: "Approval required",
                    },
                ].map((row) => (
                    <li
                        key={row.label}
                        className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3"
                    >
                        <span className="text-sm text-slate-300">{row.label}</span>
                        <span className="flex items-center gap-2 text-xs text-slate-500">
                            {isPrivate ? (
                                <LockClosedIcon className="h-3.5 w-3.5 shrink-0 text-violet-400/80" />
                            ) : (
                                <LockOpenIcon className="h-3.5 w-3.5 shrink-0 text-cyan-400/80" />
                            )}
                            {isPrivate ? row.private : row.public}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
