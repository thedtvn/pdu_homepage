import { Outlet } from "react-router";
import Headers, { LinkObj } from "./Headers";
import Footer from "./Footers";
import { UserProvider } from "./UserProvider";

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
                    <Outlet />
                <Footer />
            </UserProvider>
        </>
    )
}