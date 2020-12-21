import React, { useState } from 'react';

import { Center } from '@chakra-ui/react';

import { Todos } from './../Todos';
import { Header } from './../Header';

type Props = {
  dbxAccessToken: string;
};

export const Home: React.FC<Props> = ({ dbxAccessToken }) => {
  const [tasksCount, setTasksCount] = useState<number>(0);

  return (
    <>
      <Header tasksCount={tasksCount} />
      <Center as="main">
        <Todos
          dbxAccessToken={dbxAccessToken}
          setTasksCount={(count: number) => setTasksCount(count)}
        />
      </Center>
    </>
  );
};
