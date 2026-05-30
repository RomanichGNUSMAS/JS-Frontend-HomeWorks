import React from "react"
import type { Account, User } from "../config/types/types"
import { Axios } from "../config/Axios"
import { useNavigate } from "react-router-dom"

type Props = {
    followStatus: boolean,
    followsMe: boolean,
    requestSent: boolean,
    user: Account
}

export const useAuth = (foo: (user:Props) => void) => {
    const navigate = useNavigate();
    React.useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signup");
        } else {
            Axios.get("/auth/user")
                .then((res) => {
                    foo(res.data);
                })
                .catch(() => {
                    navigate("/signup");
                });
        }
    },[]);
}