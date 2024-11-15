import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,  
  Stack,
  Text,
  Textarea,
  VStack,
  FormLabel,
  extendTheme,
  ChakraProvider
} from '@chakra-ui/react';

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

const Chatbot = () => {
  const [chats, setChats] = useState([]); // Store chat history
  const [input, setInput] = useState(''); // Store current user input
  const [loading, setLoading] = useState(false); // Handle loading state
  const chatContainerRef = useRef(null); // Reference to the chat container for scrolling

  // Handles sending user input to the AI agent
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setChats(prevChats => [...prevChats, userMessage]); // Add user message to chat history
    setInput(''); // Clear input field
    setLoading(true);

    try {
      // Simulate AI response
      const aiResponse = await fetchAIResponse(input); // Function to mock AI response
      setChats(prevChats => [
        ...prevChats,
        { role: 'ai', text: aiResponse },
      ]);
    } catch (error) {
      setChats(prevChats => [
        ...prevChats,
        { role: 'ai', text: 'Sorry, I encountered an error!' },
      ]);
    } finally {
      setLoading(false);
      scrollToBottom(); // Scroll to the bottom of the chat
    }
  };

  // Automatically scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Mock AI response function
  const fetchAIResponse = async (userInput) => {
    return new Promise(resolve =>
      setTimeout(() => resolve(`AI Response to "${userInput}"`), 1000)
    );
  };

  // Trigger Send button on Enter key press
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Container py={'16'} h="98vh" maxW="container.lg">
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Heading color="teal.400" size="lg" mb={1}>
            Wissen
          </Heading>
          <FormLabel textAlign="center" color="gray.400" fontSize="md" mt={0} lineHeight="1.2">
            Revolutionizing CAIES Preparation with AI
          </FormLabel>
        </Box>

        <Flex gap="4">
          {/* Sidebar: Previous Chats */}
          <VStack
            width="30%"
            bg="gray.800"
            padding="4"
            align="stretch"
            borderRadius="md"
            boxShadow="md"
            overflowY="auto"
            minH="70vh" // Fixed height for Previous Chats
            maxH="70vh" // Fixed height for Previous Chats
          >
            <Heading size="md" textAlign="center" color="teal.400">
              Previous Chats
            </Heading>
            <Divider />
            {chats.length > 0 ? (
              chats.map((chat, index) =>
                chat.role === 'user' ? (
                  <Text key={index} fontWeight="bold" color="teal.300">
                    {chat.text}
                  </Text>
                ) : (
                  <Text key={index} fontStyle="italic" color="gray.400">
                    {chat.text}
                  </Text>
                )
              )
            ) : (
              <Text>No chats yet</Text>
            )}
          </VStack>

          {/* Chat Area */}
          <VStack
            width="65%"
            bg="gray.900"
            padding="4"
            align="stretch"
            borderRadius="md"
            boxShadow="md"
            minH="70vh" // Fixed height for Chat Area
            maxH="70vh" // Fixed height for Chat Area
          >
            <Box
              flex="1"
              bg="gray.800"
              padding="4"
              borderRadius="md"
              overflowY="auto"
              boxShadow="sm"
              ref={chatContainerRef} // Reference for scrolling
            >
              {chats.length > 0 ? (
                chats.map((chat, index) => (
                  <Stack
                    key={index}
                    align={chat.role === 'user' ? 'flex-end' : 'flex-start'}
                    mb="4"
                  >
                    <Text
                      bg={chat.role === 'user' ? 'teal.600' : 'gray.700'}
                      color="white"
                      padding="3"
                      borderRadius="md"
                      maxW="80%"
                    >
                      {chat.text}
                    </Text>
                  </Stack>
                ))
              ) : (
                <Text textAlign="center" color="gray.500">
                  Start chatting with the AI agent!
                </Text>
              )}
            </Box>

            {/* Input Area */}
            <Box
              left="0"
              width="100%"
              bg="gray.800"
              padding="4"
              borderTop="1px solid #e2e8f0"
              boxShadow="md"
            >
              <Flex gap="4">
                <Textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyPress} // Handle Enter key press
                  placeholder="Type your message..."
                  focusBorderColor="teal.400"
                  resize="none"
                  rows={1}
                  minH="40px"
                  maxH="120px"
                  overflowY="auto"
                  bg="gray.700"
                  color="white"
                />
                <Button
                  onClick={handleSend}
                  isLoading={loading}
                  colorScheme="teal"
                >
                  Send
                </Button>
              </Flex>
            </Box>
          </VStack>
        </Flex>
      </Container>
    </ChakraProvider>
  );
};

export default Chatbot;
