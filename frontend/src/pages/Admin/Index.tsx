import { Flex, Grid, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export default function AdminIndex() {
    return (
        <>  
            
            <Grid m={3} templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                <Flex justifyContent="center" alignItems={"center"} h={10} bg={"white"} borderRadius={5}>
                    <Link to="/admin/posts">
                        <Text>
                            Quản lý bài viết
                        </Text>
                    </Link>
                </Flex>
                <Flex justifyContent="center" alignItems={"center"} h={10} bg={"white"} borderRadius={5}>
                    <Text>
                        Học sinh và Giáo viên
                    </Text>
                </Flex>
                <Flex justifyContent="center" alignItems={"center"} h={10} bg={"white"} borderRadius={5}>
                    <Link to="/admin/apps">
                        <Text>
                            Quán Lí Ứng Dụng
                        </Text>
                    </Link>
                </Flex>
            </Grid>
        </>
    );
}