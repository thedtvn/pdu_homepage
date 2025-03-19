import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import MarkdownRender from "../components/MarkdownRender";

export interface Post {
    postId: string;
    title: string;
    content?: string;
    tags: string[];
    date: number;
    slug: string;
    files: { fileId: string; isDefault: boolean; filePath: string }[];
}

export default function Posts() {


    const [post, setPost] = useState<Post | null>(null);
    const [isNotFound, setIsNotFound] = useState(false);
    const { slug } = useParams();

    useEffect(() => {

        fetch("/api/post/getPost/" + slug)
            .then(res => {
                if (!res.ok) return setIsNotFound(true);
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
                    <Box w="100%" mb={7} mt={3} bg={"black"} h={1} borderRadius={12}></Box>
                    <MarkdownRender w={"100%"}>{post.content}</MarkdownRender>
                    <Box w="100%" mb={3} mt={7} bg={"black"} h={1} borderRadius={12}></Box>
                    <Flex alignItems={"center"}>
                        <Text fontSize={"large"}>Tags:</Text>
                        <Flex ml={2}>
                                {post.tags.map(tag => (
                                <Text key={tag} p={1} ml={1} bg={"rgb(82, 82, 209)"} color={"white"} borderRadius={5}>{tag}</Text>
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
                {isNotFound ? (
                    <Flex align="center" justify="center" w="100%" h="100vh">
                        <Text fontSize={"5xl"}>Post not found</Text>
                    </Flex>
                ) : !post ? (
                    <Flex align="center" justify="center" w="100%" h="100vh">
                        <Text fontSize={"5xl"}>Loading Post</Text>
                    </Flex>
                ) : (
                    postBody()
                )}
            </Flex>
        </>
    );
}