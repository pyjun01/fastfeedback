import React from 'react';
import { Box, Heading, Stack, Text, Button } from '@chakra-ui/react';

function EmptyState() {
  return (
    <Box
      backgroundColor='white'
      ml={0}
      mr={0}
      borderRadius={8}
      boxShadow='0px 4px 10px rgba(0, 0, 0, 0.05)'
    >
      <Box
        height='40px'
        borderBottom='1px solid'
        borderBottomColor='gray.200'
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        backgroundColor='gray.50'
      />
      <Stack
        justifyContent='center'
        alignItems='center'
        spacing={2}
        p={16}
        borderRadius={8}
      >
        <Heading size='lg'>You haven’t added any sites.</Heading>
        <Text>Welcome 👋🏼 Let’s get started.</Text>
        <Button
          maxWidth='200px'
          mt={4}
          backgroundColor='gray.900'
          color='white'
          fontWeight='medium'
          _hover={{ bg: 'gray.700' }}
          _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)',
          }}
        >
          Add Your First Site
        </Button>
      </Stack>
    </Box>
  );
}

export default EmptyState;
