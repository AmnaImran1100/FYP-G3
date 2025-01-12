import { Button, Container, Heading, Input, VStack, Box, extendTheme, ChakraProvider, FormLabel} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';

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

const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      navigate('/login');
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
            children="Reset Password"
            my="24"
            textTransform={'uppercase'}
            textAlign={['center', 'left']}
            color="teal.400" // Updated Heading color
          />

          <VStack spacing={'6'}>
            <Input
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="New Password"
              type={'password'}
              focusBorderColor="teal.400"
              bg="gray.800"
              color="gray.200"
            />

            <Button
              isLoading={loading}
              type="submit"
              w={'full'}
              bg="teal.400"
              _hover={{ bg: 'teal.300' }}
              color="black"
            >
              Reset Password
            </Button>
          </VStack>
        </form>
      </Container>
    </ChakraProvider>
  );
};

export default ResetPassword;
