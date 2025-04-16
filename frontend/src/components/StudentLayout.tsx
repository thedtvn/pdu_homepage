import { Outlet } from "react-router";
import Headers, { LinkObj } from "./Headers";
import Footer from "./Footers";
import { UserProvider } from "./UserProvider";
import { Box } from "@chakra-ui/react";

export default function StudentLayout() {
    let links: LinkObj[] = [
        {
            name: "Lịch học",
            url: "https://tracuudiem.phuongdong.edu.vn/thoikhoabieu"
        },
        {
            name: "Tra cứu điểm thi",
            url: "https://tracuudiem.phuongdong.edu.vn"
        },
        {
            name: "Đóng học phí",
            url: "https://hocphi.phuongdong.edu.vn/"
        },
        {
            name: "Khảo sát ý kiến sinh viên",
            url: "https://ks.phuongdong.edu.vn/"
        }
    ];

    return (
        <>
            <UserProvider is_login={true} role="sv">
                <Headers links={links} />
                <Box minH={{ base: "95vh", md: "79vh" }}>
                    <Outlet />
                </Box>
                <Footer />
            </UserProvider>
        </>
    )
}