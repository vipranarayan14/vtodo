import React from 'react';

import { Center, ChakraProvider } from '@chakra-ui/react';
import { Todos } from './Todos';

import theme from './theme';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Center as="main">
      <Todos />
    </Center>
  </ChakraProvider>
);
