import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Text,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Select,
  VStack,
  Box,
} from "@chakra-ui/react";

const MockExam = () => {
  const [subject, setSubject] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [paper, setPaper] = React.useState("");
  const navigate = useNavigate();

  const handleProceed = () => {
    if (paper === "1") {
      navigate("/mockexam/mcqexam", { state: { subject, level } });
    } else {
      navigate("/mockexam/textexam", { state: { subject, level, paper } });
    }
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

      {/* Mock Exam Card */}
      <Container maxW="container.md">
        <VStack
          spacing="6"
          bg="teal.800"
          p="8"
          borderRadius="lg"
          boxShadow="lg"
          align="stretch"
        >
          <Heading textAlign="center" color="teal.300">
            Mock Exam Selection
          </Heading>

          <Text fontSize="lg" textAlign="center" color="gray.100">
            Welcome to the Mock Exam portal. Select the desired subject, level,
            and paper number to get started with your preparation.
          </Text>

          {/* Subject Selection */}
          <FormControl isRequired>
            <FormLabel color="gray.300">Select Subject</FormLabel>
            <Select
              placeholder="Choose a subject"
              onChange={(e) => setSubject(e.target.value)}
              focusBorderColor="teal.400"
              bg="teal.600"
              color="gray.800"
              _hover={{ bg: "white" }}
            >
              <option value="physics" style={{ background: "gray.800", color: "gray.800" }}>
                Physics
              </option>
              <option value="chemistry" style={{ background: "gray.800", color: "gray.800" }}>
                Chemistry
              </option>
              <option value="biology" style={{ background: "gray.800", color: "gray.800" }}>
                Biology
              </option>
              <option value="mathematics" style={{ background: "gray.800", color: "gray.800" }}>
                Mathematics
              </option>
              <option value="computer science" style={{ background: "gray.800", color: "gray.800" }}>
                Computer Science
              </option>
              <option value="general sciences" style={{ background: "gray.800", color: "gray.800" }}>
                General Sciences
              </option>
            </Select>
          </FormControl>

          {/* Level Selection */}
          <FormControl isRequired>
            <FormLabel color="gray.300">Select Level</FormLabel>
            <Select
              placeholder="Choose a level"
              onChange={(e) => setLevel(e.target.value)}
              focusBorderColor="teal.400"
              bg="teal.600"
              color="gray.800"
              _hover={{ bg: "white" }}
            >
              <option value="a-levels" style={{ background: "gray.800", color: "gray.800" }}>
                A Levels
              </option>
              <option value="o-levels" style={{ background: "gray.800", color: "gray.800" }}>
                O Levels
              </option>
            </Select>
          </FormControl>

          {/* Paper Number Selection */}
          <FormControl isRequired>
            <FormLabel color="gray.300">Select Paper Number</FormLabel>
            <Select
              placeholder="Choose paper number"
              onChange={(e) => setPaper(e.target.value)}
              focusBorderColor="teal.400"
              bg="teal.600"
              color="gray.800"
              _hover={{ bg: "white" }}
            >
              <option value="1" style={{ background: "gray.800", color: "gray.800" }}>
                Paper 1
              </option>
              <option value="2" style={{ background: "gray.800", color: "gray.800" }}>
                Paper 2
              </option>
              <option value="3" style={{ background: "gray.800", color: "gray.800" }}>
                Paper 3
              </option>
              <option value="4" style={{ background: "gray.800", color: "gray.800" }}>
                Paper 4
              </option>
            </Select>
          </FormControl>

          {/* Proceed Button */}
          <Button
            colorScheme="teal"
            isDisabled={!subject || !level || !paper}
            onClick={handleProceed}
            bg="teal.400"
            _hover={{ bg: "teal.300", color: "black" }}
          >
            Proceed to Exam
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default MockExam;
