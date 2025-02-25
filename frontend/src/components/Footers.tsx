import { Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router'

export default function Footer() {
    return (
        <>
            <Flex flexDir={"column"} borderTop="1px" p={4} bg="linear-gradient(90deg, rgb(82, 82, 209) 33%, rgb(0, 180, 215) 100%)">
                <Text fontSize="large" fontWeight="bold" color="white">
                    TRƯỜNG ĐẠI HỌC PHƯƠNG ĐÔNG
                </Text>
                <Flex flexDir={{ base: "column", md: "row" }} mb={2} mt={2}>
                    <Flex flexDir={"column"}>
                        <Link to="https://maps.app.goo.gl/BaXRRdvBBGs2UMxLA">
                            <Text fontSize="medium" color="white">
                                &#128073; <b>Cơ sở 1</b>: 171 Trung Kính, Yên Hòa, Cầu Giấy, Hà Nội
                            </Text>
                        </Link>
                        <Link to="https://maps.app.goo.gl/sBB2veMG3JVWqHu38">
                            <Text fontSize="medium" color="white">
                                &#128073; <b>Cơ sở 2</b>: Số 4 Ngõ Chùa Hưng Ký, phố Minh Khai, Quận Hai Bà Trưng, Thành phố Hà Nội
                            </Text>
                        </Link>
                        <Text fontSize="medium" color="white">
                            <b>Tuyển sinh</b>: 024.3784.7110 / 09.1551.7110
                        </Text>
                    </Flex>
                    <Flex ml={{ md: 10, base: 0 }} flexDir={"column"} justifyContent={"center"}>
                        <Text fontSize="medium" color="white">
                            <b>Điện thoại</b>: 024-3784-8513 (14/15/16/17/18)
                        </Text>
                        <Text fontSize="medium" color="white">
                            <b>Fax</b>: 024-3784-8512
                        </Text>
                        <Text fontSize="medium" color="white">
                            <b>Email</b>: tuyensinh@phuongdong.edu.vn
                        </Text>
                    </Flex>
                </Flex>
                <Text fontSize="small" color="white">
                    Copyright &#169; {new Date().getFullYear()} - Bản quyền thuộc về Trường Đại học Phương Đông
                </Text>
            </Flex>
        </>
    )
}