import { Outlet } from "react-router";
import Headers, { LinkObj } from "./Headers";
import Footer from "./Footers";
import { UserProvider } from "./UserProvider";
import { Box } from "@chakra-ui/react";

export default function AdminLayout() {
    let links: LinkObj[] = [
        {
            name: "Quản lý bài viết",
            children: [
                { name: "Danh sách bài viết", url: "/admin/posts" },
                { name: "Thêm bài viết", url: "/admin/posts/add" }
            ]
        },
        {
            name: "Quản lý người dùng",
            children: [
                { name: "Danh sách người dùng", url: "/admin/users" },
                { name: "Thêm người dùng", url: "/admin/users/add" }
            ]
        },
        {
            name: "Quản lý ứng dụng",
            url: "/admin/apps"
        }
    ];

    return (
        <>
            <UserProvider>
                <Headers links={links} />
                <Box minH={{ base: "95vh", md: "79vh" }}>
                <Outlet />
                </Box>
                <Footer />
            </UserProvider>
        </>
    )
}