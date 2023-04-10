import { Box, Button, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";





export default function UserAnalycics(){
    const [data,setdata]=useState([])
    const [loading,setloading]=useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editdata,seteditdata]=useState({})
    const toast=useToast()

    useEffect(()=>{
        getalluser()
    },[])

    const edituser = (el) => {
        seteditdata(el)
        onOpen()
    }

    const getalluser = () => {
        setloading(true)
        axios.get("https://aluminum-auspicious-appeal.glitch.me/analytics/users")
        .then((e)=>{
            setdata(e.data)
            setloading(false)
        })
        .catch(()=>setloading(false))
    }

    const topuser = () => {
        setloading(true)
        axios.get("https://aluminum-auspicious-appeal.glitch.me/analytics/users/top-active")
        .then((e)=>{
            let dt=[]
            e.data.map((el)=>dt.push(el.users_details[0]))
            console.log(dt)
            setdata(dt)
            setloading(false)
        })
        .catch(()=>setloading(false))
    }

    const changedata = (e) =>{
        seteditdata({
            ...editdata,
            [e.name]:e.value
        })
    }

    const postdata = () => {
        axios.put(`https://aluminum-auspicious-appeal.glitch.me/users/${editdata._id}`,editdata)
        .then((e)=>{
            toast({
                title: 'User updated.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            onClose()
            getalluser()
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

    const deletedata = (el) => {
        axios.delete(`https://aluminum-auspicious-appeal.glitch.me/users/${el._id}`)
        .then((e)=>{
            toast({
                title: 'User deleted.',
                status: 'success',
                duration: 4000,
                isClosable: true,
            })
            getalluser()
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
                <Button onClick={()=>getalluser()}>All user</Button>
                <Button onClick={()=>topuser()}>Top 5 user</Button>
            </Flex>
            <TableContainer>
                <Table variant="striped" colorScheme="teal">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>View</Th>
                            <Th>Edit</Th>
                            <Th>Delete</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map((el)=>(
                                <Tr key={el._id}>
                                    <Td>{el.name}</Td>
                                    <Td onClick={()=>edituser(el)}><Image src="https://img.icons8.com/material-two-tone/24/null/file-preview.png" w="25px"/></Td>
                                    <Td onClick={()=>edituser(el)}><Image src="https://img.icons8.com/windows/64/null/pen-squared.png" w="25px"/></Td>
                                    <Td onClick={()=>deletedata(el)}><Image src="https://img.icons8.com/material-rounded/48/null/delete-property.png" w="25px"/></Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>View / Edit Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder='Name' value={editdata.name} name="name" onChange={(e)=>changedata(e.target)}/>
                    </FormControl>
                    <FormControl mt={4}>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder='Email'  value={editdata.email} disabled/>
                    </FormControl>
                    <FormControl mt={4}>
                    <FormLabel>Bio</FormLabel>
                    <Input placeholder='Bio' value={editdata.bio} name="bio" onChange={(e)=>changedata(e.target)}/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={()=>postdata()}>
                    Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}