import React from 'react';

import { Heading, VStack } from '@chakra-ui/react';

import { TodoTxt } from '../lib/todotxt';

import { Todo } from './Todo';
import { getRelativeDate } from '../utils/getRelativeDate';

type TodosProps = {
  todos: TodoTxt.Todos;
  updateTodos: ($todos: TodoTxt.Todos) => void;
};

type Classified = {
  [key: string]: TodoTxt.Todo[];
};

interface IClassfiedTodos {
  classified: Classified;
  unclassified: TodoTxt.Todo[];
}

const makeDueDatesRelative = (classiedTodos: Classified): Classified =>
  Object.keys(classiedTodos)
    .sort()
    .reduce(
      (acc: Classified, key: string) => ({
        ...acc,
        [getRelativeDate(key)]: classiedTodos[key],
      }),
      {}
    );

const classifyByDueDate = (todos: TodoTxt.Todo[]) =>
  todos.reduce(
    (acc: IClassfiedTodos, todo) => {
      const dueDate = todo.addons()['due'];

      if (dueDate) {
        const classifiedItems = acc.classified[dueDate] || [];
        const newClassifiedItems = classifiedItems.concat(todo);
        const newClassified = {
          ...acc.classified,
          [dueDate]: newClassifiedItems,
        };

        return { ...acc, classified: newClassified };
      }

      const newUnclassified = acc.unclassified.concat(todo);

      return { ...acc, unclassified: newUnclassified };
    },
    { classified: {}, unclassified: [] }
  );

export const Todos: React.FC<TodosProps> = ({ todos, updateTodos }) => {
  const $todos = TodoTxt.parseFile(todos.render());

  const todosSortedByPriority = $todos.items(undefined, ['priority']);
  const todosClassifiedByDueDate = classifyByDueDate(todosSortedByPriority);
  const todosWithRelativeDueDate = makeDueDatesRelative(
    todosClassifiedByDueDate.classified
  );

  const todosSorted = {
    ...todosWithRelativeDueDate,
    None: todosClassifiedByDueDate.unclassified,
  };

  console.log(todosSorted);

  const onChange = () => {
    updateTodos($todos);
  };

  return (
    <>
      {Object.entries(todosSorted).map(([sectionTitle, todos]) => (
        <VStack align="stretch" mb="7">
          <Heading as="h2" fontSize="l" mb="1">
            {sectionTitle}
          </Heading>
          {todos.map((todo: TodoTxt.Todo) => (
            <Todo todo={todo} key={todo.id()} onChange={onChange} />
          ))}
        </VStack>
      ))}
    </>
  );
};
