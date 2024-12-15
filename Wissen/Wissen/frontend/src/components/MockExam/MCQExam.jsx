import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Paper1 = () => {
  // Sample MCQ Questions
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: "Paris",
    },
    {
      question: "Which element has the chemical symbol H?",
      options: ["Helium", "Hydrogen", "Oxygen", "Nitrogen"],
      correct: "Hydrogen",
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correct: "4",
    },
  ];

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate(); // Hook to navigate between routes

  const handleSubmit = () => {
    setSubmitted(true);

    // Delay navigation back to MockExam page to let user see results
    setTimeout(() => {
      navigate("/progressreport"); // Adjust the path to match your routing configuration
    }, 2000); // 2-second delay
  };

  return (
    <Box minH="100vh" bg="black" color="gray.200" py="8">
      {/* Header Section */}
      <Box textAlign="center" mb="8">
        <Heading color="teal.400" size="lg" mb="2">
          Wissen
        </Heading>
        <FormLabel textAlign="center" fontSize="md" color="gray.400" lineHeight="0.5">
          Revolutionizing CAIES Preparation with AI
        </FormLabel>
      </Box>

      {/* Paper 1 Card */}
      <Container maxW="container.md">
        <VStack
          spacing="6"
          bg="gray.800"
          p="8"
          borderRadius="lg"
          boxShadow="lg"
          align="stretch"
        >
          <Heading textAlign="center" color="teal.300">
            Paper 1: MCQ
          </Heading>

          {questions.map((q, index) => (
            <Box
              key={index}
              p="4"
              bg="teal.700"
              borderRadius="md"
              boxShadow="sm"
              width="100%"
            >
              <Text fontWeight="bold" color="white">{`${index + 1}. ${q.question}`}</Text>
              <RadioGroup
                onChange={(value) =>
                  setAnswers((prev) => ({ ...prev, [index]: value }))
                }
                isDisabled={submitted}
              >
                <Stack spacing="2" mt="2">
                  {q.options.map((option, i) => (
                    <Radio
                      key={i}
                      value={option}
                      colorScheme="teal"
                      bg="gray.700"
                      _hover={{ bg: "teal.600", color: "white" }}
                    >
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
              {submitted && (
                <Text
                  mt="2"
                  color={
                    answers[index] === q.correct ? "green.400" : "red.400"
                  }
                >
                  {answers[index] === q.correct
                    ? "Correct!"
                    : `Wrong! Correct answer: ${q.correct}`}
                </Text>
              )}
            </Box>
          ))}

          {!submitted && (
            <Button
            colorScheme="teal"
            onClick={handleSubmit}
            bg="teal.400"
            _hover={{
              bg: "teal.300",
              color: "gray.800", // Text color will turn gray.800 on hover
            }}
          >
            Submit
          </Button>
          )}

          {submitted && (
            <Text color="gray.400" mt="4">
              Returning to the Mock Exam page shortly...
            </Text>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Paper1;
