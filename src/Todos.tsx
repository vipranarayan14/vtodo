import React, { useEffect, useState } from 'react';

import dbx from './dbx';

import { TodoTxt } from './todotxt';

import { Box, Center, Checkbox, Spinner, VStack } from '@chakra-ui/react';

const todoFilePath = '/Apps/Simpletask/todo.txt';

export const Todos = () => {
  const [todos, setTodos] = useState<Array<any>>([]);

  useEffect(() => {
    dbx.openFile(todoFilePath).then((file) => {
      const todos = TodoTxt.parseFile(file.contents);

      setTodos(todos.items());
    });
  }, []);

  return (
    <Center>
      {!todos.length ? (
        <Spinner />
      ) : (
        <VStack align="stretch" width={{ lg: '650px' }} margin="3">
          {todos.map((todo, id) => (
            <Box padding="5" shadow="base" key={id}>
              <Checkbox size="lg" spacing="3">
                {todo.textTokens().join(' ')}
              </Checkbox>
            </Box>
          ))}
        </VStack>
      )}
    </Center>
  );
};
