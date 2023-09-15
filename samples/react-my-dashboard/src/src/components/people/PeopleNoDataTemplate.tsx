import * as React from 'react';

import * as strings from 'DashBoardWebPartStrings';

import { tokens } from '@fluentui/react-components';
import { PeopleCommunity24Filled } from '@fluentui/react-icons';
import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

import { NoData } from '../noData/NoData';

export interface IPeopleNoDataTemplateProps {}

export const PeopleNoDataTemplate: React.FunctionComponent<MgtTemplateProps> = (props: MgtTemplateProps) => {
  return (
    <>
      <NoData message={strings.NoPeople}>
        <PeopleCommunity24Filled primaryFill={tokens.colorNeutralStroke1} style={{ width: 60, height: 60 }} />
      </NoData>
    </>
  );
};
