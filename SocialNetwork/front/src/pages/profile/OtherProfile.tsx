import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Axios } from "../../config/Axios";
import type { Account } from "../../config/types/types";

const defaultAvatar =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJgAAACUCAMAAABY3hBoAAAAY1BMVEX///8AAABERET5+fny8vL29va3t7cXFxdVVVXPz8/Y2Njh4eHMzMzu7u7S0tJfX1+Li4sgICCtra1paWlPT0/BwcGjo6OXl5eEhIQSEhIsLCw+Pj4yMjJaWlpxcXE5OTl8fHwMOrCfAAAE40lEQVR4nO1b6baCOAy+yKJSUFYVV97/KWe8zk1SQGlpU8+c0++v0HylaXZ/fjw8PDw8PDw8PDw8PDwsIxZpcqz3TbOviyoV0bf5vJAnxT6QcCuS/Nusoqzuggl0dfbV75Zspli90FThl1iF7fU9rSfOyVeoifozrSfq1D2valK3Rjg4phWelGj9iz52ySu+qPIKgqvD6ylWE/Jv976/7x/jXx7CFa9oLUvuVqcsin9vYBhHWbEa/B44MrfR4HudsuET20J+YuWGWSN9rdOk0LyQLu3KBa8jlXjbvXsslRzokZ9XS+UVH2xBKO0g4eYVlurSEnrk3OaMqPW6nXu4Jbs48fJKiSWY5SWde/dWG63gjpKUvGCFz9ecvATKuau90eMbnA6AiFFU5rjT3coSCPSEleo7eDWvfJ8MhWyUb394c2DL9ktk4M3ccPEKUcN0XkMt40oBUpCg5frQNY3CEEtYKGELrxVMxCAt0ouvcoiT9jy8QhCgacTBXTQ8SpZfFh4JqABT9J+e/wRoJovgMEseR76DIEbTUoIlW29ZiGUQ8mheezAzax57gcQ0T0QwE9vCUSqEiNKLzMRQx5RDixfA95c8OiagHKaZjIG5OPNUpTAD1wz5ILzkysihrqkejT0RQrTEZPlx56XWkaBh5gquMYDVsrAYKWpeGmXkIEGrSIJFGLagH3MRDS3G7ZRcvEikqKEtmPLxlXwyCN/V1V+A6rNF1j80TVLOeDB7uzG2I0gpQvFikrIK1538BdaV1GKrlLzAyYt+sofKyZA6Mm+PJCSV1ctsZyEmvG7MJUVMeuddHylbBAFPxENAS/ifw5iUdg2ZK50/NIl7mrMPNy2hZeSHgxZELrcW3hzRTmpTsFYTAYkksrtPnKfo5XYSe5V/ilkQXA8pOakorYZNQ1bTSnEcCA66pi+qdrdrq6LfDHtvLvo1f2iHsj/B0Tm+kKh1xJ2e4wv5h4kLio3zmZVhO3UaF9e8RDVP6oWDs474E9V5ntEfyoOzeZV2ZBBm4GaUJlIYnRli70DVqvefa/3+p457lCYcGf1fsXWRtG223WZtmxT1JL8Ta6AoxoMozX08XhclfTN6kLH5Jod+v+jbN/F11I7Gkkq2vHLoIVefZ+rCamiDmbzmgNe5mk1GouTqgJnMqzyq2aZDyc1M5qU+4yfu0ouaBe950LQt6LRCv4MUIlnu2uTUTqw1F0/pcZ6tWo2YuqGN9tKCZr56leUZUHvfLPB7EWVmsc+bUbVf5I9jegWsXYCQ+JfHwhlNWl+Zr8YoghzkarHq5mR3lgoZZNIoMGgG0WXs2AwyaWSUipEE/m4jpN2R9cxWIju0EWhgAlkaKm2MKUxjzot8MOOcOrH5yTDe2xub7BAdSG+6lkAPbMEuEktt6jIPsNLFnBdVWNPalOVOEE5Gnc0WwjDMTlAQY5/AzMiiN7KUsaJqGJ1lCEHB2tJkgoCgsTY5Amw2WpvIB/Vfm9xLtK7Wag9YWDO5TagR1mZMMMgwUTKw1Pb+wxNBE8BkLBZ2ZyVOeQFjjOVr4ESuxR4CWqDl1xL1wWKxHrV/+bVEB2Ixs8cZieWLQvxkc+px8XwcAc6JWpxIQ9u/3DaCGSstFhxy8CbLb1T1WL2wpCzwDvHmv0UfjttfHh4eHh4eHh4eHh4e/2f8A+u5L3xKDUsWAAAAAElFTkSuQmCC";

