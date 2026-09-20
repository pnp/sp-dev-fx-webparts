import * as React from 'react';
import {
  IconButton,
  Icon,
  SearchBox,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType
} from '@fluentui/react';
import styles from './TeamAvailabilityCalendar.module.scss';
import type { ITeamAvailabilityCalendarProps } from './ITeamAvailabilityCalendarProps';
import type { IAbsence } from '../models/IAbsence';
import { AbsenceService } from '../services/AbsenceService';
import { getMockAbsences } from '../services/mockAbsences';
import {
  buildMonthWeeks,
  buildWeek,
  layoutWeeks,
  layoutSingleWeek,
  getAbsencesForDay,
  getOutThisWeek,
  getAbsenceTypeKey,
  formatDateRange,
  startOfDay,
  addDays
} from '../utils/calendarUtils';
import type { IWeekLayout, IOutEntry } from '../utils/calendarUtils';
import { getTypeColor, getTypeIcon, getTypeLabel } from './absenceTypeVisuals';
import MonthGrid from './MonthGrid';
import AbsenceDetailsPanel from './AbsenceDetailsPanel';

const SUNDAY_REF: Date = new Date(2024, 0, 7); // a known Sunday
const MOCK_CHOICES: string[] = ['Vacation', 'Sick', 'Parental', 'Training', 'Business trip', 'Other'];

interface ISelection {
  title: string;
  absences: IAbsence[];
}

interface ILegendEntry {
  key: string;
  label: string;
}

function buildWeekdayLabels(locale: string, startOnMonday: boolean, showWeekends: boolean): string[] {
  const all: string[] = [];
  for (let i = 0; i < 7; i++) {
    all.push(new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(addDays(SUNDAY_REF, i)));
  }
  if (!showWeekends) {
    return all.slice(1, 6); // Mon..Fri
  }
  return startOnMonday ? all.slice(1).concat(all.slice(0, 1)) : all;
}

/** Legend entries: the list's declared choices first, then any extra type seen in the data. */
function buildLegend(choices: string[], absences: IAbsence[]): ILegendEntry[] {
  const seen: Set<string> = new Set();
  const entries: ILegendEntry[] = [];

  const add = (raw: string): void => {
    const key: string = getAbsenceTypeKey(raw);
    if (seen.has(key)) {
      return;
    }
    seen.add(key);
    entries.push({ key, label: getTypeLabel(raw) });
  };

  choices.forEach(add);

  const extra: ILegendEntry[] = [];
  for (const absence of absences) {
    const key: string = getAbsenceTypeKey(absence.type);
    if (!seen.has(key) && !extra.some((e) => e.key === key)) {
      extra.push({ key, label: getTypeLabel(absence.type) });
    }
  }
  extra.sort((a, b) => a.label.localeCompare(b.label));
  return entries.concat(extra);
}

