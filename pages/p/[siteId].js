import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { createFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import Feedback from '@/components/Feedback';

export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();

  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

function FeedbackPage({ initialFeedback }) {
  const router = useRouter();

  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState([]);

  const auth = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending',
    };

    inputEl.current.value = '';
    setAllFeedback((prev) => [newFeedback, ...prev]);
    createFeedback(newFeedback);
  };

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  return (
    <Box
      display='flex'
      flexDirection='column'
      width='full'
      maxWidth='700px'
      margin='0 auto'
    >
      {auth.user && (
        <Box as='form' onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor='comment'>Comment</FormLabel>
            <Input ref={inputEl} id='comment' placeholder='Leave a comment' />
            <Button type='submit' mt={4} fontWeight='medium'>
              Add Comment
            </Button>
          </FormControl>
        </Box>
      )}
      {allFeedback?.map((feedback) => (
        <Feedback
          key={feedback.id || new Date().getTime().toString()}
          {...feedback}
        />
      ))}
    </Box>
  );
}

export default FeedbackPage;
