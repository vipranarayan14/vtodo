import React, { useEffect, useState } from 'react';

import { Spinner, useToast, Center } from '@chakra-ui/react';

import { TodoTxt } from '../../lib/todotxt';

import dbxClient from '../../utils/dbx';

import { Todos } from '../display/Todos';
import { TodoEntry } from '../forms/TodoEntry';

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

  const updateTodos = async ($todos: TodoTxt.Todos): Promise<boolean> => {
    const contents = $todos.render();

    const [newFile, error] = await dbxClient.updateFile(
      contents,
      file,
      accessToken
    );

    if (error) {
      toast({
        title: 'Update error',
        description: "Changes not saved to 'todo.txt'.",
        status: 'error',
        isClosable: true,
      });

      console.error(error);

      return false;
    }

    setFile(newFile);

    // updated `file` from state will not be available here
    const newTodos = TodoTxt.parseFile(newFile.contents);

    setTodos(newTodos);

    return true;
  };

  const addTodo = (todoString: string) => {
    todos.addItem(todoString);

    return updateTodos(todos);
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
    <>
      <TodoEntry addTodo={addTodo} collections={todos.collections(true)} />
      <Todos todos={todos} updateTodos={updateTodos} />
    </>
  );
};
