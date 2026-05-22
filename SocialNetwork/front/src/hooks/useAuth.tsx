import React from "react"
import type { Account, User } from "../config/types/types"
import { Axios } from "../config/Axios"
import { useNavigate } from "react-router-dom"

export const useAuth = (foo: (user:Account) => void) => {
    const navigate = useNavigate();
    React.useEffect(() => {

        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signup");
        } else {
            Axios.get<{ user: Account }>("/auth/user")
                .then((res) => {
                    foo(res.data.user);
                })
                .catch(() => {
                    navigate("/signup");
                });
        }
    },[]);
}