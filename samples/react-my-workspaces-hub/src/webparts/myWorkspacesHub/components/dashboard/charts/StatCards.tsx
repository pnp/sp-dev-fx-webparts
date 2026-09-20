import * as React from 'react';
import {
  Card,
  Caption1,
  Title2,
  Body1
} from '@fluentui/react-components';
import {
  GlobeRegular,
  PeopleTeamRegular,
  BuildingMultipleRegular,
  HistoryRegular
} from '@fluentui/react-icons';
import styles from '../dashboard.module.scss';
import { IStatCardsProps, IStat } from './IStatCardsProps';

const StatCards: React.FC<IStatCardsProps> = ({ analytics }) => {
  const stats: IStat[] = [
    {
      key: 'total',
      label: 'Total sites',
      value: analytics.total,
      caption: 'Sites you can access',
      icon: <GlobeRegular />
    },
    {
      key: 'team',
      label: 'Team-connected',
      value: analytics.withTeam,
      caption: 'Backed by a Microsoft Team',
      icon: <PeopleTeamRegular />
    },
    {
      key: 'hub',
      label: 'Hub sites',
      value: analytics.hubSites,
      caption: 'Act as navigation hubs',
      icon: <BuildingMultipleRegular />
    },
    {
      key: 'recent',
      label: 'Active (30d)',
      value: analytics.recentlyModified,
      caption: 'Modified in last 30 days',
      icon: <HistoryRegular />
    }
  ];

  return (
    <div className={styles.statRow}>
      {stats.map((stat, index) => (
        <Card
          key={stat.key}
          className={styles.statCard}
          style={{ '--stat-accent': `var(--dashboard-stat-${index})` } as React.CSSProperties}
        >
          <div className={styles.statAccent} />
          <div className={styles.statHeader}>
            <span className={styles.statIcon}>{stat.icon}</span>
            <Caption1 className={styles.statLabel}>{stat.label}</Caption1>
          </div>
          <Title2>{stat.value}</Title2>
          <Body1 className={styles.statCaption}>{stat.caption}</Body1>
        </Card>
      ))}
    </div>
  );
};

export default StatCards;
