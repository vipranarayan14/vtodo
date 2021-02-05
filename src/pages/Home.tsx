import React, { useState } from 'react';

import { Header } from '../components/display/Header';
import { Main } from '../components/display/wrapper/Main';
import { TodosManager } from '../components/logic/TodosManager';

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