const TeamAvailabilityCalendar: React.FC<ITeamAvailabilityCalendarProps> = (props) => {
  const {
    context,
    siteUrl,
    listName,
    fieldMap,
    startWeekOnMonday,
    showWeekends,
    maxLanesPerDay,
    showOutThisWeek,
    capacityWarningThreshold,
    viewMode,
    useMockData,
    isDarkTheme
  } = props;

  const isWeekView: boolean = viewMode === 'week';

  const locale: string = context.pageContext.cultureInfo.currentUICultureName || 'en-US';
  const { employee, type, start, end, notes } = fieldMap;

  const [viewDate, setViewDate] = React.useState<Date>(() => startOfDay(new Date()));
  const [absences, setAbsences] = React.useState<IAbsence[]>([]);
  const [choices, setChoices] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [selection, setSelection] = React.useState<ISelection | undefined>(undefined);
  const [hiddenTypes, setHiddenTypes] = React.useState<Set<string>>(new Set());
  const [nameQuery, setNameQuery] = React.useState<string>('');

  const year: number = viewDate.getFullYear();
  const month: number = viewDate.getMonth();
  const today: Date = React.useMemo(() => startOfDay(new Date()), []);

  const listConfigured: boolean = useMockData || !!listName.trim();

  // --- Absences: reload when the month or the list config changes. ---
  React.useEffect(() => {
    let cancelled = false;
    setSelection(undefined);

    if (!listConfigured) {
      setAbsences([]);
      setLoading(false);
      setError(undefined);
      return;
    }

    setLoading(true);
    setError(undefined);

    const load = async (): Promise<IAbsence[]> => {
      if (useMockData) {
        return getMockAbsences(today);
      }
      const service: AbsenceService = new AbsenceService(context);
      let rangeStart: Date;
      let rangeEnd: Date;
      if (isWeekView) {
        const wk = buildWeek(viewDate, { startWeekOnMonday, showWeekends }, today);
        rangeStart = addDays(wk[0].date, -10);
        rangeEnd = addDays(wk[wk.length - 1].date, 10);
      } else {
        rangeStart = addDays(new Date(year, month, 1), -10);
        rangeEnd = addDays(new Date(year, month + 1, 0), 10);
      }
      return service.getAbsences(
        listName.trim(),
        { employee, type, start, end, notes },
        rangeStart,
        rangeEnd
      );
    };

    load()
      .then((result) => {
        if (!cancelled) {
          setAbsences(result);
          setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          console.error('[TeamAvailabilityCalendar] Could not load absences.', err);
          setError(
            `Could not read the "${listName}" list. Check the list name and column ` +
              `names in the web part settings, and that you can open the list.`
          );
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    context,
    listConfigured,
    useMockData,
    listName,
    employee,
    type,
    start,
    end,
    notes,
    year,
    month,
    isWeekView,
    viewDate,
    startWeekOnMonday,
    showWeekends,
    today
  ]);

  // --- Choices: independent of the month, so navigation does not refetch them. ---
  React.useEffect(() => {
    let cancelled = false;

    if (!listConfigured) {
      setChoices([]);
      return;
    }
    if (useMockData) {
      setChoices(MOCK_CHOICES);
      return;
    }

    new AbsenceService(context)
      .getTypeChoices(listName.trim(), type)
      .then((result) => {
        if (!cancelled) {
          setChoices(result);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setChoices([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [context, listConfigured, useMockData, listName, type]);

  const legend: ILegendEntry[] = React.useMemo(
    () => buildLegend(choices, absences),
    [choices, absences]
  );

  const query: string = nameQuery.trim().toLowerCase();
  const visibleAbsences: IAbsence[] = React.useMemo(
    () =>
      absences.filter(
        (a) =>
          !hiddenTypes.has(getAbsenceTypeKey(a.type)) &&
          (query === '' || a.employeeName.toLowerCase().indexOf(query) !== -1)
      ),
    [absences, hiddenTypes, query]
  );

  const weekLayouts: IWeekLayout[] = React.useMemo(() => {
    const options = { startWeekOnMonday, showWeekends };
    if (isWeekView) {
      return [layoutSingleWeek(buildWeek(viewDate, options, today), visibleAbsences, maxLanesPerDay)];
    }
    return layoutWeeks(buildMonthWeeks(year, month, options, today), visibleAbsences, maxLanesPerDay);
  }, [
    isWeekView,
    viewDate,
    year,
    month,
    visibleAbsences,
    maxLanesPerDay,
    startWeekOnMonday,
    showWeekends,
    today
  ]);

  const outThisWeek: IOutEntry[] = React.useMemo(
    () => getOutThisWeek(visibleAbsences, today),
    [visibleAbsences, today]
  );

  const weekdayLabels: string[] = React.useMemo(
    () => buildWeekdayLabels(locale, startWeekOnMonday, showWeekends),
    [locale, startWeekOnMonday, showWeekends]
  );

  const headerTitle: string = isWeekView
    ? formatDateRange(
        weekLayouts[0].week[0].date,
        weekLayouts[0].week[weekLayouts[0].week.length - 1].date,
        locale
      )
    : new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewDate);

  const goPrev = (): void =>
    setViewDate(isWeekView ? addDays(viewDate, -7) : new Date(year, month - 1, 1));
  const goNext = (): void =>
    setViewDate(isWeekView ? addDays(viewDate, 7) : new Date(year, month + 1, 1));
  const goToday = (): void => setViewDate(startOfDay(new Date()));

  const toggleType = (key: string): void => {
    setHiddenTypes((prev) => {
      const next: Set<string> = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const resetFilters = (): void => {
    setHiddenTypes(new Set());
    setNameQuery('');
  };

  const selectAbsence = (absence: IAbsence): void => {
    setSelection({ title: absence.employeeName, absences: [absence] });
  };

  const selectDay = (date: Date): void => {
    const list: IAbsence[] = getAbsencesForDay(visibleAbsences, date);
    if (list.length === 0) {
      return;
    }
    const label: string = new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    }).format(date);
    setSelection({ title: `${label} · ${list.length} away`, absences: list });
  };

  const filtersActive: boolean = hiddenTypes.size > 0 || query !== '';
  const allHidden: boolean = legend.length > 0 && legend.every((e) => hiddenTypes.has(e.key));
  const rootClass: string = `${styles.teamAvailabilityCalendar} ${isDarkTheme ? styles.darkTheme : ''}`;
  const unit: string = isWeekView ? 'week' : 'month';

  return (
    <section className={rootClass}>
      <div className={styles.header}>
        <IconButton
          iconProps={{ iconName: 'ChevronLeft' }}
          title={`Previous ${unit}`}
          ariaLabel={`Previous ${unit}`}
          onClick={goPrev}
        />
        <button
          className={styles.monthTitleButton}
          onClick={goToday}
          title={`Go to the current ${unit}`}
        >
          {headerTitle}
        </button>
        <IconButton
          iconProps={{ iconName: 'ChevronRight' }}
          title={`Next ${unit}`}
          ariaLabel={`Next ${unit}`}
          onClick={goNext}
        />
      </div>

      <div className={styles.toolbar}>
        {legend.length > 0 && (
          <ul className={styles.legend} aria-label="Absence types — select to filter">
            {legend.map((entry) => {
              const color = getTypeColor(entry.label, isDarkTheme);
              const off: boolean = hiddenTypes.has(entry.key);
              return (
                <li key={entry.key}>
                  <button
                    type="button"
                    className={`${styles.legendChip} ${off ? styles.legendChipOff : ''}`}
                    aria-pressed={!off}
                    onClick={() => toggleType(entry.key)}
                    title={off ? `Show ${entry.label}` : `Hide ${entry.label}`}
                  >
                    <span
                      className={styles.legendSwatch}
                      style={{ background: color.bg, borderColor: color.border }}
                      aria-hidden="true"
                    />
                    <Icon iconName={getTypeIcon(entry.label)} className={styles.legendIcon} />
                    {entry.label}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className={styles.toolbarRight}>
          <SearchBox
            className={styles.search}
            placeholder="Find a person"
            value={nameQuery}
            onChange={(_, value) => setNameQuery(value || '')}
            underlined
          />
          {filtersActive && (
            <button type="button" className={styles.resetFilters} onClick={resetFilters}>
              Show all
            </button>
          )}
        </div>
      </div>

      {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}

      {!listConfigured && (
        <MessageBar messageBarType={MessageBarType.warning}>
          Set the list name in the web part settings, or turn on &quot;Use sample data&quot; to preview.
        </MessageBar>
      )}

      {useMockData && (
        <MessageBar messageBarType={MessageBarType.info}>
          Showing bundled sample data. Turn off &quot;Use sample data&quot; in the web part settings to read your list.
        </MessageBar>
      )}

      {showOutThisWeek && outThisWeek.length > 0 && (
        <div className={styles.outThisWeek}>
          <div className={styles.outThisWeekTitle}>Out this week</div>
          <ul className={styles.outThisWeekList}>
            {outThisWeek.map((entry) => {
              const color = getTypeColor(entry.absence.type, isDarkTheme);
              const when: string = entry.activeToday
                ? 'Today'
                : new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(entry.from);
              return (
                <li key={`${entry.absence.id}-${entry.from.getTime()}`}>
                  <button
                    type="button"
                    className={styles.outPill}
                    style={{ background: color.bg, borderColor: color.border, color: color.text }}
                    onClick={() => selectAbsence(entry.absence)}
                    title={formatDateRange(entry.absence.start, entry.absence.end, locale)}
                  >
                    <Icon iconName={getTypeIcon(entry.absence.type)} className={styles.outIcon} />
                    <span className={styles.outWhen}>{when}</span>
                    <span className={styles.outSeparator}>·</span>
                    <span>{entry.absence.employeeName}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {!loading && listConfigured && !error && allHidden && (
        <MessageBar messageBarType={MessageBarType.info}>
          Every absence type is hidden. Select a type above to show it again.
        </MessageBar>
      )}
      {!loading && listConfigured && !error && !allHidden && visibleAbsences.length === 0 && (
        <MessageBar messageBarType={MessageBarType.info}>
          {filtersActive
            ? 'No absences match the current filter.'
            : 'No one is marked away in this period.'}
        </MessageBar>
      )}

      {/* The grid stays mounted while a new period loads, dimmed under a small
          spinner, so navigating does not collapse and re-inflate the page. */}
      <div className={styles.gridWrap} aria-busy={loading}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <Spinner size={SpinnerSize.small} label="Loading absences..." labelPosition="right" />
          </div>
        )}
        <div className={loading ? styles.gridLoading : undefined}>
          <MonthGrid
            weekLayouts={weekLayouts}
            weekdayLabels={weekdayLabels}
            maxLanesPerDay={maxLanesPerDay}
            capacityThreshold={capacityWarningThreshold}
            isDarkTheme={isDarkTheme}
            singleWeek={isWeekView}
            locale={locale}
            onSelectAbsence={selectAbsence}
            onSelectDay={selectDay}
          />
        </div>
      </div>

      {selection && (
        <AbsenceDetailsPanel
          title={selection.title}
          absences={selection.absences}
          siteUrl={siteUrl}
          locale={locale}
          isDarkTheme={isDarkTheme}
          onDismiss={() => setSelection(undefined)}
        />
      )}
    </section>
  );
};

export default TeamAvailabilityCalendar;
