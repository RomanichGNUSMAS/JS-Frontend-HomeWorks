import React from "react";
import { NavLink } from "react-router-dom";

type obj = {
    to: string,
    label: string,
    icon: React.ReactNode
}
type Props = {
    navItems: obj[]
}
export const NavMobileItems: React.FC<Props> = ({ navItems }) => {
    return (
        <>
            {navItems.map((item) => (
                <li key={item.to}>
                    <NavLink
                        to={item.to}
                        end={item.to === "/"}
                        className={({ isActive }) =>
                            [
                                "flex flex-col items-center gap-0.5 rounded-lg px-4 py-2 text-[10px] font-medium transition",
                                isActive ? "text-violet-400" : "text-slate-500",
                            ].join(" ")
                        }
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                </li>
            ))}
        </>
    )
}