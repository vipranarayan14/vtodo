import React, { useState } from 'react';

import { Header } from './../components/Header';
import { Main } from './../components/Main';
import { TodosManager } from './../components/Todos';

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
        <TodosManager
          dbxAccessToken={dbxAccessToken}
          config={config}
          setTasksCount={(count: number) => setTasksCount(count)}
        />
      </Main>
    </>
  );
};
