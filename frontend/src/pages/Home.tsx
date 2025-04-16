import { Box, Button, Flex, Image, Text, Grid, GridItem } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import dayjs from 'dayjs';
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
                        </Flex>
                        <Image src="/assets/truso1.jpeg" borderRadius={10}/>
                    </Flex>
                </Box>
            </Flex>
            <Flex mt={5} w={"100%"} direction="column" justifyContent="center" alignItems="center" bg={"#ffffff"}>
                <Text fontWeight={"bold"} fontSize={"x-large"} textAlign={"center"} bg={"#900808"} w={"full"} color={"#ffffff"} py={8}>
                    Bảng tin tức
                </Text>
                <Flex
                    maxW="100%"
                    direction={{ base: "column", md: "row" }}
                    overflow="auto"
                    gap={4}
                    mt={4}
                    px={4}
                >
                    <Flex direction={"column"} maxW={{
                        base: "100%",
                        md: "60%"
                    }} border={"1px solid #1c1c1c"} px={5} borderRadius={8}>
                        <Text fontSize={"2xl"} fontWeight={"bold"} p={5} pb={0}>Đề xuất</Text>
                        <Grid templateColumns={['1fr', null, '1fr 1fr']} gap={4}> 
                            {posts.slice(3, 7).map((item, index) => (
                                <GridItem key={index}>
                                    <Box bg="#ffffff" p={4} borderRadius={8} h="full" border={"1px solid #7d7d7d"} shadow={"lg"}  onClick={() => {
                                        navigate(`/post/${item.slug}`)
                                    }} cursor={"pointer"}>
                                        <Flex direction={"column"} justifyContent={"space-between"} h="full">
                                            <Text fontSize={"lg"} fontWeight={"bold"}>{item.title}</Text>
                                            <Image  src={`/cdn/${item.files.find((file) => file.isDefault)?.filePath}`} aspectRatio={16/9} objectFit={"cover"} borderRadius={8}/>
                                            <Text fontSize={"base"}>{dayjs(item.date).format('DD/MM/YYYY HH:mm:ss')}</Text>
                                        </Flex>
                                    </Box>
                                </GridItem>
                                
                            ))}
                        </Grid>
                    </Flex>
                    
                    <Flex direction={"column"} maxW={{
                        base: "100%",
                        md: "60%"
                    }} border={"1px solid #1c1c1c"} borderRadius={8}>
                        <Text fontSize={"2xl"} fontWeight={"bold"} p={5} pb={0}>Bài viết khác</Text>
                        <Flex direction={"column"} gap={3} maxH={885} overflowY={"auto"} px={5} pb={5}> 
                            {posts.slice(0, 8).map((item, index) => (
                                <Box bg="#ffffff" p={4} borderRadius={8} h="full" key={index}  border={"1px solid #7d7d7d"} shadow={"lg"} onClick={() => {
                                    navigate(`/post/${item.slug}`)
                                }} cursor={"pointer"}>  
                                    <Flex direction={"column"} justifyContent={"space-between"} h="full">
                                        <Text fontSize={"lg"} fontWeight={"bold"}>{item.title}</Text>
                                        <Text fontSize={"base"}>{dayjs(item.date).format('DD/MM/YYYY HH:mm:ss')}</Text>
                                    </Flex>
                                </Box>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>
                <Button my={3} onClick={() => navigate("/posts")} bg={"#000080"} color={"#ffffff"} _hover={{
                    bg: "#030359"
                }}>Xem thêm Về Tin Tức</Button>
            </Flex>
           
        </Flex>
    )
}