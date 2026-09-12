import * as React from 'react';
import { Button, Tooltip } from '@fluentui/react-components';
import { StarFilled, StarRegular } from '@fluentui/react-icons';
import { ISiteInfo } from '../../../../common/types';
import styles from './siteCells.module.scss';

export interface IFollowStarCellProps {
  site: ISiteInfo;
  followed: boolean;
  color: string;
  onToggle: (site: ISiteInfo) => void;
}

/** One-click follow / unfollow toggle rendered as the leading star column. */
const FollowStarCell: React.FC<IFollowStarCellProps> = ({ site, followed, color, onToggle }) => {
  const label = followed ? `Unfollow ${site.title}` : `Follow ${site.title}`;

  return (
    <div className={styles.starCell}>
      <Tooltip content={followed ? 'Unfollow site' : 'Follow site'} relationship="label" withArrow>
        <Button
          appearance="transparent"
          size="small"
          aria-label={label}
          aria-pressed={followed}
          icon={followed ? <StarFilled style={{ color }} /> : <StarRegular />}
          className={styles.starButton}
          onClick={() => onToggle(site)}
        />
      </Tooltip>
    </div>
  );
};

export default FollowStarCell;
