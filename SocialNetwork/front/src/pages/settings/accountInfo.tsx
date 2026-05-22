import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Axios } from "../../config/Axios";
import { useNavigate } from "react-router-dom";

type Props = {
    currentPassword: string;
    newPassword: string;
};

const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20";

const labelClass = "block text-sm font-medium text-slate-300";

const iconClass = "pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500";

const KeyIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
        />
    </svg>
);

export const AccountInfo: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Props>();
    const navigate = useNavigate();
    const [response, setResponse] = React.useState<string>("");

    const handleChange: SubmitHandler<Props> = (data) => {
        Axios.patch(
            "/account/settings/password",
            {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            },
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
        )
            .then((res) => {
                setResponse(res.data.message + ' we will redirect you to login page for security');
                setTimeout(() => {
                    localStorage.clear();
                    navigate('/login')
                },1000);
            })
            .catch(() => {
                setResponse('wrong current password try again');
            });
    };

    const fieldErrors = Object.values(errors);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold text-white">Account security</h2>
                <p className="mt-1 text-sm text-slate-400">
                    Update your password to keep your account safe.
                </p>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/40 to-slate-900/80 p-6">
                <div
                    className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-violet-600/20 blur-2xl"
                    aria-hidden
                />

                <div className="relative flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300 ring-1 ring-violet-500/30">
                        <KeyIcon className="h-7 w-7" />
                    </div>
                    <div>
                        <p className="font-semibold text-white">Change your password</p>
                        <p className="mt-1 text-sm text-slate-400">
                            Use at least 8 characters. Avoid passwords you use on other sites.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(handleChange)} className="space-y-5">
                {response && (
                    <div
                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 ring-1 ring-violet-500/20"
                        role="status"
                    >
                        {response}
                    </div>
                )}

                {fieldErrors.length > 0 && (
                    <ul className="space-y-2 rounded-xl border border-red-500/30 bg-red-950/30 px-4 py-3">
                        {fieldErrors.map((error, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-red-300">
                                <svg
                                    className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                                    />
                                </svg>
                                {error.message}
                            </li>
                        ))}
                    </ul>
                )}

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="currentPassword" className={labelClass}>
                                Current password
                            </label>
                            <div className="relative">
                                <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                                    />
                                </svg>
                                <input
                                    id="currentPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Enter current password"
                                    className={[
                                        inputClass,
                                        errors.currentPassword ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : "",
                                    ].join(" ")}
                                    {...register("currentPassword", {
                                        minLength: {
                                            value: 8,
                                            message: "password can't be shorter than 8 characters",
                                        },
                                        required: "please fill a valid password",
                                    })}
                                />
                            </div>
                            {errors.currentPassword && (
                                <p className="text-xs text-red-400">{errors.currentPassword.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="newPassword" className={labelClass}>
                                New password
                            </label>
                            <div className="relative">
                                <KeyIcon className={iconClass} />
                                <input
                                    id="newPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Enter new password"
                                    className={[
                                        inputClass,
                                        errors.newPassword ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : "",
                                    ].join(" ")}
                                    {...register("newPassword", {
                                        minLength: {
                                            value: 8,
                                            message: "password can't be shorter than 8 characters",
                                        },
                                        required: "please fill a valid password",
                                    })}
                                />
                            </div>
                            {errors.newPassword && (
                                <p className="text-xs text-red-400">{errors.newPassword.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-500">
                    {[
                        "Minimum 8 characters",
                        "Mix letters and numbers for stronger security",
                        "You will stay signed in after updating",
                    ].map((tip) => (
                        <li key={tip} className="flex items-center gap-2">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-violet-500/60" />
                            {tip}
                        </li>
                    ))}
                </ul>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:from-violet-500 hover:to-fuchsia-500 sm:w-auto"
                >
                    Update password
                </button>
            </form>
        </div>
    );
};
