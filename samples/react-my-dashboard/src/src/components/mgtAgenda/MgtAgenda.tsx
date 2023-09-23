/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { Agenda } from '@microsoft/mgt-react/dist/es6/spfx';

import { useUtils } from '../../hooks/useUtils';
import { AgendaDefaultTemplate } from './AgendaDefaultTemplate';
import { AgendaLoadingTemplate } from './AgendaLoadingTemplate';
import { AgendaNoDataTemplate } from './AgendaNoDataTemplate';
import { useMgtAgendaStyles } from './useMgtAgendaStyles';

export const MgtAgenda: React.FunctionComponent = () => {
  const {getContainerHeight} = useUtils();
  const styles = useMgtAgendaStyles();

  return (
    <>
    <div className={styles.root} style={{height: getContainerHeight()}}>
      <Agenda days={5} className={styles.agenda}>
       <AgendaLoadingTemplate template="loading" />
        <AgendaDefaultTemplate template="default" />
        <AgendaNoDataTemplate template="no-data" />
      </Agenda>
      </div>
    </>
  );
};


