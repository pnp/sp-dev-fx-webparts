import * as React from 'react';

import { Spinner } from '@fluentui/react-components';
import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

import { useMyFilesStyles } from './useMyFilesStyles';

export const LoadingTemplate: React.FunctionComponent<MgtTemplateProps> = (props: React.PropsWithChildren<MgtTemplateProps>) => {
    const styles = useMyFilesStyles();
    return (
      <div className={styles.spinnerStyles}>
        <Spinner size="tiny" />
      </div>
    );
};
