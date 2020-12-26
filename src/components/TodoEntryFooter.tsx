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

type Props = {
  todoText: string;
  setTodoText: ($todoText: string) => void;
};

export const TodoEntryFooter: React.FC<Props> = ({ todoText, setTodoText }) => {
  const isDisabled = !todoText;

  const setPriority = (priority: string) => {
    if (!todoText) return;

    const todo = TodoTxt.parseLine(todoText);

    if (priority) {
      todo.setPriority(priority);
    } else {
      todo.removePriority();
    }

    const newTodoText = todo.render();

    setTodoText(newTodoText);
  };

  return (
    <>
      <PriorityButton isDisabled={isDisabled} setPriority={setPriority} />

      <IconButton
        aria-label="Add project"
        icon={<AiOutlineTag />}
        size="lg"
        variant="transparent"
      />

      <IconButton
        aria-label="Add context"
        icon={<FiAtSign />}
        size="lg"
        variant="transparent"
      />

      <IconButton
        aria-label="Add due date"
        icon={<AiOutlineClockCircle />}
        size="lg"
        variant="transparent"
      />

      <IconButton
        aria-label="Add threshold date"
        icon={<AiOutlineCalendar />}
        size="lg"
        variant="transparent"
      />
    </>
  );
};
