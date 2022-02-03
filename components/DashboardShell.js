import React from 'react';
import { Box, Button, Flex, Link, Avatar, Icon } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useAuth } from '@/lib/auth';

function DashboardShell({ children }) {
  const { user } = useAuth();

  return (
    <Box h='100vh' backgroundColor='gray.100'>
      <Flex
        w='full'
        mb={[8, 16]}
        borderTop='5px solid #0AF5F4'
        backgroundColor='white'
      >
        <Flex
          justifyContent='space-between'
          alignItems='center'
          w='full'
          h='60px'
          maxW='1250px'
          margin='0 auto'
          pt={4}
          pb={4}
          px={8}
        >
          <Flex align='center'>
            <NextLink href='/' passHref>
              <Link>
                <Icon name='logo' size='24px' mr={8} />
              </Link>
            </NextLink>
            <NextLink href='/sites' passHref>
              <Link mr={4}>Sites</Link>
            </NextLink>
            <NextLink href='/feedback' passHref>
              <Link>Feedback</Link>
            </NextLink>
          </Flex>
          <Flex justifyContent='center' alignItems='center'>
            {user && (
              <NextLink href='/account' passHref>
                <Button as='a' variant='ghost' mr={2}>
                  Account
                </Button>
              </NextLink>
            )}
            <Avatar size='sm' src={user?.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      <Flex direction='column' maxW='1250px' margin='0 auto' px={[0, 8, 8]}>
        {children}
      </Flex>
    </Box>
  );
}

export default DashboardShell;
