import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import axios from 'axios';
import {Box, useToast} from "@chakra-ui/react";
const MyChat = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user,setUser,selectedChat,setSelectedChat,chats,setChats} = ChatState();
  const toast = useToast();
  const fetchChats = async ()=> {
    try {
      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization:`Bearer ${user.token}`,
        },
      };
      const {data} =await axios.get("/api/chats",config);
      setChats(data);
      
    } catch (error) {
      toast({
        title:"Error Occured!",
        description:"Failed to load the Search Results",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left"

      })
      
    }
  }
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();


  },[])
  return (
   <Box>

   </Box>
  )
}

export default MyChat
