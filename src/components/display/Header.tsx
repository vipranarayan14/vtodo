import React from 'react';

import { Box, Heading, Text } from '@chakra-ui/react';

type Props = {
  heading: string;
  subHeading?: string;
};

export const Header: React.FC<Props> = ({ heading, subHeading }) => (
  <Box
    as="header"
    bg="white"
    color="green.600"
    shadow="md"
    pos="sticky"
    top="0px"
    zIndex="sticky"
  >
    <Box width={{ lg: '650px' }} py="3" mx="auto">
      <Heading as="h1" textStyle="h1" ml="1">
        {heading}
      </Heading>
      {subHeading && (
        <Text fontSize="md" ml="2">
          {subHeading}
        </Text>
      )}
    </Box>
  </Box>
);
