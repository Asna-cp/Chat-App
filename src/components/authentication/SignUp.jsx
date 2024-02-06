import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setCOnfirmPassword] = useState();
  // const[pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  //Password show button
  const handleCLick = () => setShow(!show);
  //Image Upload
  // const postDetails = (pic)=>{
  //   setLoading(true);
  //   if(pic === undefined){

  //       toast({
  //         title: 'Select Image.',
  //         status: 'Warning',
  //         duration: 9000,
  //         isClosable: true,
  //         position:"bottom"
  //       })
  //     return;
  //   }
  // }

  //signup
  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Fill all feilds",
        status: "Warning",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password do not match",
        status: "Warning",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        '/api/user',
        { name, email, password },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "Warning",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="First Name" isRequired>
        <FormLabel> * Name </FormLabel>
        <Input
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="Enter Email" isRequired>
        <FormLabel> * Email </FormLabel>
        <Input
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="Enter Password" isRequired>
        <FormLabel> * Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleCLick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="Enter Confirm Password" isRequired>
        <FormLabel> * Confirm Password </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Confirm Password"
            onChange={(e) => setCOnfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleCLick}>
              {show ? "Hide" : "show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* <FormControl id='pic' isRequired>
        <FormLabel> * Upload Your Photo </FormLabel>
          <Input
          type='file'
          p={1.5}
          accept='image'
          onChange={(e) => postDetails(e.target.files[0])}
          /> 
      </FormControl> */}
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        loading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
