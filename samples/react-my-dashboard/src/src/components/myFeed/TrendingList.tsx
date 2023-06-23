/* eslint-disable no-unused-expressions */
import * as React from 'react';

import { Get } from '@microsoft/mgt-react/dist/es6/spfx';

import { useItemStyles } from './useItemStyles';

export interface INewsProps {}

export const TrendingList: React.FunctionComponent<INewsProps> = (props: React.PropsWithChildren<INewsProps>) => {
  const styles = useItemStyles();
  return (
    <>
      <div className={styles.centerContainer}>
      <Get
          resource="/me/insights/trending"
          maxPages={1}
         />
      </div>
    </>
  );
};