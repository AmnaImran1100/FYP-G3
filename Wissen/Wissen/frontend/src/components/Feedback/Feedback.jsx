import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  Textarea,
  Text,
  VStack,
  IconButton,
  FormLabel,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

// Custom Theme for Global Styles
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "black", // Set the whole page background to black
        color: "gray.200", // Default text color to light grey
      },
    },
  },
});

const FeedbackPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submittedFeedback, setSubmittedFeedback] = useState([]);

  // Handles form submission
  const handleSubmit = () => {
    if (!name || !email || !feedback || rating === 0) {
      alert("Please fill out all fields and provide a rating!");
      return;
    }

    const newFeedback = {
      name,
      email,
      feedback,
      rating,
    };

    setSubmittedFeedback((prev) => [...prev, newFeedback]);
    setName("");
    setEmail("");
    setFeedback("");
    setRating(0);
  };

  // Handles star rating selection
  const handleRating = (index) => {
    setRating(index + 1);
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.md" minH="100vh" paddingY="8" bg="black" color="gray.200">
        {/* Header Section */}
        <Box textAlign="center" mb={6}>
          <Heading color="teal.400" size="lg" mb={1}>
            Wissen
          </Heading>
          <FormLabel
            textAlign="center"
            color="gray.400"
            fontSize="md"
            mt={0}
            lineHeight="1.2"
          >
            Revolutionizing CAIES Preparation with AI
          </FormLabel>
        </Box>

        <Flex h="full" gap="8" flexDirection="column">
          {/* Feedback Form Section */}
          <Box
            bg="gray.900"
            padding="8"
            borderRadius="md"
            boxShadow="md"
          >
            <Heading size="md" textAlign="center" mb="4" color="teal.400">
              User Feedback
            </Heading>
            <VStack spacing="4">
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                focusBorderColor="teal.400"
                bg="gray.800"
                color="gray.200"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                focusBorderColor="teal.400"
                bg="gray.800"
                color="gray.200"
              />
              <Textarea
                placeholder="Your Feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                focusBorderColor="teal.400"
                bg="gray.800"
                color="gray.200"
              />
              <HStack>
                <Text fontWeight="bold" color="gray.400">
                  Rating:
                </Text>
                {[...Array(5)].map((_, index) => (
                  <IconButton
                    key={index}
                    icon={<StarIcon />}
                    colorScheme={index < rating ? "teal" : "gray"}
                    onClick={() => handleRating(index)}
                    aria-label={`Rate ${index + 1} stars`}
                  />
                ))}
              </HStack>
              <Button
                colorScheme="teal"
                onClick={handleSubmit}
                width="full"
              >
                Submit Feedback
              </Button>
            </VStack>
          </Box>

          {/* Feedback List Section */}
          <Box
            bg="gray.800"
            padding="8"
            borderRadius="md"
            boxShadow="md"
            overflowY="auto"
            maxH="50vh"
          >
            <Heading size="md" mb="4" color="teal.400">
              Previous Feedback
            </Heading>
            {submittedFeedback.length === 0 ? (
              <Text textAlign="center" color="gray.400">
                No feedback submitted yet.
              </Text>
            ) : (
              <VStack spacing="4" align="stretch">
                {submittedFeedback.map((fb, index) => (
                  <Box
                    key={index}
                    bg="gray.700"
                    padding="4"
                    borderRadius="md"
                    boxShadow="sm"
                  >
                    <Text fontWeight="bold" color="teal.400">
                      {fb.name}
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      {fb.email}
                    </Text>
                    <Text mt="2" color="gray.300">
                      {fb.feedback}
                    </Text>
                    <HStack mt="2">
                      {[...Array(5)].map((_, starIndex) => (
                        <StarIcon
                          key={starIndex}
                          color={starIndex < fb.rating ? "teal.400" : "gray.600"}
                        />
                      ))}
                    </HStack>
                  </Box>
                ))}
              </VStack>
            )}
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  );
};

export default FeedbackPage;
