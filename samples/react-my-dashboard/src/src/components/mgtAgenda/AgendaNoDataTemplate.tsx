import * as React from 'react';

import { tokens } from '@fluentui/react-components';
import { CalendarAgenda24Filled } from '@fluentui/react-icons';
import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

import { NoData } from '../noData/NoData';

export const AgendaNoDataTemplate: React.FunctionComponent<MgtTemplateProps> = (props: MgtTemplateProps) => {
  return (
    <>
      <NoData message="No events found">
        <CalendarAgenda24Filled primaryFill={tokens.colorNeutralStroke1} style={{ width: 60, height: 60 }} />
      </NoData>
    </>
  );
};