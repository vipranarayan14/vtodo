import React, { useEffect, useState } from 'react';

import dbx from './dbx';

import { Box, Center, Checkbox, Spinner, VStack } from '@chakra-ui/react';

const todoFilePath = '/Apps/Simpletask/todo.txt';

export const Todos = () => {
  const [todos, setTodos] = useState<Array<string>>([]);

  useEffect(() => {
    dbx.openFile(todoFilePath).then((file) => {
      setTodos(file.contents.split('\n').filter((todo) => !!todo));
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
              <Checkbox size="lg">{todo}</Checkbox>
            </Box>
          ))}
        </VStack>
      )}
    </Center>
  );
};
