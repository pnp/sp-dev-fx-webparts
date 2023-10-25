import * as React from 'react';

import {
  Badge,
  Caption1,
} from '@fluentui/react-components';

import { useImportanceTagsStyles } from './useImportanceTagsStyles';

export interface IImportanceTagsProps {}

export const ImportanceTags: React.FunctionComponent<IImportanceTagsProps> = (
  props: React.PropsWithChildren<IImportanceTagsProps>
) => {
  const importanceTagsStyles = useImportanceTagsStyles();
  return (
    <>
      <div className={importanceTagsStyles.root}>
        <Caption1>Importance</Caption1>
        <div className={importanceTagsStyles.badges}>
          <Badge color="brand" appearance="tint">Normal</Badge>
          <Badge color="danger" appearance="tint">High</Badge>
          <Badge color="informative" appearance="tint">Low</Badge>
        </div>
      </div>
    </>
  );
};
