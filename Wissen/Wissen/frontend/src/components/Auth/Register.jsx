import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
  extendTheme,
  ChakraProvider,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/user';

// Custom Theme for Global Styles
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black', // Set the whole page background to black
        color: 'gray.200', // Set the default text color to light grey
      },
    },
  },
});

// Register.jsx
export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, role));
  };

  return (
    <ChakraProvider theme={theme}>
      <Container h="100%" minH="100vh" overflowY="auto" maxW="container.sm">
        <VStack h={'full'} justifyContent="center" spacing={8}>
          {/* Header Section */}
          <Box textAlign="center" mb={6} mt={12}>
            <Heading color="teal.400" size="lg" mb={1}>
              Wissen
            </Heading>
            <FormLabel color="gray.400" fontSize="md" mt={0} lineHeight="1.2">
              Revolutionizing CAIES Preparation with AI
            </FormLabel>
          </Box>

          {/* Registration Form */}
          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <Box my={'4'}>
              <FormLabel color="gray.400" htmlFor="name">
                Name
              </FormLabel>
              <Input
                required
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                type={'text'}
                focusBorderColor="teal.400"
                bg="gray.800"
                color="gray.200"
              />
            </Box>

            <Box my={'4'}>
              <FormLabel color="gray.400" htmlFor="email">
                Email Address
              </FormLabel>
              <Input
                required
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type={'email'}
                focusBorderColor="teal.400"
                bg="gray.800"
                color="gray.200"
              />
            </Box>

            <Box my={'4'}>
              <FormLabel color="gray.400" htmlFor="password">
                Password
              </FormLabel>
              <Input
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type={'password'}
                focusBorderColor="teal.400"
                bg="gray.800"
                color="gray.200"
              />
            </Box>

            <Box my={'4'}>
            <FormLabel htmlFor="role" children="Role" />
            <Input
              required
              id="role"
              value={role}
              onChange={e => setRole(e.target.value)}
              placeholder="admin or user"
              type={'text'}
              focusBorderColor="teal.400"
              bg="gray.800"
              color="gray.200"
            />
          </Box>

            <Button
              my="4"
              bg="teal.400"
              _hover={{ bg: 'teal.300' }}
              color="black"
              type="submit"
            >
              Sign Up
            </Button>

            {/* Login Link */}
            <Box my="4" color="gray.400">
              Already Signed Up?{' '}
              <Link to="/login">
                <Button color="teal.400" variant="link">
                  Login
                </Button>{' '}
                here
              </Link>
            </Box>
          </form>
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default Register;
