import * as React from 'react';
import { Avatar, Badge, Caption1, Text } from '@fluentui/react-components';
import { MailRegular } from '@fluentui/react-icons';
import { useUserHoverContentStyles } from './UserHoverContent.styles';
import type { IUserHoverContentProps } from './UserCell.types';

/** SharePoint-style profile card shown on hover by `UserCell`. */
export const UserHoverContent: React.FC<IUserHoverContentProps> = ({ user }) => {
  const styles = useUserHoverContentStyles();
  return (
    <div className={styles.hoverCard}>
      <div className={styles.hoverHeader}>
        <Avatar name={user.displayName} image={user.imageUrl ? { src: user.imageUrl } : undefined} size={48} />
        <div className={styles.hoverNameBlock}>
          <Text className={styles.hoverName}>{user.displayName}</Text>
          {user.jobTitle && <Caption1 className={styles.hoverMeta}>{user.jobTitle}</Caption1>}
          {user.department && <Caption1 className={styles.hoverMeta}>{user.department}</Caption1>}
        </div>
      </div>
      {(user.email || user.loginName) && (
        <div className={styles.hoverDetails}>
          {user.email && (
            <a href={`mailto:${user.email}`} className={styles.detailRow}>
              <MailRegular />
              <span>{user.email}</span>
            </a>
          )}
          {!user.email && user.loginName && (
            <div className={styles.detailRow}>
              <Badge appearance="outline" size="small">{user.loginName}</Badge>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
