import { createContext, useContext, useState, useEffect } from "react";
import { getToken } from "../utils/Helper";

export interface User {
    userId: string;
    fullname: string;
    username: string;
    role: string;
}

const UserContext = createContext<null | {user: User}>(null);

export const UserProvider = ({ children }) => {
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