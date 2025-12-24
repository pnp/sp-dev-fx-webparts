import * as React from 'react';
import { useState } from 'react';
import { IconButton, TooltipHost } from '@fluentui/react';
import { DisplayMode } from '@microsoft/sp-core-library';

import { IContentBlockProps } from './IContentBlockProps';
import ContentBlockDisplay from './ContentBlockDisplay';
import ContentBlockManagerPanel from './ContentBlockManagerPanel';
import styles from './ContentBlock.module.scss';

const ContentBlock: React.FC<IContentBlockProps> = (props) => {

  const { context, displayMode, listId, layout, onListChange, onLayoutChange } = props;

  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const onManagerDismiss = (changesSaved: boolean): void => {
    setIsManagerOpen(false);

    if (changesSaved) {
      // Force refresh by incrementing key
      setRefreshKey(k => k + 1);
    }
  };

  return (
    <div className={styles.wrapper}>

      {/* Always show gear in edit mode */}
      {displayMode === DisplayMode.Edit && (
        <div className={styles.managerIcon}>
          <TooltipHost content="Open Content Block Manager">
            <IconButton
              iconProps={{ iconName: 'Settings' }}
              ariaLabel="Manage content"
              onClick={() => setIsManagerOpen(true)}
            />
          </TooltipHost>
        </div>
      )}

      {/* READ VIEW - Key forces remount on changes */}
      <ContentBlockDisplay
        key={refreshKey}
        context={context}
        displayMode={displayMode}
        listId={listId}
        layout={layout}
      />

      {/* PANEL ALWAYS ALLOWED */}
      <ContentBlockManagerPanel
        context={context}
        listId={listId ?? ""}
        layout={layout || '50-50'}
        isOpen={isManagerOpen}
        onDismiss={onManagerDismiss}
        onListChange={id => onListChange && onListChange(id)}
        onLayoutChange={l => onLayoutChange && onLayoutChange(l)}
      />
    </div>
  );
};

export default ContentBlock;