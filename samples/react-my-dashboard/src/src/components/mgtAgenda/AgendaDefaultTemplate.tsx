/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

import {
  HEIGHT_ON_SPSITE,
  HEIGHT_ON_TEAMS,
} from '../../constants/constants';
import { useUtils } from '../../hooks/useUtils';
import { Event } from './Event';
import { useMgtAgendaStyles } from './useMgtAgendaStyles';

export const AgendaDefaultTemplate: React.FunctionComponent<MgtTemplateProps> = (props: React.PropsWithChildren<MgtTemplateProps>) => {
  const agendaStyles = useMgtAgendaStyles();
  const { events } = props.dataContext;
 const { isInTeams} = useUtils();
  return (
    <div className={agendaStyles.root} style={{height: isInTeams ? HEIGHT_ON_TEAMS: HEIGHT_ON_SPSITE}}>
      {events?.map((event: any, index: number) => {
        return <Event key={index} event={event} />;
      })}
    </div>
  );
};