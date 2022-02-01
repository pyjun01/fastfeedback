import { Button, Code, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Head from 'next/head';

import { useAuth } from '@/lib/auth';

function Home() {
  const auth = useAuth();

  const handleSignin = () => {
    auth.signinWithGithub();
  };

  const handleSignout = () => {
    auth.signout();
  };

  return (
    <div className='container'>
      <Head>
        <title>Fast Feedback</title>
      </Head>
      <main>
        <Heading>Fast Feedback</Heading>

        <Text>
          Current user: <Code>{auth?.user?.email}</Code>
        </Text>
        {auth?.user ? (
          <Button onClick={handleSignout}>Sign out</Button>
        ) : (
          <Button onClick={handleSignin}>Sign in</Button>
        )}
        <div>{auth?.user?.email}</div>
      </main>

      <footer>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export default Home;
