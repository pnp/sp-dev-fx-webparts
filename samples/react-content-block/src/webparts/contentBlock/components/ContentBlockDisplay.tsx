import * as React from 'react';
import { useState } from 'react';
import {
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize
} from '@fluentui/react';

import { IContentBlockProps } from './IContentBlockProps';
import { IContentBlockItem } from '../models/IContentBlockItem';
import { SPService } from '../services/SPService';
import styles from './ContentBlock.module.scss';

const ContentBlockDisplay: React.FC<IContentBlockProps> = (props) => {
  const { context, listId, layout } = props;

  const [spService] = useState(() => new SPService(context));
  const [items, setItems] = useState<IContentBlockItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isConfigured = !!listId;

  const loadItems = async (): Promise<void> => {
    if (!listId) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    console.log('ContentBlockDisplay: Loading items for list:', listId);
    setIsLoading(true);
    setError(null);

    try {
      await spService.ensureColumns(listId);
      const validation = await spService.validateListStructure(listId);

      if (!validation.isValid) {
        console.error('ContentBlockDisplay: List validation failed', validation.missingColumns);
        setError(
          `Selected list is missing required columns: ${validation.missingColumns.join(', ')}`
        );
        setItems([]);
        return;
      }

      const activeItems = await spService.getActiveItems(listId);
      console.log('ContentBlockDisplay: Loaded items:', activeItems.length);
      setItems(activeItems);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('ContentBlockDisplay: Error loading items:', msg);
      setError(msg);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (listId) {
      loadItems().catch(err => {
        console.error('Error loading items:', err);
      });
    } else {
      setIsLoading(false);
      setItems([]);
    }
  }, [listId, layout]);

  if (!isConfigured) {
    return (
      <div className={styles.contentBlock}>
        <div className={styles.notConfigured}>
          <span>Edit the page and configure this web part.</span>
        </div>
      </div>
    );
  }

  const layoutClass =
    layout === '75-25'
      ? styles.layout75_25
      : layout === '25-75'
      ? styles.layout25_75
      : styles.layout50_50;

  return (
    <div className={styles.contentBlock}>
      {error && (
        <MessageBar messageBarType={MessageBarType.error} className={styles.messageBar}>
          {error}
        </MessageBar>
      )}

      {isLoading ? (
        <div className={styles.loadingWrapper}>
          <Spinner size={SpinnerSize.medium} label="Loading content..." />
        </div>
      ) : items.length === 0 ? (
        <MessageBar messageBarType={MessageBarType.info} className={styles.messageBar}>
          No active content available.
        </MessageBar>
      ) : (
        <div className={styles.itemsWrapper}>
          {items.map(item => (
            <div
              key={item.Id}
              className={`${styles.itemRow} ${layoutClass}`}
            >

              {/* LEFT PANEL WRAPPER (adds white gap) */}
              <div className={styles.itemPanelWrapper}>
                <div className={styles.itemPanel}>
                  <h2 className={styles.title}>{item.Title}</h2>
                  <div
                    className={styles.body}
                    dangerouslySetInnerHTML={{ __html: item.Description }}
                  />
                </div>
              </div>

              {/* RIGHT PANEL WRAPPER */}
              <div className={styles.itemPanelWrapper}>
                <div className={styles.itemPanel}>
                  <h2 className={styles.title}>{item.Title2}</h2>
                  <div
                    className={styles.body}
                    dangerouslySetInnerHTML={{ __html: item.Description2 }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentBlockDisplay;
