import * as React from 'react';
import { useState } from 'react';
import { Icon, IconButton, Stack } from '@fluentui/react';
import { IProjectItem } from '../models/IProjectItem';
import styles from './ProjectEditor.module.scss';

export interface IProjectItemProps {
  item: IProjectItem;
  displayMode: 'card' | 'accordion';
  isReadOnly?: boolean;
  onEdit?: (item: IProjectItem) => void;
  onDelete?: (item: IProjectItem) => void;
}

export const ProjectItem: React.FC<IProjectItemProps> = ({ 
  item, 
  displayMode, 
  isReadOnly = false,
  onEdit, 
  onDelete 
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (displayMode === 'card') {
    return (
      <div className={styles.itemCard}>
        <Stack tokens={{ childrenGap: 10 }}>
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
            <h3 className={styles.itemTitle}>{item.Title}</h3>
            {!isReadOnly && onEdit && onDelete && (
              <Stack horizontal tokens={{ childrenGap: 5 }}>
                <IconButton
                  iconProps={{ iconName: 'Edit' }}
                  title="Edit"
                  ariaLabel="Edit"
                  onClick={() => onEdit(item)}
                />
                <IconButton
                  iconProps={{ iconName: 'Delete' }}
                  title="Delete"
                  ariaLabel="Delete"
                  onClick={() => onDelete(item)}
                />
              </Stack>
            )}
          </Stack>
          <div 
            className={styles.itemDescription}
            dangerouslySetInnerHTML={{ __html: item.Description || 'No description' }}
          />
        </Stack>
      </div>
    );
  }

  // Accordion View
  return (
    <div className={styles.accordionItem}>
      <div 
        className={styles.accordionItemHeader}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={styles.accordionItemTitle}>{item.Title}</span>
        <Icon 
          iconName="ChevronRight" 
          className={`${styles.accordionChevron} ${isExpanded ? styles.accordionChevronExpanded : ''}`}
        />
      </div>
      {isExpanded && (
        <div className={styles.accordionItemContent}>
          <div dangerouslySetInnerHTML={{ __html: item.Description || 'No description' }} />
        </div>
      )}
    </div>
  );
};