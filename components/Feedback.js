import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

function Feedback({ author, text, createdAt }) {
  <Box w='full' maxWidth='700px' borderRadius={4}>
    <Heading as='h3' size='sm' mb={0} fontWeight='medium' color='gray.900'>
      {author}
    </Heading>
    <Text mb={4} fontSize='xs' color='gray.500'>
      {format(parseISO(createdAt), 'PPpp')}
    </Text>
    <Text color='gray.800'>{text}</Text>
    <Divider mt={8} mb={8} borderColor='gray.200' backgroundColor='gray.200' />
  </Box>;
}

export default Feedback;
