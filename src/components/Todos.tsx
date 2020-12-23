import React, { useEffect, useState } from 'react';

import dbxClient from './../utils/dbx';

import { TodoTxt } from './../lib/todotxt';

import { Box, Spinner, VStack } from '@chakra-ui/react';

import { Todo } from './Todo';

type Props = {
  dbxAccessToken: string;
  config: {
    todoFilePath: string;
    doneFilePath: string;
  };
  setTasksCount: (count: number) => void;
};

type TodosProps = {
  todos: TodoTxt.Todos;
  setTodos: (todos: TodoTxt.Todos) => void;
};

const Todos: React.FC<TodosProps> = ({ todos }) => {
  const sortedTodos = todos.items(undefined, ['priority']);

  return (
    <VStack align="stretch">
      {sortedTodos.map((todo: any) => (
        <Todo todo={todo} key={todo.id()} />
      ))}
    </VStack>
  );
};

export const TodosManager: React.FC<Props> = ({
  setTasksCount,
  config,
  dbxAccessToken: accessToken,
}) => {
  const [todos, setTodos] = useState<TodoTxt.Todos>();
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const [file, error] = await dbxClient.openFile(
        config.todoFilePath,
        accessToken
      );

      if (error) {
        setShowError(true);
        return;
      }

      const todos = TodoTxt.parseFile(file.contents);

      setTodos(todos);
      setTasksCount(todos.items().length);
    })();
  }, [setTasksCount, accessToken, config]);

  if (showError) {
    return <Box>Unable to get 'todo.txt' file.</Box>;
  }

  return !todos?.items().length ? (
    <Spinner />
  ) : (
    <Todos todos={todos} setTodos={(todos: TodoTxt.Todos) => setTodos(todos)} />
  );
};
