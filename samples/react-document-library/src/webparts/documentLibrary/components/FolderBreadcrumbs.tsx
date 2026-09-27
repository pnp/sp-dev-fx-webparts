import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { ChevronRightRegular, HomeRegular } from '@fluentui/react-icons';
import { normalizeServerRelativePath, resolveFolderPath } from '../utils/fileUrl';
import styles from './DocumentLibrary.module.scss';

export interface IBreadcrumbItem {
  key: string;
  label: string;
  path: string;
}

export function createBreadcrumbItems(rootPath: string, currentPath: string, rootLabel: string): IBreadcrumbItem[] {
  const root = normalizeServerRelativePath(rootPath);
  const current = resolveFolderPath(root, currentPath);
  const rootParts = root === '/' ? [] : root.split('/').filter(Boolean);
  const currentParts = current === '/' ? [] : current.split('/').filter(Boolean);
  const items: IBreadcrumbItem[] = [{ key: root, label: rootLabel || 'Library', path: root }];

  for (let index = rootParts.length; index < currentParts.length; index += 1) {
    const path = `/${currentParts.slice(0, index + 1).join('/')}`;
    items.push({ key: path, label: currentParts[index], path });
  }
  return items;
}

export interface IFolderBreadcrumbsProps {
  rootPath: string;
  currentPath: string;
  rootLabel: string;
  onNavigate: (path: string) => void;
}

const FolderBreadcrumbs: React.FunctionComponent<IFolderBreadcrumbsProps> = props => {
  let items: IBreadcrumbItem[] = [];
  try {
    items = createBreadcrumbItems(props.rootPath, props.currentPath, props.rootLabel);
  } catch {
    return null;
  }

  return (
    <nav className={styles.breadcrumbs} aria-label="Folder path">
      <ol>
        {items.map((item, index) => (
          <li key={item.key}>
            {index > 0 && <ChevronRightRegular aria-hidden="true" />}
            {index === items.length - 1 ? (
              <span aria-current="page" className={styles.currentBreadcrumb}>
                {index === 0 && <HomeRegular aria-hidden="true" />}
                {item.label}
              </span>
            ) : (
              <Button
                appearance="subtle"
                size="small"
                icon={index === 0 ? <HomeRegular aria-hidden="true" /> : undefined}
                onClick={() => props.onNavigate(item.path)}
                aria-label={`Go to ${item.label}`}
              >
                {item.label}
              </Button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default FolderBreadcrumbs;
