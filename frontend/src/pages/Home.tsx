import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import "./../styles/index.css";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {

    const navigate = useNavigate();

    const images = [
        { url: "/assets/cu_nhan.jpg", postUrl: "/post/1" },
        { url: "/assets/teacherrrr.jpg", postUrl: "/post/2" },
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
                        Array.from({ length: 10 }).map(() => {
                            return (
                                <Box
                                    h="30hv"
                                    w=""
                                    bg="gray.50"
                                    p={4}
                                    dir="column"
                                >
                                    
                                </Box>
                            )
                        })
                    }

                </Flex>
                <Button mt={3} onClick={() => navigate("/news")}>Xem thêm Về Thông Tin Tuyển Sinh</Button>
            </Flex>
        </Flex>
    )
}