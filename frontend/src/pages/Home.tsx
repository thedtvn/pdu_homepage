import { Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import "./../styles/index.css";

export default function Home() {

    const navigate = useNavigate();

    const images = [
        { url: "/assets/test.jpg", postUrl: "/post/1" },
        { url: "/assets/test.jpg", postUrl: "/post/2" },
    ];
    // TODO: make Image slider
    return (
        <Flex>
            
        </Flex>
    )
}