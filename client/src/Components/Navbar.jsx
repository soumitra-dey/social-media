import { Box, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <Flex
            w="100%"
            h="70px"
            backgroundColor="cyan"
            alignItems="center"
            justifyContent="flex-end"
            gap={{base:"10px", md:"25px"}}
            fontSize="20px"
            pr="20px"
        >
            <Link to="/">Home</Link>
            <Link to="/form">Forms</Link>
            <Link to="/analytics">Analytics</Link>
        </Flex>
    );
}
