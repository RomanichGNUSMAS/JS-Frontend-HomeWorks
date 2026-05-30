import React from "react";
import { NavLink } from "react-router-dom";

type obj = {
    to:string,
    label:string,
    icon:React.ReactNode
}
type Props = {
    navItems:obj[]
}
export const NavItems: React.FC<Props> = ({ navItems }) => {
    return (
        <>
            {navItems.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    end
                    className={({ isActive }) =>
                        [
                            "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                            isActive
                                ? "bg-gradient-to-r from-violet-600/80 to-fuchsia-600/60 text-white shadow-lg shadow-violet-900/40"
                                : "text-slate-400 hover:bg-white/5 hover:text-white",
                        ].join(" ")
                    }
                >
                    {item.icon}
                    {item.label}
                </NavLink>
            ))}
        </>
    )
}