import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import styles from './Library.module.scss';

export interface ITagFilterProps {
  topTags: Array<{ tag: string; count: number }>;
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export const TagFilter: React.FC<ITagFilterProps> = ({
  topTags,
  selectedTag,
  onTagSelect
}) => {
  if (topTags.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.tagRow}>
        <span className={styles.filterLabel}>Filter by tag:</span>

        {selectedTag && (
          <DefaultButton
            className={styles.clearBtn}
            onClick={() => onTagSelect(null)}
            styles={{ label: { fontSize: '8.5px', fontWeight: 600 } }}
          >
            ✕ Clear Filter
          </DefaultButton>
        )}

        {topTags.map(({ tag, count }) => {
          const isSelected = selectedTag === tag;
          return (
            <DefaultButton
              key={tag}
              className={`${styles.tagBtn}${isSelected ? ` ${styles.selected}` : ''}`}
              onClick={() => onTagSelect(isSelected ? null : tag)}
              title={`${count} contract${count > 1 ? 's' : ''}`}
              styles={{ label: { fontSize: '8.5px', fontFamily: 'monospace', fontWeight: isSelected ? 600 : 400 } }}
            >
              {tag}
              <span className={styles.tagCount}>{`(${count})`}</span>
            </DefaultButton>
          );
        })}
      </div>
    </div>
  );
};
