import React, { useState } from "react";
import {
  Box,
  Tooltip,
  Button,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuItem,
  MenuList,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useToast,
  Spinner,
} from "@chakra-ui/react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BellIcon, Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "./../../context/ChatProvider";
import ProfileModal from "../miscellaneous/ProfileModal";
import { useNavigate } from "react-router-dom";
import { useDisclosure, Input } from '@chakra-ui/react';
import ChatLoading from "../ChatLoading";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";


const SideDrawer = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat,chats,setChats } = ChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/")
  }

  const accessChat = async(userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization:`Bearer ${user.token}`,
        },
      };
      const {data} = await axios.post("/api/chats",{userId}, config);
      if(!chats.find((c)=> c.id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoading(false);
      onClose()
    } catch (error) {
      toast({
        title:"Error fetching the chat!",
        description:error.message,
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom-left"

      })
      
    }

  }

  const toast = useToast();
  const handleSearch =async()=> {
    if(!search) {
      toast({
        title:"Please Enter Something in Search",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top-left"

      })
      return
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization:`Bearer ${user.token}`,
        }
      }
      const {data} = await axios.get(`/api/user?search=${search}` ,config)
      setLoading(false);
      setSearchResult(data);
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
  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="orange"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
          <div style={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="gost" onClick={onOpen}>
            <Search2Icon />
            <Text d={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text justifyContent="center" display="flex" fontSize="2xl" fontFamily="Work sans">
          Talk-A-Tive
        </Text>
        </div>
        <div style={{ display: 'flex',justifyContent: 'flex-end' }}>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton p={1} as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                // src={user.pic}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>

              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
    
        <DrawerBody>
          <Box d="flex" pb={2}>
            <Input placeholder="Search by name or email"
            mr={2}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <Button 
            onClick={handleSearch}
            >
              Go
            </Button>
          </Box>
          {loading ? (
            <ChatLoading/>
          ) : (
          searchResult?.map(user => (
            <UserListItem
            key={user._id}
            user={user}
            handleFunction={()=>accessChat(user._id)}
            />
          )) 
          )}
          {loadingChat && <Spinner ml="auto" d="flex" />}
        </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
