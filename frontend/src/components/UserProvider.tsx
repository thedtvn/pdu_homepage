import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getToken } from "../utils/Helper";
import { Button, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router";

export interface User {
    userId: string;
    fullname: string;
    username: string;
    role: "sv" | "gv" | "admin";
}

const UserContext = createContext<{user: User | null | undefined}>({user: undefined});

export const UserProvider = ({ children, is_login, role }: { children: ReactNode, is_login?: boolean, role?: string }) => {
    const [user, setUser] = useState<null | User | undefined>(undefined);
    useEffect(() => {
        if (is_login) {
            if (!role) return setUser(null);
        }
        const token = getToken();
        if (!token) return setUser(null);
        fetch("/api/@me/info", {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                if (!res.ok) return;
                return res.json();
            })
            .then(data => {
                setUser(data)
                if (is_login) {
                    if (data.role !== role) return location.href = "/";
                }
            })
            .catch(() => setUser(null));
    }, []);

    return (
        is_login != true ? (
            <UserContext.Provider value={{ user }}>
                {children}
            </UserContext.Provider>
        ) : user ? (
            <UserContext.Provider value={{ user }}>
                {children}
            </UserContext.Provider>
        ) : user === null ? (
            <Flex justifyContent="center" alignItems="center" flexDirection="column" h="100vh" w="100vw" p={4}>
                <h1 className="text-2xl font-bold">Vui lòng đăng nhập để tiếp tục</h1>
                <Button mt={4} colorScheme="blue" as={Link} to="/login">
                    Đăng nhập
                </Button>
            </Flex>
        ) : (
            <Flex justifyContent="center" alignItems="center" flexDirection="column" h="100vh" w="100vw">
                <Image src="/assets/logo.png" alt="Loading" h={"20%"} mb={4} />
                <h1 className="text-2xl font-bold">Đang tải...</h1>
            </Flex>
        )
    );
};

export const useUser = () => {
    return useContext(UserContext).user;
};