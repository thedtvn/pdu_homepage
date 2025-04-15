import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import "./../styles/index.css";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { Post } from "./Post";

export default function Home() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
            const url = new URL("/api/post/getPosts", location.origin);
            url.searchParams.append("page", "1");
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    setPosts(data.posts);
                });
        }, []);

    const images = [
        { url: "/assets/cu_nhan.jpg", postUrl: "#" },
        { url: "/assets/teacherrrr.jpg", postUrl: "#" },
    ];
    // TODO: make Image slider
    return (
        <Flex direction="column" gap={5}>
            <Carousel interval={10_000} as={Flex} w="100%" h="100%">
                {images.map((image, index) => {
                    return (
                        <Carousel.Item key={index}>
                            <Image
                                w="100%"
                                aspectRatio={16 / 5.4}
                                objectFit="cover"
                                objectPosition="bottom"
                                overflow="hidden"
                                src={image.url}
                                alt="First slide"
                                onClick={() => navigate(image.postUrl)}
                            />
                        </Carousel.Item>
                    )
                })}
            </Carousel>
            <Flex justifyContent={"center"} align={"center"} position={"relative"} pt={10}>
                <Box bg={"#000080"} w={350} h={150} position={"absolute"} right={0} top={20} zIndex={-1}></Box>
                <Box bg={"#000080"} w={350} h={150} position={"absolute"} left={0} bottom={5} zIndex={-1}></Box>
                <Box bg={"#ffffff"} w={"container.xl"} p={5} pl={8} borderRadius={8} boxShadow={"lg"}>
                    <Flex direction={{
                        base: "column",
                        md: "row"
                    }}>
                        <Flex direction="column" pt={5}>
                            <Text fontSize={"3xl"} fontWeight={"bold"}>Vài nét về trường</Text>
                            <Text pr={10}>
                                Đại học Phương Đông là một trong những trường ĐH ngoài công lập đầu tiên trong hệ thống giáo dục đại học Việt Nam. Trường được thành lập theo Quyết định số 350/TTg ngày 8/7/1994 của Thủ tướng Chính phủ và chính thức đi vào hoạt động theo quyết định số 2282/GD-ĐT của Bộ Giáo dục và Đào tạo ngày 16/8/1994. Nhà trường tổ chức khai giảng khóa đầu tiên ngày 24/10/1994.
                            </Text>
                            <Link>Xem thêm</Link>
                        </Flex>
                        <Image src="/assets/truso1.jpeg" borderRadius={10}/>
                    </Flex>
                </Box>
            </Flex>
            <Flex mt={5} w={"100%"} direction="column" justifyContent="center" alignItems="center">
                <Text fontWeight={"bold"} fontSize={"x-large"} textAlign={"center"}>
                    Thông tin tuyển sinh
                </Text>
                <Flex
                    maxW="100%"
                    h={{ base: "auto", md: "30vh" }}
                    direction={{ base: "column", md: "row" }}
                    overflow="auto"
                    gap={4}
                    mt={4}
                    px={4}
                >
                    {
                        posts.slice(0,6).map((post, index) => {
                            return (
                                <Box
                                    key={index}
                                    w={{ base: "100%", md: "30%" }}
                                    p={4}
                                    bg="gray.100"
                                    mb={4}
                                    borderRadius={5}
                                    onClick={() => navigate(`/post/${post.slug}`)}
                                >
                                    <Text isTruncated>{post.title}</Text>
                                    <Flex>Tags: {
                                        post.tags.length ? post.tags.map(
                                            tag => <Flex ml={2} key={tag} px={2} bg={"rgb(82, 82, 209)"} color={"white"} borderRadius={5}>{tag}</Flex>
                                        ) : <Text ml={2}>No tags</Text>
                                    }</Flex>
                                </Box>
                            )
                        })
                    }
                </Flex>
                <Flex direction={"column"} justifyContent={"center"}>
                    <Text fontSize={"2xl"} textAlign={"center"} fontWeight={"bold"}>Thông điệp của Hiệu trưởng</Text>
                    <Text textAlign={"center"}>ABCXYZ RONALDO CÁC BẠN HÃY</Text>
                </Flex>
                <Button my={3} onClick={() => navigate("/posts")}>Xem thêm Về Thông Tin Tuyển Sinh</Button>
            </Flex>
           
        </Flex>
    )
}