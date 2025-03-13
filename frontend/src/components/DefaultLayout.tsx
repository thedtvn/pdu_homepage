import { Outlet } from "react-router";
import Headers, { LinkObj } from "./Headers";
import Footer from "./Footers";
import { Box } from "@chakra-ui/react"
import { UserProvider } from "./UserProvider";

export default function DefaultLayout() {
    let links: LinkObj[] = [
        {
            name: "Giới thiệu",
            children: [
                { name: "Giới thiệu chung", url: "/gioi_thieu/gioi-thieu-chung" },
                { name: "Lịch sử phát triển", url: "/gioi_thieu/lich-su-phat-trien" },
                { name: "Hội đồng quản trị", url: "/gioi_thieu/hoi-dong-quan-tri" },
                { name: "Ban giám hiệu", url: "/gioi_thieu/ban-giam-hieu" }
            ]
        },
    ];

    return (
        <>
            <UserProvider>
                <Headers links={links} />
                <Box bg={"#F2E2B1"}
                    bgImage={"url(/assets/td_home.svg)"}
                    bgPosition={"center"}
                    bgRepeat={"no-repeat"}
                    bgSize={"cover"}
                    bgAttachment={"fixed"}
                    className="main-content"
                    minH={"90vh"}
                >
                    <Outlet />
                </Box >
                <Footer />
            </UserProvider>
        </>
    )
}