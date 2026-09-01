import * as React from 'react';
import { Spinner, Title2 } from '@fluentui/react-components';
import { IFolderEntry, ILibraryContents } from './IFileEntry';
import { IDocumentLibraryProps } from './IDocumentLibraryProps';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import LibraryContents from './LibraryContents';
import { DocumentLibraryError, documentLibraryError } from '../services/documentLibraryError';
import { resolveFolderPath } from '../utils/fileUrl';
import styles from './DocumentLibrary.module.scss';

const errorCopy: Record<DocumentLibraryError['code'], string> = {
  accessDenied: 'Access denied. Ask a site owner for read permission to this library.',
  throttled: 'SharePoint is throttling requests. Wait a moment, then refresh.',
  notFound: 'The configured library or folder was not found. Check the root path or library title.',
  invalidPath: 'The configured path is invalid or outside the configured library root.',
  generic: 'Something went wrong while loading the library. Refresh and try again.'
};

const DocumentLibrary: React.FunctionComponent<IDocumentLibraryProps> = props => {
  const [rootPath, setRootPath] = React.useState<string>();
  const [currentPath, setCurrentPath] = React.useState<string>();
  const [contents, setContents] = React.useState<ILibraryContents | undefined>();
  const [error, setError] = React.useState<DocumentLibraryError>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [status, setStatus] = React.useState('Loading library contents.');
  const requestNumber = React.useRef(0);

  const load = React.useCallback(async (root: string, path: string): Promise<void> => {
    const request = ++requestNumber.current;
    setIsLoading(true);
    setError(undefined);
    setStatus('Loading library contents.');
    try {
      const result = await props.service.getContents(root, path, props.pageSize, props.showFolders);
      if (request !== requestNumber.current) return;
      setContents(result);
      setCurrentPath(result.path);
      setIsLoading(false);
      setStatus(`${result.folders.length + result.files.length} items loaded.`);
    } catch (reason) {
      if (request !== requestNumber.current) return;
      const libraryError = documentLibraryError(reason);
      setError(libraryError);
      setContents(undefined);
      setIsLoading(false);
      setStatus(errorCopy[libraryError.code]);
    }
  }, [props.pageSize, props.service, props.showFolders]);

  React.useEffect(() => {
    let active = true;
    setRootPath(undefined);
    setCurrentPath(undefined);
    setContents(undefined);
    setIsLoading(true);
    setError(undefined);
    props.service.resolveLibraryRoot(props.libraryTitle, props.libraryRootPath)
      .then(root => {
        if (!active) return;
        setRootPath(root);
        setCurrentPath(root);
        return load(root, root);
      })
      .catch(reason => {
        if (!active) return;
        const libraryError = documentLibraryError(reason);
        setError(libraryError);
        setIsLoading(false);
        setStatus(errorCopy[libraryError.code]);
      });
    return () => {
      active = false;
      requestNumber.current += 1;
    };
  }, [load, props.libraryRootPath, props.libraryTitle, props.service]);

  const navigateTo = React.useCallback((path: string) => {
    if (!rootPath) return;
    try {
      const safePath = resolveFolderPath(rootPath, path);
      setCurrentPath(safePath);
      load(rootPath, safePath).catch(() => { /* load handles errors */ });
    } catch (reason) {
      const libraryError = documentLibraryError(reason);
      setError(libraryError);
      setStatus(errorCopy[libraryError.code]);
    }
  }, [load, rootPath]);

  const refresh = React.useCallback(() => {
    if (rootPath && currentPath) load(rootPath, currentPath).catch(() => { /* load handles errors */ });
  }, [currentPath, load, rootPath]);

  const title = props.webPartTitle.trim() || props.libraryTitle.trim() || 'Document library';
  return (
    <div className={styles.documentLibrary}>
      <Title2 className={styles.title}>{title}</Title2>
      <div className={styles.liveRegion} aria-live="polite" aria-atomic="true">{status}</div>
      {rootPath && currentPath && <FolderBreadcrumbs rootPath={rootPath} currentPath={currentPath} rootLabel={props.libraryTitle || 'Library'} onNavigate={navigateTo} />}
      {isLoading ? (
        <div className={styles.loadingState} role="status"><Spinner label="Loading library contents" /></div>
      ) : error ? (
        <div className={styles.errorState} role="alert">
          <strong>{errorCopy[error.code]}</strong>
          <button type="button" className={styles.retryButton} onClick={refresh}>Refresh</button>
        </div>
      ) : contents && rootPath ? (
        <LibraryContents
          contents={contents}
          rootPath={rootPath}
          webUrl={props.context.pageContext.web.absoluteUrl}
          showFolders={props.showFolders}
          showFileType={props.showFileType}
          showModifiedDate={props.showModifiedDate}
          onFolderOpen={(folder: IFolderEntry) => navigateTo(folder.serverRelativeUrl)}
          onRefresh={refresh}
        />
      ) : null}
    </div>
  );
};

export default DocumentLibrary;
