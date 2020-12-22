import React, { useState } from 'react';

import { Header } from './../Header';
import { Main } from './../Main';
import { Todos } from './../Todos';

type Props = {
  dbxAccessToken: string;
};

export const Home: React.FC<Props> = ({ dbxAccessToken }) => {
  const [tasksCount, setTasksCount] = useState<number>(0);

  return (
    <>
      <Header heading="All Tasks" subHeading={`${tasksCount} tasks`} />
      <Main>
        <Todos
          dbxAccessToken={dbxAccessToken}
          setTasksCount={(count: number) => setTasksCount(count)}
        />
      </Main>
    </>
  );
};
