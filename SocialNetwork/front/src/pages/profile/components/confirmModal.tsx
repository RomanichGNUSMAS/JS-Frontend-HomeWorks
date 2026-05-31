import React from "react";
import ReactModal from "react-modal";
import { Axios } from "../../../config/Axios";

if (typeof document !== "undefined") {
    ReactModal.setAppElement("#root");
}

export const ConfirmModal: React.FC<{
    setChange: (attr: boolean) => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    setAvatar: (attr: string) => void;
    onConfirm?: () => void;
    message?: string;
}> = ({ setChange, onConfirm, message = "Are you sure you want to continue?", inputRef, setAvatar }) => {
    const handleClose = () => setChange(false);
    const handleConfirm = () => {
        onConfirm?.();
        if (!inputRef?.current?.files || !inputRef.current) return;
        const file = inputRef.current.files[0];
        const formData = new FormData();
        formData.append('profile-pic', file);

        Axios.patch<{ picture:string }>('/account/avatar', formData)
            .then((res) => {
                console.log(res.data.picture)
                setAvatar(res.data.picture)
            })
            .catch((err) => console.log(err.message))
            .finally(() => {
                handleClose();
            });
    };

    return (
        <ReactModal
            isOpen={true}
            onRequestClose={handleClose}
            contentLabel="Confirm action"
            overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm px-4 py-6"
            className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 text-slate-100 shadow-2xl shadow-black/40 outline-none"
        >
            <button
                type="button"
                onClick={handleClose}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition hover:bg-white/10"
                aria-label="Close modal"
            >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div className="space-y-5">
                <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.3em] text-violet-300/80">Confirm action</p>
                    <h2 className="text-2xl font-semibold">{message}</h2>
                    <p className="text-sm leading-6 text-slate-400">
                        This action cannot be undone. Please confirm whether you want to continue.
                    </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="inline-flex w-full justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className="inline-flex w-full justify-center rounded-2xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400 sm:w-auto"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </ReactModal>
    );
};
