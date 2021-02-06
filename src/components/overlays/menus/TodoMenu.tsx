import React from 'react';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/react';

import { AiOutlineDelete, AiOutlineEllipsis } from 'react-icons/ai';

type Props = {
  todoId: string;
  deleteTodo: (todoId: string) => void;
};

export const TodoMenu: React.FC<Props> = ({ todoId, deleteTodo }) => {
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        aria-label="menu"
        icon={<AiOutlineEllipsis fontSize="1.5rem" />}
        variant="ghost"
        size="sm"
        h="1.5rem"
        mt="2px !important"
        mr="2px"
      />

      <MenuList>
        <MenuItem
          icon={<AiOutlineDelete fontSize="1.1rem" />}
          onClick={() => deleteTodo(todoId)}
          _hover={{ color: 'red.600' }}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
