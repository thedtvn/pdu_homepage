import { Outlet } from "react-router";
import Headers, { LinkObj } from "./Headers";
import Footer from "./Footers";
import { Box } from "@chakra-ui/react"

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
            <Headers links={links} />
            <Box bg={"linear-gradient(90deg, rgb(103, 103, 255) 33%, rgba(0,212,255,1) 100%)"}>
                <Box
                    bgImage={"url(/assets/trong_dong_dong_son.svg)"}
                    bgPosition={"center"}
                    bgRepeat={"no-repeat"}
                    bgSize={"inherit"}
                    bgAttachment={"fixed"}
                    minH={"80vh"}
                    className="main-content"
                >
                    <Outlet />
                </Box>
            </Box >
            <Footer />
        </>
    )
}