/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

import { EPeopleType } from '../../constants/EPeopleType';
import { PeopleCard } from './PeopleCard';

export const PeopleTemplateRelevant: React.FunctionComponent<MgtTemplateProps> = (props: MgtTemplateProps) => {
  const { value } = props.dataContext;
  return (
    <>
      {value?.map((people: any, index: number) => {
        return (
          <>
            <PeopleCard key={index} user={people} peopleType={EPeopleType.Relevant} />
          </>
        );
      })}
    </>
  );
};
