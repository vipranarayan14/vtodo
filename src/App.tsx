import React, { useState } from 'react';

import { Center, ChakraProvider } from '@chakra-ui/react';
import { Todos } from './Todos';

import theme from './theme';
import { Header } from './Header';

export const App = () => {
  const [tasksCount, setTasksCount] = useState<number>(0);

  return (
    <ChakraProvider theme={theme}>
      <Header tasksCount={tasksCount} />
      <Center as="main">
        <Todos setTasksCount={(count: number) => setTasksCount(count)} />
      </Center>
    </ChakraProvider>
  );
};
