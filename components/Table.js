import React from 'react';
import { Box, Text } from '@chakra-ui/react';

export function Table(props) {
  return (
    <Box
      as='table'
      ml={0}
      mr={0}
      borderRadius={8}
      backgroundColor='white'
      textAlign='left'
      boxShadow='0px 4px 10px rgba(0, 0, 0, 0.05)'
      {...props}
    />
  );
}

export function Tr(props) {
  return (
    <Box
      as='tr'
      height='40px'
      borderBottom='1px solid'
      borderBottomColor='gray.200'
      borderTopLeftRadius={8}
      borderTopRightRadius={8}
      backgroundColor='gray.50'
      {...props}
    />
  );
}

export function Th(props) {
  return (
    <Text
      as='th'
      px={4}
      fontSize='xs'
      fontWeight='medium'
      color='gray.500'
      textTransform='uppercase'
      {...props}
    />
  );
}

export function Td(props) {
  return (
    <Box
      as='td'
      p={4}
      borderBottom='1px solid'
      borderBottomColor='gray.100'
      color='gray.900'
      {...props}
    />
  );
}
