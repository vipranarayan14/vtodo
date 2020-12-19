import React from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';

export const Header = () => (
  <Box
    as="header"
    bg="white"
    color="green.500"
    shadow="md"
    pos="sticky"
    top="0px"
    zIndex="sticky"
  >
    <Box width={{ lg: '650px' }} p="3" mx="auto">
      <Heading as="h1" textStyle="h1" ml="1">
        Tasks
      </Heading>
      <Text fontSize="md" ml="2">
        All tasks
      </Text>
    </Box>
  </Box>
);
