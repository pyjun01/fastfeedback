import 'iframe-resizer/js/iframeResizer.contentWindow';
import { Box, Text } from '@chakra-ui/react';

import { Feedback } from '@/components/Feedback';

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;

  const { feedback } = await getAllFeedback(siteId, route);

  return {
    props: {
      feedback,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();

  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()],
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

function EmbeddedFeedbackPage({ feedback }) {
  return (
    <Box display='flex' flexDirection='column' width='full'>
      {feedback?.length ? (
        feedback.map((_feedback) => (
          <Feedback key={_feedback.id} {..._feedback} />
        ))
      ) : (
        <Text>There are no comments for this site.</Text>
      )}
    </Box>
  );
}
export default EmbeddedFeedbackPage;
