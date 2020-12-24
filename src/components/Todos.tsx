import React, { useEffect, useState } from 'react';

import dbxClient from './../utils/dbx';

import { TodoTxt } from './../lib/todotxt';

import { Spinner, VStack, useToast, Center } from '@chakra-ui/react';

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
  updateTodos: ($todos: TodoTxt.Todos) => void;
};

const Todos: React.FC<TodosProps> = ({ todos, updateTodos }) => {
  const $todos = TodoTxt.parseFile(todos.render());
  const sortedTodos = $todos.items(undefined, ['priority']);

  const onChange = () => {
    updateTodos($todos);
  };

  return (
    <VStack align="stretch">
      {sortedTodos.map((todo: TodoTxt.Todo) => (
        <Todo todo={todo} key={todo.id()} onChange={onChange} />
      ))}
    </VStack>
  );
};

export const TodosManager: React.FC<Props> = ({
  setTasksCount,
  config,
  dbxAccessToken: accessToken,
}) => {
  const [file, setFile] = useState<any>();
  const [todos, setTodos] = useState<TodoTxt.Todos>(TodoTxt.create());
  // const [showError, setShowError] = useState<boolean>(false);

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
