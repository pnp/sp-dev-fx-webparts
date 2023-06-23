/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

export const TrendingTempplateDefault: React.FunctionComponent<MgtTemplateProps> = (props: MgtTemplateProps) => {
  const { value } = props.dataContext;
  return (
    <>
      {value?.map((item: any, index: number) => {
        return (
          <>
             
          </>
        );
      })}
    </>
  );
};