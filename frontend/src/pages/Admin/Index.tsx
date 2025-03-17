import { Flex, Grid, Text } from "@chakra-ui/react";

export default function AdminIndex() {
    return (
        <>  
            
            <Grid mt={3} templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
                <Flex justifyContent={"center"}>
                    <Text >
                        Quản lý bài viết
                    </Text>
                </Flex>
                <Flex>
                    <Text>
                        Học sinh và Giáo viên
                    </Text>
                </Flex>
                <Flex>
                    <Text>
                        Quản lý Files
                    </Text>
                </Flex>
            </Grid>
        </>
    );
}