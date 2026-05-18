import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Axios } from "../Feautures/api";

type Props = {
    isLogged:boolean,
    token: string | null;
    auth: React.RefObject<string[] | null>;
    setLogged: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LogVerify: React.FC<Props> = ({ token, auth, setLogged,isLogged }) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [hasAccess, setHasAccess] = React.useState<boolean>(false);
    const location = useLocation();

    const authLinks = (
        <div className="flex gap-4 items-center justify-center p-6">
            <NavLink
                to="signup"
                className={({ isActive }) => `flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 ${isActive ? 'bg-white/15 text-white border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.3)]' : 'text-white/55 hover:text-white/90 hover:bg-white/10'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Sign Up
            </NavLink>
            <NavLink
                to="login"
                className={({ isActive }) => `flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 ${isActive ? 'bg-white/15 text-white border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.3)]' : 'text-white/55 hover:text-white/90 hover:bg-white/10'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[15px] h-[15px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M10 17l5-5-5-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Log In
            </NavLink>
        </div>
    );

    React.useEffect(() => {
        const verify = async () => {
            if (!token) {
                setLogged(false);
                setHasAccess(false);
                setIsLoading(false);
                return;
            }

            try {
                await Axios.post('/api/verifyKey', { token });
                setHasAccess(true);
                setLogged(true);
            } catch {
                setHasAccess(false);
                setLogged(false);
                sessionStorage.removeItem('token');
            } finally {
                setIsLoading(false);
            }
        };

        verify();
    }, [token, location.pathname, setLogged, auth]);

    if (hasAccess || isLogged) {
        return <Outlet />;
    }

    if (isLoading && token) {
        return <div className="text-white text-center py-6">Loading...</div>;
    }


    const currentAuthPaths = auth.current || ['/login', '/signup'];
    if (currentAuthPaths.includes(location.pathname)) {
        return <Outlet />;
    }

    return authLinks;
};
