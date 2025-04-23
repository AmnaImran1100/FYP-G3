import React, { useState } from 'react';
import {
  Box, Heading, FormControl, FormLabel, Input, Button,
  RadioGroup, Radio, Stack, Select, useToast,Grid
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import Sidebar from '../Dashboard/Sidebar';
import { addResource } from '../../../redux/actions/admin';

const UploadResource = () => {
  const dispatch = useDispatch();

  const [level, setLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [file, setFile] = useState(null);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !level || !subject || !resourceType) {
      toast({
        title: "Missing Fields",
        description: "Please fill all fields and select a file.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // assuming you store the file in state
    formData.append('level', level);
    formData.append('subject', subject);
    formData.append('resourceType', resourceType);
    dispatch(addResource(formData));

    // Logic to upload the file goes here
    toast({
      title: "Upload successful",
      description: "Your resource has been uploaded.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    // Clear form
    setLevel('');
    setSubject('');
    setResourceType('');
    setFile(null);
  };

  return (
    <Grid
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="md" borderRadius="xl">
      <Heading mb={6} size="lg" textAlign="center">Upload Resource</Heading>

      <form onSubmit={handleSubmit}>
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
            {/* Add more subjects as needed */}
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

        <FormControl mb={4} isRequired>
          <FormLabel>Upload File</FormLabel>
          <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </FormControl>

        <Button colorScheme="teal" type="submit" width="full">Upload</Button>
      </form>
    </Box>
    
    <Sidebar/>
    </Grid>
  );
};

export default UploadResource;
