import * as React from 'react';

import { FileList } from '@microsoft/mgt-react/dist/es6/spfx';

import { useUtils } from '../../hooks/useUtils';
import { FileTemplate } from './FileTemplate';
import { LoadingTemplate } from './LoadingTemplate';
import { NoDataTemplate } from './NoDataTemplate';
import { useMyFilesStyles } from './useMyFilesStyles';

export interface IFilesProps {}

export const Files: React.FunctionComponent<IFilesProps> = (props: React.PropsWithChildren<IFilesProps>) => {
  const styles = useMyFilesStyles();
  const { getContainerHeight} = useUtils();

  return (
    <>
      <div className={styles.centerContainer}style={{height: getContainerHeight()}}>
        <FileList id="fileList" className={styles.fileList} >
          <FileTemplate template="file" />
          <LoadingTemplate template="loading" />
          <NoDataTemplate template="no-data" />
        </FileList>
      </div>
    </>
  );
};
