import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";





export default function Home() {



    return (
        <Flex w="100%" h="80vh" direction="column" justifyContent="center" alignItems="center" gap="10px">
            <Link to="/form"><Button w="250px" borderRadius="50px" backgroundColor="cyan.400" _hover={{backgroundColor:"cyan.300"}}>Form</Button></Link>
            <Link to="/analytics"><Button w="250px" borderRadius="50px" backgroundColor="cyan.400" _hover={{backgroundColor:"cyan.300"}}>Analytics</Button></Link>
            
        </Flex>
    )
}