export const OtherProfile: React.FC = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = React.useState<Account | null>(null);

    React.useEffect(() => {
        if (!username) {
            navigate('/profile');
            return;
        }

        Axios.get<{ user: Account }>(`/account/${username}`)
            .then((response) => {
                setUser(response.data.user);
            })
            .catch(() => {
                navigate('/profile');
            });
    }, [username, navigate]);

    if (!user) return null;

    const fullName = `${user.firstName} ${user.lastName}`;
    const followersCount = typeof user.followersCount === 'number' ? user.followersCount : (user.followers?.length ?? 0);
    const followingCount = typeof user.followingsCount === 'number' ? user.followingsCount : (user.followings?.length ?? 0);
    const bio = user.bio?.trim() || "No bio yet — tell the world a little about yourself.";

    return (
        <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg shadow-violet-950/30">
                <div className="relative h-36 sm:h-44">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/80 via-fuchsia-600/60 to-cyan-500/40" />
                    <div
                        className="absolute inset-0 opacity-40"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                        aria-hidden
                    />
                    <div className="pointer-events-none absolute -right-8 top-4 h-32 w-32 rounded-full bg-fuchsia-400/20 blur-2xl" aria-hidden />
                    <div className="pointer-events-none absolute -left-8 bottom-0 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl" aria-hidden />
                </div>

                <div className="relative px-5 pb-6 sm:px-8">
                    <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
                            <img
                                src={user.avatar || defaultAvatar}
                                alt=""
                                className="h-28 w-28 shrink-0 rounded-2xl border-4 border-slate-950 object-cover shadow-xl shadow-black/40 ring-2 ring-violet-500/40 sm:h-32 sm:w-32"
                            />
                            <div className="min-w-0 pb-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                        {fullName}
                                    </h1>
                                    <span
                                        className={[
                                            "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                                            user.isAccountPrivate
                                                ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                                                : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300",
                                        ].join(" ")}
                                    >
                                        {user.isAccountPrivate ? "Private" : "Public"}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-violet-300/90">@{user.username}</p>
                            </div>
                        </div>

                        <Link
                            to="/profile"
                            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-violet-500/40 hover:bg-violet-500/10"
                        >
                            Back to my profile
                        </Link>
                    </div>
                </div>
            </div>

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
                    <p className="text-2xl font-bold text-cyan-300">{user.posts?.length || 0}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
                        Posts
                    </p>
                    <p className="mt-1 text-[10px] text-slate-600">Coming soon</p>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <section className="lg:col-span-2">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
                            <svg className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v11.018Z" />
                            </svg>
                            About
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-slate-300">{bio}</p>
                    </div>
                </section>

                <section className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                        <h2 className="text-sm font-semibold text-slate-300">Account details</h2>
                        <dl className="mt-4 space-y-3">
                            {[
                                { label: "First name", value: user.firstName },
                                { label: "Last name", value: user.lastName },
                                { label: "Username", value: `@${user.username}` },
                            ].map((row) => (
                                <div
                                    key={row.label}
                                    className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5"
                                >
                                    <dt className="text-xs text-slate-500">{row.label}</dt>
                                    <dd className="truncate text-sm font-medium text-slate-200">{row.value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>

                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-5 text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-slate-500">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>
                        </div>
                        <p className="mt-3 text-sm font-medium text-slate-400">Posts</p>
                        <p className="mt-1 text-xs text-slate-600">{user.posts?.length || 0} total</p>
                        <Link
                            to={`/personposts/${user.username}`}
                            className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-violet-500"
                        >
                            View all posts
                        </Link>
                    </div>
                </section>
            </div>

            {(user.followers?.length > 0 || user.followings?.length > 0) && (
                <div className="grid gap-4 sm:grid-cols-2">
                    {user.followers?.length > 0 && (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <h3 className="text-sm font-semibold text-slate-300">
                                Recent followers
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {user.followers.slice(0, 4).map((person) => (
                                    <li key={person.id} className="flex items-center gap-3">
                                        <img
                                            src={person.avatar || defaultAvatar}
                                            alt=""
                                            className="h-10 w-10 rounded-full object-cover ring-2 ring-violet-500/30"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-white">
                                                {person.firstName} {person.lastName}
                                            </p>
                                            <p className="truncate text-xs text-slate-500">
                                                @{person.username}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {user.followings?.length > 0 && (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                            <h3 className="text-sm font-semibold text-slate-300">
                                Following
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {user.followings.slice(0, 4).map((person) => (
                                    <li key={person.id} className="flex items-center gap-3">
                                        <img
                                            src={person.avatar || defaultAvatar}
                                            alt=""
                                            className="h-10 w-10 rounded-full object-cover ring-2 ring-fuchsia-500/30"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-white">
                                                {person.firstName} {person.lastName}
                                            </p>
                                            <p className="truncate text-xs text-slate-500">
                                                @{person.username}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
