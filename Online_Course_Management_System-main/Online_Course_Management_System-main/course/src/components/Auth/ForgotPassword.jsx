import {
  Button,
  Container,
  Heading,
  Input,
  VStack,
  Box,
  FormLabel,
  extendTheme,
  ChakraProvider,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassword } from '../../redux/actions/profile';

// Custom Theme for Global Styles
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black', // Set the whole page background to black
        color: 'gray.200', // Default text color to light grey
      },
    },
  },
});

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(forgetPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <ChakraProvider theme={theme}>
      <Container py={'16'} h="100vh" maxW="container.sm">
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Heading color="teal.400" size="lg" mb={1}>
            Wissen
          </Heading>
          <FormLabel textAlign="center" color="gray.400" fontSize="md" mt={0} lineHeight="1.2">
            Revolutionizing CAIES Preparation with AI
          </FormLabel>
        </Box>

        <form onSubmit={submitHandler}>
          <Heading
            children="Forget Password"
            my="24"
            textTransform={'uppercase'}
            textAlign={['center', 'left']}
            color="teal.400" // Updated Heading color
          />

          <VStack spacing={'6'}>
            <Input
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="teal.400" // Updated focus border color
              bg="gray.800" // Updated Input background
              color="gray.200" // Updated Input text color
            />

            <Button
              isLoading={loading}
              type="submit"
              w={'full'}
              bg="teal.400" // Updated Button background
              _hover={{ bg: 'teal.300' }} // Updated Button hover effect
              color="black" // Updated Button text color
            >
              Send Reset Link
            </Button>
          </VStack>
        </form>
      </Container>
    </ChakraProvider>
  );
};

export default ForgetPassword;
