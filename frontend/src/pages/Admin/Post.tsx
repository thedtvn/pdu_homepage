import { useEffect, useState } from "react";
import { Post } from "./../Post";
import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router";

export default function PostAdd() {

    const [post, setPost] = useState<Post[]>([]);
    const pram = new URLSearchParams(location.search);
    const [page, setPage] = useState<number>(Number(pram.get("page")) || 1);
    const [maxPage, setMaxPage] = useState<number>(1);

    useEffect(() => {
        if (page < 1) return setPage(1);
        const url = new URL("/api/post/getPosts", location.origin);
        url.searchParams.append("page", page.toString());
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPost(data.posts);
                setMaxPage(data.maxPage);
            });
    }, [page]);

    return (
        <Flex direction="column">
            {post.map(post => (
                <Link to={`/post/${post.slug}`} key={post.postId}>
                    <Flex key={post.postId} p={3} m={3} bg="gray.100" borderRadius={5}>
                        <Flex direction="column">
                            <Flex>{post.title}</Flex>
                            <Flex>Tags: {
                            post.tags.length ? post.tags.map(
                                tag => <Flex ml={2} key={tag} px={2} bg={"rgb(82, 82, 209)"} color={"white"} borderRadius={5}>{tag}</Flex>
                            ) : <Text ml={2}>No tags</Text>
                            }</Flex>
                        </Flex>

                    </Flex>
                </Link>
            ))}
            <Flex justify="center" mt={4} mb={2} w="100%" align="center" gap={4}>
                <Flex 
                    onClick={() => page > 1 && setPage(page - 1)}
                    cursor={page > 1 ? "pointer" : "not-allowed"}
                    opacity={page > 1 ? 1 : 0.5}
                    bg="gray.200"
                    px={4}
                    py={2}
                    borderRadius="md"
                    _hover={page > 1 ? { bg: "gray.300" } : {}}
                >
                    {page > 1 ? "Prev" : ""}
                </Flex>
                <Flex align="center" fontWeight="medium">
                    {page}/{maxPage}
                </Flex>
                <Flex 
                    onClick={() => page < maxPage && setPage(page + 1)}
                    cursor={page < maxPage ? "pointer" : "not-allowed"}
                    opacity={page < maxPage ? 1 : 0.5}
                    bg="gray.200"
                    px={4}
                    py={2}
                    borderRadius="md"
                    _hover={page < maxPage ? { bg: "gray.300" } : {}}
                >
                    {page < maxPage ? "Next" : ""}
                </Flex>
            </Flex>
        </Flex>
    );
}