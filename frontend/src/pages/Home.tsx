import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
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
        <Flex direction="column">
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
                <Button mt={3} onClick={() => navigate("/pages")}>Xem thêm Về Thông Tin Tuyển Sinh</Button>
            </Flex>
        </Flex>
    )
}