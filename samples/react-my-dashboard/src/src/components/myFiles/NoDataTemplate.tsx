import * as React from 'react';

import * as strings from 'DashBoardWebPartStrings';

import { tokens } from '@fluentui/react-components';
import { DocumentBulletListMultiple24Filled } from '@fluentui/react-icons';
import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

import { NoData } from '../noData/NoData';

export interface IComponentProps {}

export const NoDataTemplate: React.FunctionComponent<MgtTemplateProps> = (props: React.PropsWithChildren<MgtTemplateProps>) => {
        return (
          <>
            <NoData message={strings.NoFiles}>
              <DocumentBulletListMultiple24Filled primaryFill={tokens.colorNeutralStroke1} style={{ width: 60, height: 60 }} />
            </NoData>
          </>
        );  
};