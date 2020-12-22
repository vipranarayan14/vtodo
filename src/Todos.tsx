import React, { useEffect, useState } from 'react';

import dbxClient from './dbx';

import { TodoTxt } from './todotxt';

import { Box, Spinner, VStack } from '@chakra-ui/react';

import { Todo } from './Todo';

// import { sampleTodotxtFile as file } from './sample-todotxt';

type Props = {
  dbxAccessToken: string;
  setTasksCount: (count: number) => void;
};

const todoFilePath = '/Apps/Simpletask/todo.txt';

export const Todos: React.FC<Props> = ({
  setTasksCount,
  dbxAccessToken: accessToken,
}) => {
  const [todos, setTodos] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const [file, error] = await dbxClient.openFile(todoFilePath, accessToken);

      if (error) {
        setShowError(true);
        return;
      }

      const todos = TodoTxt.parseFile(file.contents);

      setTodos(todos);
      setTasksCount(todos.items().length);
    })();
  }, [setTasksCount, accessToken]);

  if (showError) {
    return <Box>Unable to get 'todo.txt' file.</Box>;
  }

  return !todos?.items().length ? (
    <Spinner />
  ) : (
    <VStack align="stretch" margin="2">
      {todos.items().map((todo: any) => (
        <Todo todo={todo} key={todo.id()} />
      ))}
    </VStack>
  );
};
