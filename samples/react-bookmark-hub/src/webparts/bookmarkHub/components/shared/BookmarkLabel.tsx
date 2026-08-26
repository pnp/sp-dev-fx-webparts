import * as React from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { IBookmarkLabel } from '../../../../services/models/IBookmarkLabel';
import styles from './BookmarkLabel.module.scss';

export interface IBookmarkLabelProps {
  label: IBookmarkLabel;
  onRemove?: (label: IBookmarkLabel) => void;
  showRemove?: boolean;
}


const getContrastTextColor = (hexColor: string): string => {
  const hex = hexColor.replace('#', '');
  
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

export const BookmarkLabel: React.FC<IBookmarkLabelProps> = ({ 
  label, 
  onRemove, 
  showRemove = true 
}) => {
  const textColor = getContrastTextColor(label.color);
  
  return (
    <div 
      className={styles.labelPill}
      style={{ 
        backgroundColor: label.color,
        color: textColor
      }}
      title={label.description || label.name}
    >
      <span className={styles.labelText}>{label.name}</span>
      {showRemove && onRemove && (
        <IconButton
          iconProps={{ iconName: 'Cancel' }}
          className={styles.removeButton}
          styles={{ 
            root: { 
              color: textColor,
              height: 16,
              width: 16
            },
            icon: {
              fontSize: 10
            }
          }}
          ariaLabel={`Remove ${label.name} label`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(label);
          }}
        />
      )}
    </div>
  );
};
