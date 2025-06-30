import * as React from 'react';

import { FileList } from '@microsoft/mgt-react/dist/es6/spfx';

import { FilesTemplate } from './FilesTemplate';
import { LoadingTemplate } from './LoadingTemplate';
import { NoDataTemplate } from './NoDataTemplate';
import { useMyFilesStyles } from './useMyFilesStyles';

export interface IUsedProps {}

export const Used: React.FunctionComponent<IUsedProps> = (props: React.PropsWithChildren<IUsedProps>) => {
  const styles = useMyFilesStyles();
  return (
    <>  
        <FileList id="fileListUsed" className={styles.fileList} insightType="used">
          <FilesTemplate template="default" />
          <LoadingTemplate template="loading" />
          <NoDataTemplate template="no-data" />
        </FileList>
    </>
  );
};
