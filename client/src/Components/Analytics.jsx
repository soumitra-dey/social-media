import { Box, Flex, Text } from "@chakra-ui/react";
import UserForm from "./UserForm";
import PostForm from "./PostForm";
import { useState } from "react";
import UserAnalycics from "./UserAnalytics";
import PostAnalycics from "./PostAnalytics";



export default function Analytics() {
    const [flag, setflag] = useState(true)


    return (
        <Box>
            <Flex w={{ base: "90%", md: "50%" }} overflow="auto" margin="auto" direction={{ base: "column", md: "row" }} h="450px" mt="30px" borderRadius="10px" boxShadow="rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 10px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset">
                <Flex direction={{ base: "row", md: "column" }} w={{ base: "100%", md: "30%" }} pt="10px" backgroundColor="rgb(237, 237, 237)" borderRadius="10px 0px 0px 10px">
                    <Text p="5px" w="100%" cursor="pointer" onClick={() => setflag(true)} backgroundColor={flag == true ? "white" : "rgb(237, 237, 237)"}>Users</Text>
                    <Text p="5px" w="100%" cursor="pointer" onClick={() => setflag(false)} backgroundColor={flag == false ? "white" : "rgb(237, 237, 237)"}>Posts</Text>
                </Flex>
                <Box w={{ base: "100%", md: "70%" }} p="20px">
                    {
                        flag==true?<UserAnalycics/>:<PostAnalycics/>
                    }
                </Box>
            </Flex>
        </Box>
    )
}