import React, { useEffect, useState } from 'react';

import dbxClient from '../utils/dbx';

import { TodoTxt } from '../lib/todotxt';

import { Spinner, useToast, Center } from '@chakra-ui/react';
import { Todos } from './Todos';

type Props = {
  dbxAccessToken: string;
  config: {
    todoFilePath: string;
    doneFilePath: string;
  };
  setTasksCount: (count: number) => void;
};

export const TodosManager: React.FC<Props> = ({
  setTasksCount,
  config,
  dbxAccessToken: accessToken,
}) => {
  const [file, setFile] = useState<any>();
  const [todos, setTodos] = useState<TodoTxt.Todos>(TodoTxt.create());

  const toast = useToast();

  const updateTodos = async ($todos: TodoTxt.Todos) => {
    const contents = $todos.render();

    const [newFile, error] = await dbxClient.updateFile(
      contents,
      file,
      accessToken
    );

    if (error) {
      toast({
        title: 'Update error',
        description: "Changes not saved to 'todo.txt'",
        status: 'error',
        isClosable: true,
      });

      return console.log(error);
    }

    setFile(newFile);

    // updated `file` from state will not be available here
    const todos = TodoTxt.parseFile(newFile.contents);

    setTodos(todos);
  };

  useEffect(() => {
    (async () => {
      const [file, error] = await dbxClient.openFile(
        config.todoFilePath,
        accessToken
      );

      if (error) {
        toast({
          position: 'top-right',
          title: 'An error occured',
          description: "Unable to get 'todo.txt' file.",
          status: 'error',
          duration: null,
          isClosable: true,
        });

        return;
      }

      setFile(file);

      const todos = TodoTxt.parseFile(file.contents);

      setTodos(todos);
      setTasksCount(todos.items().length);
    })();
  }, [setTasksCount, toast, accessToken, config]);

  return !todos.items().length ? (
    <Center mt="10">
      <Spinner />
    </Center>
  ) : (
    <Todos todos={todos} updateTodos={updateTodos} />
  );
};
