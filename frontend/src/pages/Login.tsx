import { Box, Button, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { useRef, useState } from "react"

export default function Login() {
    const bgColor = "linear-gradient(90deg, rgb(103, 103, 255) 33%, rgba(0,212,255,1) 100%)";

    const passwordElm = useRef<HTMLInputElement>(null);
    const usernameElm = useRef<HTMLInputElement>(null);
    const errBox = useRef<HTMLDivElement>(null);

    const [userType, setUserTypeProxy] = useState<"sv" | "gv">("sv");

    const [err, setErrProxy] = useState<string | null>(null);

    function setErr(err: string | null) {
        if (err) {
            errBox.current!.style.display = "flex";
            errBox.current!.animate([
                { transform: "translateX(0)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(5px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(5px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(5px)" },
                { transform: "translateX(0)" },
            ], {
                duration: 400,
            });
        } else {
            errBox.current!.style.display = "none";
        }
        setErrProxy(err);
    }

    function setUserType(type: "sv" | "gv") {
        setUserTypeProxy(type);
        setErr(null);
    }

    function login() {
        setErr(null);
        if (userType === "sv") {
            if (!/\d+/.test(usernameElm.current?.value || "")) return setErr("Mã sinh viên không hợp lệ");
        } else {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(usernameElm.current?.value || "")) return setErr("Email không hợp lệ");
        }
        if (!passwordElm.current?.value) return setErr("Mật khẩu không được để trống");

        fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameElm.current?.value,
                password: passwordElm.current?.value,
                role: userType
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) return setErr(data.error);
                localStorage.setItem("token", data.token);
                if (data.role === "sv") {
                    window.location.href = "/student";
                } else if (data.role === "gv") {
                    window.location.href = "/teacher";
                } else {
                    window.location.href = "/admin";
                }
            })
            .catch(err => setErr(err.message));

    }

    return (
        <>
            <Flex bg={bgColor} w={"100vw"} h={"100vh"} color={"white"}>
                <Flex w={"100%"} bgImage={"url(/assets/trong_dong_dong_son.svg)"} bgPosition={"center"} bgRepeat={"no-repeat"} bgSize={"cover"} justifyContent={"center"} alignItems={"center"}>
                    <Flex
                        flexDir="column"
                        background="rgba(60, 60, 60, 0.61)"
                        backdropFilter="blur(5px)"
                        p={4}
                        borderRadius={10}
                    >
                        <Text color="white">Cổng Đăng Nhập Đại Học Phương Đông</Text>
                        <SimpleGrid columns={2} spacing={2} mt={4} background="rgba(255, 255, 255, 0.1)" borderRadius={3} p={1}>
                            <Flex justifyContent={"center"} onClick={() => setUserType("sv")} cursor="pointer" bg={userType === "sv" ? "blue.500" : "transparent"} p={1} borderRadius={3}>
                                Sinh Viên
                            </Flex>
                            <Flex justifyContent={"center"} onClick={() => setUserType("gv")} cursor="pointer" bg={userType === "gv" ? "blue.500" : "transparent"} p={1} borderRadius={3}>
                                Giảng Viên
                            </Flex>
                        </SimpleGrid>
                        <Box mt={1}>
                            <Text>
                                {userType === "sv" ? "Mã Sinh Viên" : "Email"}
                            </Text>
                            <Input ref={usernameElm} mt={2} />
                            <Text>Mật Khẩu</Text>
                            <Input ref={passwordElm} mt={2} />
                            
                        </Box>
                        <Flex ref={errBox} display={"none"} mt={2} borderRadius={5} justifyContent={"center"} p={1} bg={"red.600"}>
                            <Text fontSize={"small"} color="white">{err}</Text>
                        </Flex>
                        <Button mt={3} w={"100%"} onClick={login} colorScheme="blue">Đăng Nhập</Button>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}