import React from 'react';

import { ChakraProvider, theme } from '@chakra-ui/react';
import { Todos } from './Todos';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Todos />
  </ChakraProvider>
);
