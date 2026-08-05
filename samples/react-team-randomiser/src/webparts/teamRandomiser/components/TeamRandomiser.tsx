import * as React from 'react';
import { useState } from 'react';
import {
  DefaultButton,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  Text,
} from '@fluentui/react';
import { ITeamRandomiserProps } from './ITeamRandomiserProps';
import { buildGroups } from '../utils/grouping';
import GroupCard from './GroupCard';
import styles from './TeamRandomiser.module.scss';

const GROUP_ACCENT_COLORS = [
  '#0078d4',
  '#107C10',
  '#008272',
  '#5C2D91',
  '#B4009E',
  '#CA5010',
];

const TeamRandomiser: React.FC<ITeamRandomiserProps> = (props) => {
  const [groups, setGroups] = useState<string[][]>(() =>
    buildGroups(props.names, props.groupSize)
  );
  const [isShuffling, setIsShuffling] = useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const shuffle = (): void => {
    if (isShuffling) return;
    setIsShuffling(true);
    timerRef.current = setTimeout(() => {
      setGroups(buildGroups(props.names, props.groupSize));
      setIsShuffling(false);
    }, 600);
  };

  React.useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const validNames = props.names.filter(n => n.trim() !== '');
  const hasNames = validNames.length > 1;

  return (
    <div className={styles.container}>
      {props.title && (
        <Text variant="xLarge" block>{props.title}</Text>
      )}
      <div className={styles.toolbar}>
        {hasNames && (
          <Text variant="small" className={styles.toolbarSubtitle}>
            {validNames.length} {validNames.length === 1 ? 'person' : 'people'} &middot; {props.groupSize} per group
          </Text>
        )}
        <div className={styles.toolbarButton}>
          {isShuffling ? (
            <Spinner size={SpinnerSize.small} label="Shuffling..." labelPosition="right" />
          ) : (
            <DefaultButton
              text="Shuffle Groups"
              iconProps={{ iconName: 'Sync' }}
              onClick={shuffle}
              disabled={!hasNames}
            />
          )}
        </div>
      </div>
      {!hasNames ? (
        <div className={styles.emptyState}>
          <MessageBar messageBarType={MessageBarType.info} isMultiline={false}>
            Add names in the property pane to get started.
          </MessageBar>
        </div>
      ) : (
        <div className={styles.grid}>
          {groups.map((members, i) => (
            <GroupCard
              key={i}
              groupNumber={i + 1}
              members={members}
              accentColor={GROUP_ACCENT_COLORS[i % GROUP_ACCENT_COLORS.length]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamRandomiser;
