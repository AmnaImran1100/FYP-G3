import { Button, Container, Heading, VStack, ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

// Custom Theme for Global Styles
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'black', // Ensures the entire body background is black
        color: 'teal.400', // Default text color
      },
    },
  },
});

const NotFound = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container h="100vh">
        <VStack justifyContent={'center'} h="full" spacing={'4'}>
          <RiErrorWarningFill size={'5rem'} color="teal.400" />
          <Heading>Page Not Found</Heading>
          <Link to="/">
            <Button variant={'ghost'} color="teal.400" _hover={{ bg: 'teal.700', color: 'white' }}>
              Go to home
            </Button>
          </Link>
        </VStack>
      </Container>
    </ChakraProvider>
  );
};

export default NotFound;
