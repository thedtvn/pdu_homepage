import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getToken } from "../utils/Helper";

export interface User {
    userId: string;
    fullname: string;
    username: string;
    role: "sv" | "gv" | "admin";
}

const UserContext = createContext<{user: User | null}>({user: null});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<null | User>(null);

    useEffect(() => {
        const token = getToken();
        if (!token) return;
        fetch("/api/@me/info", {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                if (!res.ok) return;
                return res.json();
            })
            .then(data => setUser(data))
            .catch(() => setUser(null));
    }, []);

    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext).user;
};