import { Flex, Grid } from "@chakra-ui/react";
import { Link } from "react-router";

export default function HomeStudent() {

    const links = [
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

    return (<>
        <Flex direction="column">
            <Flex>
                Dashboard Student
            </Flex>
            <Grid m={3} templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                {
                    links.map((link, index) => (
                        <Link to={link.url} key={index} target="_blank" className="card">
                            <Flex justifyContent="center" alignItems="center" className="card-body">
                                {link.name}
                            </Flex>
                        </Link>
                    ))
                }
            </Grid>
        </Flex>
    </>)
}