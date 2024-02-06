import {
  Container,
  Box,
  Text,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";
import React 
,
{useEffect}
from 
"react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();

  useEffect(()=> {
      const user = JSON.parse(localStorage.getItem("userInfo"));
     
      if(user){
          navigate("/chat")
      }
  
     },[navigate])
  return (
    <div>
      <Box bg="grey">
        <Container maxW="xl" centerContent>
          <Box
            d="flex"
            justifyContent="center"
            p={3}
            bg={"white"}
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
          >
            <Text fontSize="4xl" fontFamily="work sans" color="black">
              Talk-A-Tive
            </Text>
          </Box>
          <Box
            bg="white"
            w="100%"
            p={4}
            borderRadius="lg"
            color="black"
            borderWidth="1px"
          >
            <Tabs variant="soft-rounded">
              <TabList mb="1em">
                <Tab width="50%">Login</Tab>
                <Tab width="50%">Sign Up</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <SignUp />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
