import * as React from 'react';
import {
  Link,
  makeStyles,
  Menu,
  MenuButton,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuTrigger,
  tokens
} from '@fluentui/react-components';
import { CalendarLtr20Regular } from '@fluentui/react-icons';
import * as strings from 'EventsLayoutsWebPartStrings';
import { DateRangeKey } from '../models';

export const RANGE_LABELS: Record<DateRangeKey, string> = {
  upcoming: strings.RangeUpcoming,
  today: strings.RangeToday,
  week: strings.RangeWeek,
  month: strings.RangeMonth
};

const RANGE_SUMMARIES: Record<DateRangeKey, string> = {
  upcoming: strings.RangeSummaryUpcoming,
  today: strings.RangeSummaryToday,
  week: strings.RangeSummaryWeek,
  month: strings.RangeSummaryMonth
};

const useStyles = makeStyles({
  header: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalL
  },
  heading: { minWidth: 0 },
  title: {
    margin: 0,
    fontSize: tokens.fontSizeBase500,
    lineHeight: tokens.lineHeightBase500,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1
  },
  summary: { margin: 0, fontSize: tokens.fontSizeBase300, color: tokens.colorNeutralForeground3 },
  actions: { display: 'flex', alignItems: 'center', gap: tokens.spacingHorizontalM, marginInlineStart: 'auto' }
});

export interface IEventsHeaderProps {
  title: string;
  range: DateRangeKey;
  showDateFilter: boolean;
  seeAllUrl: string;
  onRangeChange: (range: DateRangeKey) => void;
}

export const EventsHeader: React.FC<IEventsHeaderProps> = ({ title, range, showDateFilter, seeAllUrl, onRangeChange }) => {
  const styles = useStyles();
  const ranges = Object.keys(RANGE_LABELS) as DateRangeKey[];

  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <p className={styles.summary} aria-live="polite">{RANGE_SUMMARIES[range]}</p>
      </div>
      <div className={styles.actions}>
        {showDateFilter && (
          <Menu
            checkedValues={{ range: [range] }}
            onCheckedValueChange={(_, data) => onRangeChange(data.checkedItems[0] as DateRangeKey)}
          >
            <MenuTrigger disableButtonEnhancement>
              <MenuButton shape="circular" icon={<CalendarLtr20Regular />} aria-label={`${strings.DateFilterLabel}: ${RANGE_LABELS[range]}`}>
                {RANGE_LABELS[range]}
              </MenuButton>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                {ranges.map(key => <MenuItemRadio key={key} name="range" value={key}>{RANGE_LABELS[key]}</MenuItemRadio>)}
              </MenuList>
            </MenuPopover>
          </Menu>
        )}
        {seeAllUrl && <Link href={seeAllUrl}>{strings.SeeAll}</Link>}
      </div>
    </div>
  );
};
