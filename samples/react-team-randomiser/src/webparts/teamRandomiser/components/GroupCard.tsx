import * as React from 'react';
import { Text } from '@fluentui/react';
import { IGroupCardProps } from './IGroupCardProps';
import styles from './TeamRandomiser.module.scss';

const GroupCard: React.FC<IGroupCardProps> = ({ groupNumber, members, accentColor }) => (
  <div className={styles.card} style={{ borderLeft: `4px solid ${accentColor}` }}>
    <div className={styles.cardHeader}>
      <Text variant="mediumPlus" className={styles.cardHeaderTitle}>
        Group {groupNumber}
      </Text>
      <span className={styles.cardBadge}>
        {members.length} {members.length === 1 ? 'member' : 'members'}
      </span>
    </div>
    <ul className={styles.memberList}>
      {members.map((name, i) => (
        <li key={i} className={styles.memberItem}>
          <Text variant="medium">{name}</Text>
        </li>
      ))}
    </ul>
  </div>
);

export default GroupCard;
