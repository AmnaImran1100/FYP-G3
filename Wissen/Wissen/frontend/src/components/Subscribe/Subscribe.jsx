import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Badge,
  Divider,
  FormLabel,
} from '@chakra-ui/react';

const SubscriptionPage = () => {
  const plans = [
    {
      name: 'Basic Plan',
      price: 'Free',
      features: [
        'Access to past papers',
        'AI-generated MCQs',
        'Basic exam tips',
      ],
      buttonText: 'Start for Free',
      isPopular: false,
    },
    {
      name: 'Pro Plan',
      price: '$9.99/month',
      features: [
        'All features from Basic',
        'AI-powered notes generation',
        'Personalized study schedules',
        'Unlimited practice questions',
        'Progress tracking & reports',
      ],
      buttonText: 'Get Pro',
      isPopular: true,
    },
    {
      name: 'Ultimate Plan',
      price: '$19.99/month',
      features: [
        'All features from Pro',
        '1-on-1 AI tutor sessions',
        'Advanced study analytics',
        'Custom mock exams',
        'Priority support',
      ],
      buttonText: 'Go Ultimate',
      isPopular: false,
    },
  ];

  return (
    <Container maxW="container.xl" py="12" bg="black" color="gray.200" minH="100vh">
      {/* Header Section */}
      <VStack spacing="2" textAlign="center" mb="8">
        <Heading color="teal.400" size="lg" mb={0}>
          Wissen
        </Heading>
        <FormLabel
          textAlign="center"
          color="gray.400"
          fontSize="md"
          mt={0}
          lineHeight="1.0"
        >
          Revolutionizing CAIES Preparation with AI
        </FormLabel>
      </VStack>

      {/* Title and Description */}
      <VStack spacing="2" textAlign="center">
        <Heading size="lg" color="teal.400">
          Choose Your Plan
        </Heading>
        <FormLabel fontSize="md" color="gray.400" lineHeight={'0.5'}>
          Elevate your Cambridge studies with AI-powered tools tailored just
          for you. 
        </FormLabel>
        <FormLabel fontSize="md" color="gray.400" lineHeight={'0.5'}>
          Select a subscription plan that fits your learning style.
        </FormLabel>
      </VStack>

      {/* Plans Section */}
      <Flex justify="center" wrap="wrap" gap="8" mt="8">
        {plans.map((plan, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            p="6"
            bg={plan.isPopular ? 'teal.800' : 'gray.800'}
            color="gray.200"
            w={['100%', '300px']}
          >
            {plan.isPopular && (
              <Badge
                colorScheme="teal"
                variant="solid"
                mb="4"
                px="4"
                py="1"
                fontSize="sm"
              >
                Most Popular
              </Badge>
            )}
            <Heading size="lg" mb="4" color="teal.300">
              {plan.name}
            </Heading>
            <Text fontSize="2xl" fontWeight="bold" mb="4" color="teal.400">
              {plan.price}
            </Text>
            <Divider mb="4" borderColor="gray.700" />
            <VStack align="start" spacing="3" mb="4">
              {plan.features.map((feature, featureIndex) => (
                <Text key={featureIndex} fontSize="md" color="gray.300">
                  • {feature}
                </Text>
              ))}
            </VStack>
            <Link to="/payment" state={{ selectedPlan: plan }}>
              <Button
                colorScheme="teal"
                w="full"
                size="lg"
                bg="teal.400"
                _hover={{ bg: 'teal.300', color: 'black' }}
              >
                {plan.buttonText}
              </Button>
            </Link>
          </Box>
        ))}
      </Flex>
    </Container>
  );
};

export default SubscriptionPage;
