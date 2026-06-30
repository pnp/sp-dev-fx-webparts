import * as React from 'react';
import { Block as BlockType } from '../types';
import styles from '../OfficeBreakout.module.scss';
import {
  DocumentRegular,
  TableRegular,
  VideoRegular,
  PeopleTeamRegular,
  NoteRegular,
  MailRegular
} from '@fluentui/react-icons';

interface BlockProps {
  block: BlockType;
}

// Icon mapping for proper rendering
const getIconElement = (color: string): React.ReactElement => {
  switch (color) {
    case '#2b579a': return React.createElement(DocumentRegular); // Word
    case '#217346': return React.createElement(TableRegular); // Excel
    case '#d24726': return React.createElement(VideoRegular); // PowerPoint
    case '#6264a7': return React.createElement(PeopleTeamRegular); // Teams
    case '#80397b': return React.createElement(NoteRegular); // OneNote
    case '#0078d4': 
      // For multiple blue apps, cycle through different icons
      return React.createElement(MailRegular); // Default to Outlook
    default: return React.createElement(DocumentRegular);
  }
};

export const Block: React.FC<BlockProps> = ({ block }) => {
  if (block.destroyed) {
    return null;
  }

  // Get the CSS class based on the block color/type
  const getBlockClass = (color: string): string => {
    switch (color) {
      case '#2b579a': return styles.wordBlock;
      case '#217346': return styles.excelBlock;
      case '#d24726': return styles.powerpointBlock;
      case '#6264a7': return styles.teamsBlock;
      case '#80397b': return styles.onenoteBlock;
      case '#0078d4': return styles.outlookBlock;
      default: return styles.wordBlock;
    }
  };

  const blockRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (blockRef.current) {
      blockRef.current.style.setProperty('--block-x', `${block.position.x}px`);
      blockRef.current.style.setProperty('--block-y', `${block.position.y}px`);
      blockRef.current.style.setProperty('--block-width', `${block.size.width}px`);
      blockRef.current.style.setProperty('--block-height', `${block.size.height}px`);
    }
  }, [block.position.x, block.position.y, block.size.width, block.size.height]);

  return (
    <div
      ref={blockRef}
      className={`${styles.block} ${getBlockClass(block.color)}`}
    >
      {block.icon || getIconElement(block.color)}
    </div>
  );
};