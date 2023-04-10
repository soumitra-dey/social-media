import { Box, Button, Flex, FormControl, FormLabel, Grid, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";





export default function PostAnalycics(){
    const [data,setdata]=useState([])
    const [loading,setloading]=useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editdata,seteditdata]=useState({})
    const toast=useToast()

    useEffect(()=>{
        allpost()
    },[])

    const allpost = () => {
        setloading(true)
        axios.get("https://aluminum-auspicious-appeal.glitch.me/analytics/posts")
        .then((e)=>{
            setdata(e.data)
            setloading(false)
        })
        .catch(()=>setloading(false))
    }

    const toppost = () => {
        setloading(true)
        axios.get("https://aluminum-auspicious-appeal.glitch.me/analytics/posts/top-liked")
        .then((e)=>{
            setdata(e.data)
            setloading(false)
        })
        .catch(()=>setloading(false))
    }

    const editpost = (el) => {
        seteditdata(el)
        onOpen()
    }

    const handlechange = (e) => {
        seteditdata({
            ...editdata,
            [e.name]:e.value
        })
    }

    const updatepost = () => {
        axios.put(`https://aluminum-auspicious-appeal.glitch.me/posts/${editdata._id}`,editdata)
        .then((e)=>{
            toast({
                title: 'User updated.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            onClose()
            allpost()
        })
        .catch(()=>{
            toast({
                title: 'Something went wrong.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        })
    }

    const deleteposts = (el) => {
        axios.delete(`https://aluminum-auspicious-appeal.glitch.me/posts/${el._id}`)
        .then((e)=>{
            toast({
                title: 'User deleted.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            allpost()
        })
        .catch((e)=>{
            toast({
                title: 'Something went wrong.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        })
    }

    const updatelike = (el) => {
        axios.post(`https://aluminum-auspicious-appeal.glitch.me/posts/${el._id}/like`)
        .then((e)=>{
            toast({
                title: 'Liked',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            allpost()
        })
        .catch((e)=>{
            toast({
                title: 'Something went wrong.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        })
    }

    const updateunlike = (el) => {
        axios.post(`https://aluminum-auspicious-appeal.glitch.me/posts/${el._id}/unlike`)
        .then((e)=>{
            toast({
                title: 'Liked',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            allpost()
        })
        .catch((e)=>{
            toast({
                title: 'Something went wrong.',
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
            <Flex justifyContent="space-between" borderBottom="1px solid" p="10px 0px">
                <Button onClick={()=>allpost()}>All posts</Button>
                <Button onClick={()=>toppost()}>Top 5 posts</Button>
            </Flex>
            <Grid gridTemplateColumns={{base:"repeat(2,1fr)",md:"repeat(3,1fr)"}} gap="20px">
                {
                    data.map((el)=>(
                        <Flex key={el._id} direction="column" alignItems="flex-start" p="10px" boxShadow="base">
                            <Text borderBottom="1px solid" w="100%">{el && el.user_id.name}</Text>
                            <Text>{el.content}</Text>
                            <Flex justifyContent="space-between" w="100%" mt="10px">
                                <Image src="https://img.icons8.com/ios-glyphs/30/null/facebook-like--v1.png" onClick={()=>updatelike(el)} w="20px"/>
                                <Text>{el.likes}</Text>
                                <Image src="https://img.icons8.com/material-sharp/24/null/thumbs-down.png" onClick={()=>updateunlike(el)} w="20px"/>
                            </Flex>
                            <Flex w="100%" justifyContent="space-between" mt="10px">
                                <Image src="https://img.icons8.com/material-two-tone/24/null/file-preview.png" onClick={()=>editpost(el)} w="20px"/>
                                <Image src="https://img.icons8.com/windows/64/null/pen-squared.png" onClick={()=>editpost(el)} w="20px"/>
                                <Image src="https://img.icons8.com/material-rounded/48/null/delete-property.png" onClick={()=>deleteposts(el)} w="20px"/>
                            </Flex>
                        </Flex>
                    ))
                }
            </Grid>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                <FormControl>
                    <FormLabel>User name</FormLabel>
                    <Input placeholder='User name' value={editdata && editdata.user_id && editdata.user_id.name} disabled/>
                    </FormControl>
                    <FormControl>
                    <FormLabel>Contents</FormLabel>
                    <Input placeholder='Contents' value={editdata && editdata.content} name="content" onChange={(e)=>handlechange(e.target)}/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={()=>updatepost()}>
                    Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}