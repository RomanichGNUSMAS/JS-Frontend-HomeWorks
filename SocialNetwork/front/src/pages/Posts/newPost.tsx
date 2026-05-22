import { useForm, type SubmitHandler } from "react-hook-form";
import type { Account, Post } from "../../config/types/types";
import { Axios } from "../../config/Axios";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

type a = Omit<Post, "id">;
type Props = Omit<a, "authorId" | "tags" | "location">;
const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20";

const labelClass = "block text-sm font-medium text-slate-300";

const iconClass = "pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500";

export const NewPost = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Props>();
    const [user, setUser] = React.useState<Account | null>(null);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    useAuth(setUser);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCreate: SubmitHandler<Props> = (data) => {
        if(!user || !imageFile) return;
        
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("authorId", user.id);
        formData.append("id", Date.now().toString());
        formData.append("tags", JSON.stringify(["any"]));
        formData.append("location", "Armenia");
        
        Axios.post("/posts", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(() => {
                //success html
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    const fieldErrors = Object.values(errors);

    return (
        user && (
            <div className="space-y-6">
                <div>
                    <h2 className="text-lg font-semibold text-white">Create a post</h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Share a photo and story with your followers on Connect.
                    </p>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-fuchsia-500/25 bg-gradient-to-br from-fuchsia-950/40 to-slate-900/80 p-6">
                    <div
                        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-fuchsia-600/20 blur-2xl"
                        aria-hidden
                    />
                    <div className="relative flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-500/15 text-fuchsia-300 ring-1 ring-fuchsia-500/30">
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="font-semibold text-white">New post</p>
                            <p className="mt-1 text-sm text-slate-400">
                                Add an image, title, and description. Posts appear on your profile.
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit(handleCreate)} className="space-y-5">
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
                                <label htmlFor="postImage" className={labelClass}>
                                    Photo
                                </label>
                                {!imagePreview ? (
                                    <label
                                        htmlFor="postImage"
                                        className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/5 px-6 py-10 transition hover:border-fuchsia-500/40 hover:bg-fuchsia-500/5"
                                    >
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-400 ring-1 ring-white/10 transition group-hover:text-fuchsia-300 group-hover:ring-fuchsia-500/30">
                                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 20.25h13.5A2.25 2.25 0 0 0 21 18V8.25A2.25 2.25 0 0 0 18.75 6H15.75M3 16.5 3.75 12.75M3 16.5l3.75-3.75M21 12.75V8.25A2.25 2.25 0 0 0 18.75 6h-3.75M15.75 6V3.375A1.125 1.125 0 0 0 14.625 2.25H9.375A1.125 1.125 0 0 0 8.25 3.375V6m7.5 0V4.875A1.125 1.125 0 0 0 14.625 3.75H9.375A1.125 1.125 0 0 0 8.25 4.875V6"
                                                />
                                            </svg>
                                        </div>
                                        <p className="mt-4 text-sm font-medium text-slate-300 group-hover:text-white">
                                            Click to upload an image
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">PNG, JPG or WEBP</p>
                                        <input
                                            id="postImage"
                                            type="file"
                                            accept="image/*"
                                            required
                                            className="sr-only"
                                            {...register("postImage", { required: "please select an image" })}
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                ) : (
                                    <div className="relative rounded-xl border border-white/15 bg-white/5 p-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-full rounded-lg object-cover max-h-96"
                                        />
                                        <label
                                            htmlFor="postImage"
                                            className="mt-4 inline-block cursor-pointer rounded-lg bg-fuchsia-600 px-4 py-2 text-sm font-medium text-white hover:bg-fuchsia-500 transition"
                                        >
                                            Change Image
                                            <input
                                                id="postImage"
                                                type="file"
                                                accept="image/*"
                                                required
                                                className="sr-only"
                                                {...register("postImage", { required: "please select an image" })}
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="title" className={labelClass}>
                                    Title
                                </label>
                                <div className="relative">
                                    <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    <input
                                        id="title"
                                        type="text"
                                        placeholder="Give your post a title"
                                        className={[
                                            inputClass,
                                            errors.title ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : "",
                                        ].join(" ")}
                                        {...register("title", { required: "please fill a valid title" })}
                                    />
                                </div>
                                {errors.title && (
                                    <p className="text-xs text-red-400">{errors.title.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className={labelClass}>
                                    Description
                                </label>
                                <div className="relative">
                                    <svg
                                        className="pointer-events-none absolute left-3.5 top-4 h-5 w-5 text-slate-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v11.018Z" />
                                    </svg>
                                    <input
                                        id="description"
                                        type="text"
                                        placeholder="What's this post about?"
                                        className={[
                                            inputClass,
                                            errors.description
                                                ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20"
                                                : "",
                                        ].join(" ")}
                                        {...register("description", { required: "please fill a valid title" })}
                                    />
                                </div>
                                {errors.description && (
                                    <p className="text-xs text-red-400">{errors.description.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-900/40 transition hover:from-violet-500 hover:to-fuchsia-500 sm:w-auto"
                    >
                        Create post
                    </button>
                </form>
            </div>
        )
    );
};
