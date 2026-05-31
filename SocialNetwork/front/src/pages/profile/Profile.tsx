import React from "react";
import type { WholeRequest } from "../../config/types/types";
import { useAuth } from "../../hooks/useAuth";
import { Axios } from "../../config/Axios";
import { UserDetails } from "./components/UserDetails";
import { FollowsPreview } from "./components/FollowPreview";
import { ConfirmModal } from "./components/confirmModal";
import { UserHeader } from "./components/userHeader";

const defaultAvatar =
    "https://img.icons8.com/fluent/1200/name.jpg";


export const Profile: React.FC = () => {
    const [{ user }, setUser] = React.useState<WholeRequest | { user: null }>({ user: null });
    const ref = React.useRef<HTMLInputElement>(null);
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [isChanged, setChange] = React.useState(false);
    const [avatar, setAvatar] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        if (user?.avatar) {
            setAvatar(user.avatar);
        }
    }, [user?.avatar]);
    useAuth(setUser);


    if (!user) return null;

    const fullName = `${user.firstName} ${user.lastName}`;
    const followersCount = typeof user.followersCount === 'number' ? user.followersCount : (user.followers?.length ?? 0);
    const followingCount = typeof user.followingsCount === 'number' ? user.followingsCount : (user.followings?.length ?? 0);
    const bio =
        user.bio?.trim() ||
        "No bio yet — tell the world a little about yourself.";

    const handleInput = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            if (ref.current) {
                Axios.patch('/account/bio', { bio: ref.current.textContent })
                    .catch(err => console.log(err.message));
            }
        }, 1000);
    };
    return user && (
        <div className="space-y-6">
            {/* cover + header */}
            <UserHeader avatar={avatar} setChange={setChange} inputRef={inputRef} fullName={fullName} user={user} />

            {/* stats */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                    <p className="text-2xl font-bold text-violet-300">{followersCount}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                        Followers
                    </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm">
                    <p className="text-2xl font-bold text-fuchsia-300">{followingCount}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                        Following
                    </p>
                </div>
                <div className="col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-violet-950/40 p-4 text-center sm:col-span-1">
                    <p className="text-2xl font-bold text-cyan-300">{user.posts.length || "no posts"}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                        Posts
                    </p>
                    <p className="mt-1 text-[10px] text-slate-600">Coming soon</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* bio */}
                <section className="lg:col-span-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                            <svg className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v11.018Z" />
                            </svg>
                            About
                        </h2>
                        <p
                            ref={ref}
                            suppressContentEditableWarning={true}
                            contentEditable
                            onInput={handleInput}
                            role="textbox"
                            aria-label="Edit bio"
                            className="mt-4 text-sm leading-relaxed text-slate-300 min-h-[7rem] p-3 rounded-lg bg-white/3 border border-white/6 focus:outline-none focus:ring-0 focus:border-white/10"
                        >
                            {bio}
                        </p>
                    </div>
                </section>

                {/* details */}
                <UserDetails user={user} />
            </div>

            {/* followers preview */}
            <FollowsPreview user={user} defaultAvatar={defaultAvatar} />
            {isChanged && <ConfirmModal setChange={setChange} inputRef={inputRef} setAvatar={setAvatar} />}
        </div>
    );
};
