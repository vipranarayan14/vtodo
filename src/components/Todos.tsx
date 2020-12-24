import React from 'react';

import { VStack } from '@chakra-ui/react';

import { TodoTxt } from '../lib/todotxt';

import { Todo } from './Todo';

type TodosProps = {
  todos: TodoTxt.Todos;
  updateTodos: ($todos: TodoTxt.Todos) => void;
};

export const Todos: React.FC<TodosProps> = ({ todos, updateTodos }) => {
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
