import React from 'react';
import { Box, Skeleton } from '@chakra-ui/react';

import { Table, Tr, Th, Td } from './Table';

function SkeletonRow({ width }) {
  return (
    <Box as='tr'>
      <Td>
        <Skeleton w={width} height='10px' my={4} />
      </Td>
      <Td>
        <Skeleton w={width} height='10px' my={4} />
      </Td>
      <Td>
        <Skeleton w={width} height='10px' my={4} />
      </Td>
      <Td>
        <Skeleton w={width} height='10px' my={4} />
      </Td>
    </Box>
  );
}

function SiteTableSkeleton() {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Site Link</Th>
          <Th>Feedback Link</Th>
          <Th>Date Added</Th>
          <Th></Th>
        </Tr>
      </thead>
      <tbody>
        <SkeletonRow width='75px' />
        <SkeletonRow width='125px' />
        <SkeletonRow width='50px' />
        <SkeletonRow width='100px' />
        <SkeletonRow width='75px' />
      </tbody>
    </Table>
  );
}

export default SiteTableSkeleton;
