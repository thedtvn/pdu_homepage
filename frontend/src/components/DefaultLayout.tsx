import { Outlet } from "react-router";
import Headers, { LinkObj } from "./Headers";
import Footer from "./Footers";
import { UserProvider } from "./UserProvider";
import { Box } from "@chakra-ui/react";

export default function DefaultLayout() {
    let links: LinkObj[] = [
        {
            name: "Danh sách bài viết",
            url: "/posts"
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