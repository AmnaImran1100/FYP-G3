import React, { useState, useEffect } from 'react';
import {
  Box, Heading, FormControl, FormLabel, Select, RadioGroup,
  Radio, Stack, Button, useToast, VStack, Link
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getResources } from '../../redux/actions/user';

const ViewResources = () => {
  const [level, setLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [resources, setResources] = useState([]);
  const toast = useToast();

  const dispatch = useDispatch();
  
  // Get the resources and other states (loading, error) from Redux state
  const { resources: resourcesFromRedux, loading, error } = useSelector((state) => state.resources);

  const handleSearch = async () => {
    if (!level || !subject || !resourceType) {
      toast({
        title: "Missing Fields",
        description: "Please select all fields to search.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Dispatch the action to get resources from the backend
    dispatch(getResources({ level, subject, resourceType }));
  };

  // Update the resources state when the resources from Redux state change
  useEffect(() => {
    if (Array.isArray(resourcesFromRedux)) {
      setResources(resourcesFromRedux);
    }
  }, [resourcesFromRedux]);

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="xl">
      <Heading mb={6} size="lg" textAlign="center">View Resources</Heading>

      <FormControl mb={4} isRequired>
        <FormLabel>Level</FormLabel>
        <RadioGroup onChange={setLevel} value={level}>
          <Stack direction="row">
            <Radio value="O Level">O Level</Radio>
            <Radio value="A Level">A Level</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Subject</FormLabel>
        <Select placeholder="Select subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Computer Science">Computer Science</option>
          <option value="English">English</option>
        </Select>
      </FormControl>

      <FormControl mb={4} isRequired>
        <FormLabel>Resource Type</FormLabel>
        <Select placeholder="Select resource type" value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
          <option value="Past Paper">Past Paper</option>
          <option value="Book">Book</option>
          <option value="Marking Scheme">Marking Scheme</option>
          <option value="Notes">Notes</option>
        </Select>
      </FormControl>

      <Button colorScheme="teal" onClick={handleSearch} width="full" mb={6}>Search</Button>

      {loading && <p>Loading resources...</p>} {/* Display loading state */}

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if there's any */}

      <VStack spacing={4} align="stretch">
        {resources.length > 0 ? (
          resources.map((res) => (
            <Box key={res._id} p={3} border="1px solid #ccc" borderRadius="md">
              <p><strong>Subject:</strong> {res.subject}</p>
              <p><strong>Type:</strong> {res.resourceType}</p>
              <p><strong>Link:</strong> <Link color="blue.500" href={res.driveLink} isExternal>Open Resource</Link></p>
            </Box>
          ))
        ) : (
          <p>No resources found.</p>
        )}
      </VStack>
    </Box>
  );
};

export default ViewResources;
