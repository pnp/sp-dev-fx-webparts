import * as React from 'react';
import { Body1, Caption1, Divider } from '@fluentui/react-components';
import { ExternalLink } from '../../../../../components/ExternalLink';
import { IFileInfo } from '../../../../../common/types';
import { formatDate } from '../../../../../common/utils';
import styles from '../dashboard.module.scss';

export interface IRecentFilesProps {
  files: IFileInfo[];
}

const RecentFiles: React.FC<IRecentFilesProps> = ({ files }) => {
  if (files.length === 0) {
    return <Body1>No recently modified files to show.</Body1>;
  }

  return (
    <div className={styles.topSites}>
      {files.map((file, index) => (
        <React.Fragment key={file.id}>
          {index > 0 && <Divider />}
          <div className={styles.topSiteRow}>
            <div className={styles.topSiteText}>
              {file.webUrl ? (
                <ExternalLink href={file.webUrl} ariaLabel={`Open ${file.name} in new tab`}>
                  {file.name}
                </ExternalLink>
              ) : file.name}
              <Caption1>{file.containerName ?? file.type ?? ''}</Caption1>
            </div>
            <Caption1>{formatDate(file.modified)}</Caption1>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default RecentFiles;