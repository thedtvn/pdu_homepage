import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Tag {
    tag: string;
    slug: string;
    deleteable: boolean;
}

interface Post {
    postId: string;
    title: string;
    content: string;
    tags: Tag[];
}

export default function Posts() {
    

    const [post, setPost] = useState<Post | null>(null);
    const { slug } = useParams();

    useEffect(() => {

        fetch("/api/post/getPost/" + slug)
            .then(res => res.json())
            .then(data => setPost(data));
    }, []);

    function postBody() {
        if (!post) return null;
        return (
            <>  
                <Box>
                    <Text>{post.title}</Text>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.8.1/github-markdown-light.min.css" />
                    <Box className="markdown-body">
                        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{post.content}</Markdown>
                    </Box>
                    {post.tags.map(tag => (
                        <Text key={tag.tag}>{tag.tag}</Text>
                    ))}
                </Box>
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