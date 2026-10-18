import * as React from 'react';
import {
  IconButton,
  Icon,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Callout,
  DirectionalHint
} from '@fluentui/react';
import styles from './BirthdayCalendarView.module.scss';
import type { IBirthdayCalendarViewProps } from './IBirthdayCalendarViewProps';
import type { IBirthday } from '../models/IBirthday';
import { BirthdayService } from '../services/BirthdayService';
import {
  buildMonthGrid,
  groupBirthdaysByDay,
  getUpcomingBirthdays,
  getAccentIndex
} from '../utils/calendarUtils';
import type { ICalendarCell, IUpcomingBirthday } from '../utils/calendarUtils';
import PersonCard from './PersonCard';

const WEEKDAY_LABELS: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const SHORT_MONTH_LABELS: string[] = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/** Indexed by getAccentIndex(); a plain array keeps the generated style typings happy. */
const ACCENT_CLASSES: string[] = [styles.accent0, styles.accent1, styles.accent2, styles.accent3];

function accentClass(name: string): string {
  return ACCENT_CLASSES[getAccentIndex(name)];
}

const MAX_VISIBLE_BIRTHDAYS: number = 3;
const UPCOMING_COUNT: number = 5;
const UPCOMING_WINDOW_DAYS: number = 60;

interface ISelectedPerson {
  birthday: IBirthday;
  target: HTMLElement | string;
}

function formatWhen(entry: IUpcomingBirthday): string {
  if (entry.daysAway === 0) {
    return 'Today';
  }
  if (entry.daysAway === 1) {
    return 'Tomorrow';
  }
  return `${SHORT_MONTH_LABELS[entry.date.getMonth()]} ${entry.date.getDate()}`;
}

