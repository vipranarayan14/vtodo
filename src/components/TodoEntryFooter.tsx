import React from 'react';

import { IconButton } from '@chakra-ui/react';

import {
  AiOutlineTag,
  AiOutlineClockCircle,
  AiOutlineCalendar,
} from 'react-icons/ai';

import { FiAtSign } from 'react-icons/fi';

import { TodoTxt } from '../lib/todotxt';

import { PriorityButton } from './PriorityButton';
import { CollectionsButton } from './CollectionsButton';

type Props = {
  todoText: string;
  setTodoText: ($todoText: string) => void;
  collections: {
    contexts: string[];
    projects: string[];
  };
  isDisabled: boolean;
};

export const TodoEntryFooter: React.FC<Props> = ({
  todoText,
  setTodoText,
  collections,
  isDisabled,
}) => {
  const todo = TodoTxt.parseLine(todoText);

  const updateTodoText = (todo: TodoTxt.Todo) => setTodoText(todo.render());

  const setPriority = (priority: string) => {
    if (!todoText) return;

    if (priority) {
      todo.setPriority(priority);
    } else {
      todo.removePriority();
    }

    updateTodoText(todo);
  };

  const getUnusedProjects = () =>
    collections.projects.filter(
      (project) => !todo?.projects().includes(project)
    );

  const addProject = (project: string) => {
    if (!todoText) return;

    todo.addProject(project);

    updateTodoText(todo);
  };

  const getUnusedContexts = () =>
    collections.contexts.filter(
      (context) => !todo?.contexts().includes(context)
    );

  const addContext = (context: string) => {
    if (!todoText) return;

    todo.addContext(context);

    updateTodoText(todo);
  };

  return (
    <>
      <PriorityButton isDisabled={isDisabled} setPriority={setPriority} />

      <CollectionsButton
        variant="Project"
        icon={<AiOutlineTag />}
        isDisabled={isDisabled}
        getCollections={getUnusedProjects}
        addCollection={addProject}
      />

      <CollectionsButton
        variant="Context"
        icon={<FiAtSign />}
        isDisabled={isDisabled}
        getCollections={getUnusedContexts}
        addCollection={addContext}
      />

      {/* <IconButton
        aria-label="Add context"
        size="lg"
        variant="ghost"
      /> */}

      <IconButton
        aria-label="Add due date"
        icon={<AiOutlineClockCircle />}
        size="lg"
        variant="ghost"
      />

      <IconButton
        aria-label="Add threshold date"
        icon={<AiOutlineCalendar />}
        size="lg"
        variant="ghost"
      />
    </>
  );
};
