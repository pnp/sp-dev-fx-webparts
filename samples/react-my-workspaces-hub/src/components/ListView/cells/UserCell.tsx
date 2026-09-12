import * as React from 'react';
import {
  Persona,
  PopoverSurface,
  Popover,
  PopoverTrigger
} from '@fluentui/react-components';
import { useUserCellStyles } from './UserCell.styles';
import { UserHoverContent } from './UserHoverContent';
import type { IUserCellProps } from './UserCell.types';

/** Renders one or more users using Fluent `Persona` with optional SP-style hover card. */
export const UserCell: React.FC<IUserCellProps> = ({
  users,
  showAvatar = true,
  showSecondary = true,
  showHoverCard = true,
  avatarSize = 24
}) => {
  const styles = useUserCellStyles();
  if (!users.length) return null;
  return (
    <span className={styles.inlineList}>
      {users.map((user, idx) => {
        const persona = (
          <Persona
            name={user.displayName}
            secondaryText={showSecondary ? (user.jobTitle ?? user.email) : undefined}
            avatar={showAvatar ? { image: user.imageUrl ? { src: user.imageUrl } : undefined } : { hidden: true }}
            size={avatarSize <= 24 ? 'small' : avatarSize <= 32 ? 'medium' : 'large'}
            textPosition="after"
          />
        );
        if (!showHoverCard) {
          return <span key={`${user.id ?? user.email ?? user.displayName}-${idx}`}>{persona}</span>;
        }
        return (
          <Popover key={`${user.id ?? user.email ?? user.displayName}-${idx}`} openOnHover mouseLeaveDelay={150} positioning="below-start" withArrow>
            <PopoverTrigger disableButtonEnhancement>
              <span className={styles.trigger} role="button" tabIndex={0}>
                {persona}
              </span>
            </PopoverTrigger>
            <PopoverSurface tabIndex={-1}>
              <UserHoverContent user={user} />
            </PopoverSurface>
          </Popover>
        );
      })}
    </span>
  );
};

export type { IUserCellProps } from './UserCell.types';

