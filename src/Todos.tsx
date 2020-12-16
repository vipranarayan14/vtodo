import React, { useEffect, useState } from 'react';

import dbx from './dbx';

const todoFilePath = '/Apps/Simpletask/todo.txt';

export const Todos = () => {
  const [todos, setTodos] = useState(['']);

  useEffect(() => {
    dbx.openFile(todoFilePath).then((file) => {
      setTodos(file.contents.split('\n'));
    });
  }, []);

  return (
    <ul>
      {todos.map((todo, id) => (
        <li key={id}>{todo}</li>
      ))}
    </ul>
  );
};
