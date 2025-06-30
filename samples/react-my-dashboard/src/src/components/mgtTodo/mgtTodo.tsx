/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import { Todo } from '@microsoft/mgt-react/dist/es6/spfx';

import { useUtils } from '../../hooks/useUtils';
import { useMgtTodoStyles } from './useMgtTodoStyles';

export interface IMgtTodoProps {}

export const MgtTodo: React.FunctionComponent<IMgtTodoProps> = (props: React.PropsWithChildren<IMgtTodoProps>) => {
  const styles = useMgtTodoStyles();
  const {getContainerHeight} = useUtils();
  return (
    <>
      <div className={styles.root}   style={{height: getContainerHeight()}} >
        <Todo   className={styles.todo}/>
      </div>
    </>
  );
};
