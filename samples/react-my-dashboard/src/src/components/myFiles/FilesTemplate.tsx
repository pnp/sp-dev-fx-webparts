/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import {
  MgtTemplateProps,
} from '@microsoft/mgt-react/dist/es6/MgtTemplateProps';

import { RenderFileCard } from './RenderFileCard';
import { useMyFilesStyles } from './useMyFilesStyles';

export const FilesTemplate: React.FunctionComponent<MgtTemplateProps> = (
  props: React.PropsWithChildren<MgtTemplateProps>
) => {
  const { files } = props.dataContext;
  const styles = useMyFilesStyles();
  return (
    <div className={styles.centerContainer}>
      {files?.map((file: any, index: number) => {
        // bug workaround
          return <RenderFileCard key={index} file={typeof file === "string" ?  JSON.parse(file) : file } />;
      })}
    </div>
  );
};
