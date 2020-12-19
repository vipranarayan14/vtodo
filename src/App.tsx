import React from 'react';

import { Center, ChakraProvider } from '@chakra-ui/react';
import { Todos } from './Todos';

import theme from './theme';
import { Header } from './Header';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Header />
    <Center as="main">
      <Todos />
    </Center>
  </ChakraProvider>
);
