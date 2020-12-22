import React from 'react';

import { Box } from '@chakra-ui/react';

type Props = {
  children: any;
};

export const Main: React.FC<Props> = ({ children }) => (
  <Box width={{ lg: '650px' }} mx="auto" p="2">
    {children}
  </Box>
);
