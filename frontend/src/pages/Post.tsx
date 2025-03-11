import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import MarkdownRender from "../components/MarkdownRender";

interface Post {
    postId: string;
    title: string;
    content?: string;
    tags: string[];
    date: number;
}

export default function Posts() {


    const [post, setPost] = useState<Post | null>(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        fetch("/api/post/getPost/" + slug)
            .then(res => {
                if (!res.ok) return navigate("/");
                return res.json();
            })
            .then(data => setPost(data));
    }, []);

    function postBody() {
        if (!post) return null;

        const time = new Date(post.date);

        return (
            <>
                <Flex flexDir={"column"} p={{ md: 5, base: 3 }} w="100%">
                    <Text>{time.getHours()}:{time.getMinutes()} {time.getDate()}-{time.getMonth() + 1}-{time.getFullYear()}</Text>
                    <Text fontSize={"xx-large"} m={0} p={0}>{post.title}</Text>
                    <Box w="100%" mb={7} mt={3} bg={useColorModeValue("black", "white")} h={1} borderRadius={12}></Box>
                    <MarkdownRender>{post.content}</MarkdownRender>
                    <Box w="100%" mb={3} mt={7} bg={useColorModeValue("black", "white")} h={1} borderRadius={12}></Box>
                    <Flex alignItems={"center"}>
                        <Text fontSize={"large"}>Tags:</Text>
                        <Flex ml={2}>
                                {post.tags.map(tag => (
                                <Text key={tag} p={1} bg={"rgb(82, 82, 209)"} color={"white"} borderRadius={5}>{tag}</Text>
                            ))}
                        </Flex>
                    </Flex>
                </Flex>
            </>
        );
    }

    return (
        <>
            <Flex>
                {!post ? <>
                    <Flex align="center" justify="center" w="100%" h="100vh">
                        <Text>Loading Post</Text>
                    </Flex>
                </> : postBody()}
            </Flex>
        </>
    );
}