const BirthdayCalendarView: React.FC<IBirthdayCalendarViewProps> = (props: IBirthdayCalendarViewProps) => {
  const {
    siteUrl,
    listName,
    dateFieldName,
    personFieldName,
    startWeekOnMonday,
    isDarkTheme,
    spHttpClient
  } = props;

  const [viewDate, setViewDate] = React.useState<Date>(new Date());
  const [birthdays, setBirthdays] = React.useState<IBirthday[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [openDayIndex, setOpenDayIndex] = React.useState<number | undefined>(undefined);
  const [selectedPerson, setSelectedPerson] = React.useState<ISelectedPerson | undefined>(undefined);

  const instanceId: string = React.useMemo(
    () => `bcv-${Math.random().toString(36).slice(2, 9)}`,
    []
  );

  React.useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(undefined);

    BirthdayService.getBirthdays(spHttpClient, siteUrl, listName, dateFieldName, personFieldName)
      .then((results: IBirthday[]) => {
        if (!isCancelled) {
          setBirthdays(results);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!isCancelled) {
          // The raw REST body is useful when debugging but not to a reader of the page.
          console.error('[BirthdayCalendarView] Could not load birthdays.', err);
          setError(
            `Could not load the "${listName}" list. Check the web part settings, ` +
              `and that you have permission to read the list.`
          );
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [siteUrl, listName, dateFieldName, personFieldName, spHttpClient]);

  const year: number = viewDate.getFullYear();
  const month: number = viewDate.getMonth();
  const firstDayOfWeek: number = startWeekOnMonday ? 1 : 0;

  const birthdaysByDay: Map<number, IBirthday[]> = React.useMemo(
    () => groupBirthdaysByDay(birthdays, year, month),
    [birthdays, year, month]
  );

  const cells: ICalendarCell[] = React.useMemo(
    () => buildMonthGrid(year, month, birthdaysByDay, firstDayOfWeek),
    [year, month, birthdaysByDay, firstDayOfWeek]
  );

  const upcoming: IUpcomingBirthday[] = React.useMemo(
    () => getUpcomingBirthdays(birthdays, new Date(), UPCOMING_COUNT, UPCOMING_WINDOW_DAYS),
    [birthdays]
  );

  const weekdayLabels: string[] = React.useMemo(
    () => WEEKDAY_LABELS.slice(firstDayOfWeek).concat(WEEKDAY_LABELS.slice(0, firstDayOfWeek)),
    [firstDayOfWeek]
  );

  const goToPreviousMonth = (): void => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = (): void => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const goToToday = (): void => {
    setViewDate(new Date());
  };

  /**
   * `anchorSelector` is set for pills shown inside the "+N more" callout: that callout closes
   * when the card opens, so the card anchors to the still-mounted "+N more" button instead.
   */
  const renderBirthdayPill = (bday: IBirthday, anchorSelector?: string): JSX.Element => (
    <button
      type="button"
      className={`${styles.birthdayItem} ${accentClass(bday.name)}`}
      title={bday.name}
      onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedPerson({ birthday: bday, target: anchorSelector || ev.currentTarget });
        if (anchorSelector) {
          setOpenDayIndex(undefined);
        }
      }}
    >
      <Icon iconName="Cake" className={styles.birthdayIcon} />
      <span className={styles.birthdayName}>{bday.name}</span>
    </button>
  );

  const rootClassName: string = `${styles.birthdayCalendarView} ${isDarkTheme ? styles.darkTheme : ''}`;

  return (
    <section className={rootClassName}>
      <div className={styles.header}>
        <IconButton
          iconProps={{ iconName: 'ChevronLeft' }}
          title="Previous month"
          ariaLabel="Previous month"
          onClick={goToPreviousMonth}
        />
        <div className={styles.monthTitle}>
          <button className={styles.monthTitleButton} onClick={goToToday} title="Go to current month">
            {MONTH_LABELS[month]} {year}
          </button>
        </div>
        <IconButton
          iconProps={{ iconName: 'ChevronRight' }}
          title="Next month"
          ariaLabel="Next month"
          onClick={goToNextMonth}
        />
      </div>

      {error && (
        <MessageBar messageBarType={MessageBarType.error}>
          {error}
        </MessageBar>
      )}

      {loading ? (
        <div className={styles.loading}>
          <Spinner size={SpinnerSize.medium} label="Loading birthdays..." />
        </div>
      ) : (
        <>
          {upcoming.length > 0 && (
            <div className={styles.upcoming}>
              <div className={styles.upcomingTitle}>Coming up</div>
              <ul className={styles.upcomingList}>
                {upcoming.map((entry: IUpcomingBirthday) => (
                  <li key={`${entry.birthday.id}-${entry.date.getTime()}`}>
                    <button
                      type="button"
                      className={`${styles.upcomingPill} ${accentClass(entry.birthday.name)}`}
                      onClick={(ev: React.MouseEvent<HTMLButtonElement>) =>
                        setSelectedPerson({ birthday: entry.birthday, target: ev.currentTarget })
                      }
                    >
                      <Icon iconName="Cake" className={styles.birthdayIcon} />
                      <span className={styles.upcomingWhen}>{formatWhen(entry)}</span>
                      <span className={styles.upcomingSeparator}>&middot;</span>
                      <span>{entry.birthday.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.grid}>
            {weekdayLabels.map((label) => (
              <div key={label} className={styles.weekdayCell}>{label}</div>
            ))}
            {cells.map((cell, index) => {
              const visibleBirthdays: IBirthday[] = cell.birthdays.slice(0, MAX_VISIBLE_BIRTHDAYS);
              const hiddenCount: number = cell.birthdays.length - visibleBirthdays.length;
              const moreButtonId: string = `${instanceId}-more-${index}`;

              return (
                <div
                  key={index}
                  className={`${styles.dayCell} ${cell.inCurrentMonth ? '' : styles.outsideMonth} ${cell.isToday ? styles.today : ''} ${cell.birthdays.length > 0 ? styles.hasBirthday : ''}`}
                >
                  <div className={styles.dayNumber}>{cell.date}</div>
                  {cell.birthdays.length > 0 && (
                    <ul className={styles.birthdayList}>
                      {visibleBirthdays.map((bday) => (
                        <li key={bday.id} className={styles.birthdayListItem}>
                          {renderBirthdayPill(bday)}
                        </li>
                      ))}
                    </ul>
                  )}
                  {hiddenCount > 0 && (
                    <button
                      id={moreButtonId}
                      type="button"
                      className={styles.moreBirthdays}
                      aria-expanded={openDayIndex === index}
                      onClick={() => setOpenDayIndex(openDayIndex === index ? undefined : index)}
                    >
                      +{hiddenCount} more
                    </button>
                  )}
                  {openDayIndex === index && (
                    <Callout
                      target={`#${moreButtonId}`}
                      directionalHint={DirectionalHint.bottomLeftEdge}
                      onDismiss={() => setOpenDayIndex(undefined)}
                      setInitialFocus
                    >
                      <div className={`${styles.calloutBody} ${isDarkTheme ? styles.darkTheme : ''}`}>
                        <div className={styles.calloutTitle}>
                          {MONTH_LABELS[month]} {cell.date} &middot; {cell.birthdays.length} birthdays
                        </div>
                        <ul className={styles.calloutList}>
                          {cell.birthdays.map((bday) => (
                            <li key={bday.id} className={styles.birthdayListItem}>
                              {renderBirthdayPill(bday, `#${moreButtonId}`)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Callout>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {selectedPerson && (
        <PersonCard
          birthday={selectedPerson.birthday}
          birthdayLabel={`${MONTH_LABELS[selectedPerson.birthday.month]} ${selectedPerson.birthday.day}`}
          target={selectedPerson.target}
          siteUrl={siteUrl}
          spHttpClient={spHttpClient}
          isDarkTheme={isDarkTheme}
          accentClassName={accentClass(selectedPerson.birthday.name)}
          onDismiss={() => setSelectedPerson(undefined)}
        />
      )}
    </section>
  );
};

export default BirthdayCalendarView;
