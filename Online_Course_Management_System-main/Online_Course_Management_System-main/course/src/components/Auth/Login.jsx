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
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

import { Link } from 'react-router-dom';
import { login, handleGoogleSignIn } from '../../redux/actions/user';
import { FcGoogle } from 'react-icons/fc'; // For Google Icon



// Custom Theme for Global Styles
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black', // Set the whole page background to dark grey
        color: 'gray.200', // Set the default text color to light grey
      },
    },
  },
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const dispatch = useDispatch();

  const signIn = (response) => {
    dispatch(handleGoogleSignIn(response));
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <ChakraProvider theme={theme}>
      <Container h="95vh" maxW="container.sm">
        <VStack h="full" justifyContent="center" spacing={8}>
          {/* Adjusted Heading and Reduced Font Size of Tagline */}
          <Box textAlign="center" mb={6}>
            <Heading color="teal.400" size="lg" mb={1}>
              Wissen
            </Heading>
            <FormLabel
              color="gray.400"
              fontSize="md" // Reduced font size
              mt={0}
              lineHeight="1.2"
            >
              Revolutionizing CAIES Preparation with AI
            </FormLabel>
          </Box>

          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <Box my={4}>
              <FormLabel color="gray.400" htmlFor="email">
                Email Address
              </FormLabel>
              <Input
                required
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="abc@gmail.com"
                type="email"
                focusBorderColor="teal.400"
                bg="gray.800"
                color="gray.200"
              />
            </Box>

            <Box my={4}>
              <FormLabel color="gray.400" htmlFor="password">
                Password
              </FormLabel>
              <Input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                type="password"
                focusBorderColor="teal.400"
                bg="gray.800"
                color="gray.200"
              />
            </Box>

            <Box>
              <Link to="/forgetpassword">
                <Button fontSize="sm" variant="link" color="teal.400">
                  Forget Password?
                </Button>
              </Link>
            </Box>

            <Button
              my={4}
              bg="teal.400"
              _hover={{ bg: 'teal.300' }}
              color="black"
              type="submit"
            >
              Login
            </Button>

            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
              <GoogleLogin
                
                
                onSuccess={(response) => signIn(response)}
                
                onError={() => console.error('Google Sign-In Error')}
                render={(renderProps) => (
                  <Button
                    leftIcon={<FcGoogle />}
                    variant="outline"
                    my={4}
                    onClick={renderProps.onClick}
                    isDisabled={renderProps.disabled}
                  >
                    Sign in with Google

                  </Button>
                )}
              />
            </GoogleOAuthProvider>


            <Box my={4} color="gray.400">
              New User?{' '}
              <Link to="/register">
                <Button color="teal.400" variant="link">
                  Sign Up
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

export default Login;
