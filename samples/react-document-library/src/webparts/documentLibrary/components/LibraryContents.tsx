import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { ArrowClockwiseRegular, ArrowDownloadRegular, DocumentRegular, FolderRegular, OpenRegular } from '@fluentui/react-icons';
import { IFileEntry, IFolderEntry, ILibraryContents } from './IFileEntry';
import { formatFileSize, formatModifiedDate, getSafeSharePointDownloadUrl, getSafeSharePointFileUrl } from '../utils/fileUrl';
import styles from './DocumentLibrary.module.scss';

export interface ILibraryContentsProps {
  contents: ILibraryContents;
  rootPath: string;
  webUrl: string;
  showFolders: boolean;
  showFileType: boolean;
  showModifiedDate: boolean;
  onFolderOpen: (folder: IFolderEntry) => void;
  onRefresh: () => void;
}

export function getFileType(fileName: string): string {
  const dot = fileName.lastIndexOf('.');
  return dot > 0 && dot < fileName.length - 1 ? fileName.slice(dot + 1).toUpperCase() : 'File';
}

const FolderRow: React.FunctionComponent<{ folder: IFolderEntry; onOpen: (folder: IFolderEntry) => void }> = props => (
  <div className={styles.tableRow} role="row">
    <div className={styles.nameCell} role="cell">
      <FolderRegular className={styles.itemIcon} aria-hidden="true" />
      <Button appearance="subtle" className={styles.folderButton} onClick={() => props.onOpen(props.folder)}>
        {props.folder.name}
      </Button>
    </div>
    <span role="cell" className={styles.mutedCell}>Folder</span>
    <span role="cell" className={styles.mutedCell}>—</span>
    <span role="cell" className={styles.mutedCell}>—</span>
    <span role="cell" />
  </div>
);

const FileRow: React.FunctionComponent<{
  file: IFileEntry;
  rootPath: string;
  webUrl: string;
  showFileType: boolean;
  showModifiedDate: boolean;
}> = props => {
  let openUrl: string;
  let downloadUrl: string;
  try {
    openUrl = getSafeSharePointFileUrl(props.file.serverRelativeUrl, props.webUrl, props.rootPath);
    downloadUrl = getSafeSharePointDownloadUrl(props.file.serverRelativeUrl, props.webUrl, props.rootPath);
  } catch {
    return (
      <div className={styles.tableRow} role="row">
        <span className={styles.nameCell} role="cell"><DocumentRegular className={styles.itemIcon} aria-hidden="true" />{props.file.name}</span>
        <span className={styles.errorCell} role="cell">Unsafe file URL rejected.</span>
      </div>
    );
  }

  return (
    <div className={styles.tableRow} role="row">
      <div className={styles.nameCell} role="cell">
        <DocumentRegular className={styles.itemIcon} aria-hidden="true" />
        <span title={props.file.name}>{props.file.name}</span>
      </div>
      {props.showFileType && <span role="cell">{getFileType(props.file.name)}</span>}
      {props.showModifiedDate && <span role="cell">{formatModifiedDate(props.file.timeLastModified)}</span>}
      <span role="cell">{formatFileSize(props.file.length)}</span>
      <span role="cell" className={styles.actions}>
        <a className={styles.actionLink} href={openUrl} target="_blank" rel="noreferrer" aria-label={`Open ${props.file.name} in a new tab`}>
          <OpenRegular aria-hidden="true" />
          <span className={styles.visuallyHidden}>Open</span>
        </a>
        <a className={styles.actionLink} href={downloadUrl} download aria-label={`Download ${props.file.name}`}>
          <ArrowDownloadRegular aria-hidden="true" />
          <span className={styles.visuallyHidden}>Download</span>
        </a>
      </span>
    </div>
  );
};

const LibraryContents: React.FunctionComponent<ILibraryContentsProps> = props => {
  const rows = [
    ...(props.showFolders ? props.contents.folders.map(folder => ({ kind: 'folder' as const, item: folder })) : []),
    ...props.contents.files.map(file => ({ kind: 'file' as const, item: file }))
  ];

  return (
    <section aria-label="Library contents">
      <div className={styles.contentsToolbar}>
        <span className={styles.itemCount}>{rows.length} {rows.length === 1 ? 'item' : 'items'}</span>
        <Button appearance="subtle" icon={<ArrowClockwiseRegular aria-hidden="true" />} onClick={props.onRefresh}>
          Refresh
        </Button>
      </div>
      <p className={styles.previewNote} role="status">Inline preview is not supported. Open a file in SharePoint to view it.</p>
      {rows.length === 0 ? (
        <div className={styles.emptyState} role="status">This folder is empty.</div>
      ) : (
        <div className={styles.table} role="table" aria-label="Files and folders">
          <div className={styles.tableHeader} role="row">
            <span role="columnheader">Name</span>
            {props.showFileType && <span role="columnheader">Type</span>}
            {props.showModifiedDate && <span role="columnheader">Modified</span>}
            <span role="columnheader">Size</span>
            <span role="columnheader" aria-label="Actions" />
          </div>
          {rows.map(row => row.kind === 'folder' ? (
            <FolderRow key={row.item.serverRelativeUrl} folder={row.item} onOpen={props.onFolderOpen} />
          ) : (
            <FileRow
              key={row.item.serverRelativeUrl}
              file={row.item}
              rootPath={props.rootPath}
              webUrl={props.webUrl}
              showFileType={props.showFileType}
              showModifiedDate={props.showModifiedDate}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default LibraryContents;
