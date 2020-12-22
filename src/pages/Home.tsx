import React, { useState } from 'react';

import { Header } from './../Header';
import { Main } from './../Main';
import { Todos } from './../Todos';

type Props = {
  dbxAccessToken: string;
  config: {
    todoFilePath: string;
    doneFilePath: string;
  };
};

export const Home: React.FC<Props> = ({ dbxAccessToken, config }) => {
  const [tasksCount, setTasksCount] = useState<number>(0);

  return (
    <>
      <Header heading="All Tasks" subHeading={`${tasksCount} tasks`} />
      <Main>
        <Todos
          dbxAccessToken={dbxAccessToken}
          config={config}
          setTasksCount={(count: number) => setTasksCount(count)}
        />
      </Main>
    </>
  );
};
