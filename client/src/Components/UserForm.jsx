import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";




export default function UserForm(){
    const [user,setuser]=useState({
        name:"",
        email:"",
        bio:""
    })
    const [flag,setflag]=useState(false)
    const [btnflag,setbtnflag]=useState(true)
    const toast=useToast()

    const handlechange = (e) => {
        if (e.name=="email") {
            if (e.value.includes("@") && e.value.includes(".com")) {
                setflag(false)
            } else {
                setflag(true)
            }
        }
        setuser({
            ...user,
            [e.name]:e.value
        })
    }

    useEffect(()=>{
        if (user.name.length!=0 && flag==false) {
            setbtnflag(false)
        } else {
            setbtnflag(true)
        }
    },[user,flag])


    const postuser = () => {
        axios.post("https://aluminum-auspicious-appeal.glitch.me/users",user)
        .then((e)=>{
            toast({
                title: 'Account created.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        })
        .catch((e)=>{
            toast({
                title: e.response.data.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        })
    }
    


    return (
        <Box>
            <Text fontSize="25px" as="i" textDecoration="underline">User Form</Text>
            <Flex direction="column" gap="10px" pt="20px">
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder='Name' name="name" onChange={(e)=>handlechange(e.target)} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Email' name="email" onChange={(e)=>handlechange(e.target)}/>
                    <FormHelperText textAlign="left" color="red" fontSize="12px" display={flag==true?"flex":"none"}>Write a valid email id.</FormHelperText>
                </FormControl>
                <FormControl>
                    <FormLabel>Bio</FormLabel>
                    <Input placeholder='Bio' name="bio" onChange={(e)=>handlechange(e.target)}/>
                </FormControl>
                <Button backgroundColor="green.400" _hover={{backgroundColor:"green.300"}} isDisabled={btnflag} onClick={()=>postuser()}>Submit</Button>
            </Flex>
        </Box>
    )
}