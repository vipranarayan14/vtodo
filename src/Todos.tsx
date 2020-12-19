import React, { useEffect, useState } from 'react';

import dbx from './dbx';

import { TodoTxt } from './todotxt';

import { Spinner, VStack } from '@chakra-ui/react';

import { Todo } from './Todo';

// import { sampleTodotxtFile as file } from './sample-todotxt';

const todoFilePath = '/Apps/Simpletask/todo.txt';

export const Todos = () => {
  const [todos, setTodos] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const file = await dbx.openFile(todoFilePath);
      const todos = TodoTxt.parseFile(file.contents);

      setTodos(todos.items());
    })();
  }, []);

  return !todos.length ? (
    <Spinner />
  ) : (
    <VStack align="stretch" width={{ lg: '650px' }} margin="3">
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id()} />
      ))}
    </VStack>
  );
};
