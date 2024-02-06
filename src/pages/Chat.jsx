import React, { 
  // useEffect, useState 
} from 'react';
import { ChatState } from '../context/ChatProvider';
// import axios from 'axios';
import { Box } from '@chakra-ui/react';
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChat from '../components/MyChat';
import ChatBox from '../components/ChatBox';

const Chat = () => {
  const {user} = ChatState();
  return (
    <Box
    bg="gray"
    >
    <div
style={{ width:"100%"}}>
   {user && <SideDrawer/>}
  <Box
  bg="gray"
  d="flex"
  justifyContent="space-between"
  w="100%"
  h="91.5vh"
  p="10px"
  >
    {user && <MyChat/>}
    {user && <ChatBox/>}
  </Box>
  </div>
    </Box>

  )
   
}

export default Chat;
