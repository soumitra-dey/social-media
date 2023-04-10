import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Image, Input, Select, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";




export default function PostForm(){
    const [post,setpost]=useState({
        content:"",
        user_id:""
    })
    const [btnflag,setbtnflag]=useState(true)
    const [loading,setloading] = useState(false)
    const [btnloading,setbtnloading] = useState(false)
    const [user,setuser]=useState([])
    const toast=useToast()

    useEffect(()=>{
        setloading(true)

        axios.get("https://aluminum-auspicious-appeal.glitch.me/analytics/users")
        .then((e)=>{
            setuser(e.data)
            setpost({
                ...post,
                user_id:e.data[0]._id
            })
            setloading(false)
        })
        .catch(()=>setloading(false))
        
    },[])

    useEffect(()=>{
        if (post.content.length!=0) {
            setbtnflag(false)
        } else {
            setbtnflag(true)
        }
    },[post])
    
    

    const handlechange = (e) => {
        setpost({
            ...post,
            [e.name]:e.value
        })
    }

    const postform = () => {
        console.log(post)
        axios.post("https://aluminum-auspicious-appeal.glitch.me/posts",post)
        .then((e)=>{
            // console.log(e)
            toast({
                title: 'Post created.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
        })
        .catch((e)=>{
            // console.log(e)
            toast({
                title: e.response.data,
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        })
    }



    if (loading==true) {
        return (
            <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
                <Image src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" w="100px"/>
            </Flex>
        )
    }

    
    return (
        <Box>
            <Text fontSize="25px" as="i" textDecoration="underline">Post Form</Text>
            <Flex direction="column" gap="10px" pt="20px">
                <FormControl isRequired>
                    <FormLabel>User</FormLabel>
                    <Select name="user_id" onChange={(e)=>handlechange(e.target)}>
                        {
                            user.map((el)=>(
                                <option value={el._id} key={el._id}>{el.name}</option>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Content</FormLabel>
                    <Input placeholder='Content' name="content" onChange={(e)=>handlechange(e.target)} />
                </FormControl>
                <Button backgroundColor="green.400" _hover={{backgroundColor:"green.300"}} isLoading={btnloading} isDisabled={btnflag} onClick={()=>postform()}>Submit</Button>
            </Flex>
        </Box>
    )
}