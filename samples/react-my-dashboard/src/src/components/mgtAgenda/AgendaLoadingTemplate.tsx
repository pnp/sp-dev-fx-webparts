import * as React from 'react';

import { Spinner } from '@fluentui/react-components';
import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

import { useMgtAgendaStyles } from './useMgtAgendaStyles';

export const AgendaLoadingTemplate: React.FunctionComponent<MgtTemplateProps> = (props: React.PropsWithChildren<MgtTemplateProps>) => {
  const agendaStyles = useMgtAgendaStyles();
  return (
    <div className={agendaStyles.spinnerStyles}>
      <Spinner size="tiny" />
    </div>
  );
};