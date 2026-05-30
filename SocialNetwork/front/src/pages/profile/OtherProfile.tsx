import React from "react";
import { useParams } from "react-router-dom";
import { Axios } from "../../config/Axios";
import type { Account, WholeRequest } from "../../config/types/types";
import { useGetRequest } from "../../hooks/useGetRequest";
import { useAuth } from "../../hooks/useAuth";


type FollowRequest = {
    id: number,
    sender: Account
}

export const OtherProfile: React.FC = () => {
    const { username } = useParams();
    const { loading,data,refetch } = useGetRequest<WholeRequest>(`/account/${username}`)
    const [me,setMe] = React.useState<WholeRequest | null>(null);
    const [incomingRequest, setIncomingRequest] = React.useState<FollowRequest | null>(null);
    useAuth(setMe)

    React.useEffect(() => {
        if (!me || !data || me.user.id === data.user.id) {
            setIncomingRequest(null);
            return;
        }

        Axios.get<{ requests: FollowRequest[] }>('/follow/requests')
            .then(response => {
                const request = response.data.requests.find(
                    (req) => req.sender?.id === data.user.id
                );
                setIncomingRequest(request || null);
            })
            .catch(err => {
                console.error(err.message);
                setIncomingRequest(null);
            });
    }, [me, data]);

    if (loading && !data) {
        return (
            <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-slate-900/80 p-8 text-center text-slate-300 shadow-2xl shadow-black/30">
                <p className="text-lg font-semibold text-slate-100">Loading profile…</p>
            </div>
        )
    }

    const handleFollow = () => {
        if(!data) return;
        Axios.post(`/follow/${data.user.id}`)
            .then(() => {
                refetch();
            })
            .catch(err => console.error(err.message))
    }

    const handleAcceptRequest = () => {
        if (!incomingRequest) return;

        Axios.patch(`/follow/requests/accept/${incomingRequest.id}`)
            .then(() => {
                refetch();
                setIncomingRequest(null);
            })
            .catch(err => console.error(err.message));
    }

    return me && data && (
        <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-violet-950/40">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-5">
                        <img
                            src={(data.user.avatar && `http://localhost:4002/${data.user.avatar}`) || "https://img.icons8.com/fluent/1200/name.jpg"}
                            alt={data.user.username}
                            className="h-28 w-28 rounded-[2rem] object-cover ring-2 ring-violet-500/60"
                        />
                        <div>
                            <p className="text-2xl font-semibold text-slate-100">{data.user.username}</p>
                            <p className="mt-2 max-w-xl text-sm text-slate-400">{data.user.bio || "No bio provided yet."}</p>
                        </div>
                    </div>

                    {incomingRequest ? (
                        <button onClick={handleAcceptRequest} className="inline-flex rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400">
                            Accept Request
                        </button>
                    ) : (
                        <button onClick={handleFollow} className="inline-flex rounded-2xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
                            {data.followStatus ?
                                "Unfollow" :
                                data.requestSent ?
                                    "Cancel Request" :
                                    data.followsMe ?
                                        "Follow Back" :
                                        "Follow"
                            }
                        </button>
                    )}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white/5 p-5 text-slate-300">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Followers</p>
                        <p className="mt-3 text-3xl font-semibold text-slate-100">{data.user.followers.length}</p>
                    </div>
                    <div className="rounded-3xl bg-white/5 p-5 text-slate-300">
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Following</p>
                        <p className="mt-3 text-3xl font-semibold text-slate-100">{data.user.followings.length}</p>
                    </div>
                </div>
            </div>

            
        </div>
    )
}
