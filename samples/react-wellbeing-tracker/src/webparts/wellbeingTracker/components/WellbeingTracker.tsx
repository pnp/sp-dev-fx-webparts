import * as React from 'react';
import { Spinner, SpinnerSize, MessageBar, MessageBarType } from '@fluentui/react';
import { IWellbeingTrackerProps } from './IWellbeingTrackerProps';
import { TrackerGrid } from './TrackerGrid';
import { IActivity, ICompletion, ViewPeriod } from '../models/IWellbeingModels';
import { WellbeingService } from '../services/WellbeingService';
import { getSP } from '../pnpjsConfig';
import styles from './WellbeingTracker.module.scss';

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_FULL  = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// ── Date helpers ──────────────────────────────────────────────────────────────

function getWeekDates(ref: Date): Date[] {
  const d = new Date(ref.getTime());
  d.setHours(0, 0, 0, 0);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(d.getTime());
  monday.setDate(d.getDate() + diff);
  return Array.from({ length: 7 }, (_: unknown, i: number): Date => {
    const dt = new Date(monday.getTime());
    dt.setDate(monday.getDate() + i);
    return dt;
  });
}

function getMonthDates(ref: Date): Date[] {
  const year = ref.getFullYear();
  const month = ref.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_: unknown, i: number): Date => new Date(year, month, i + 1));
}

function formatPeriodLabel(dates: Date[], period: ViewPeriod): string {
  if (period === 'week') {
    const s = dates[0];
    const e = dates[6];
    if (s.getMonth() === e.getMonth()) {
      return `${MONTH_SHORT[s.getMonth()]} ${s.getDate()}–${e.getDate()}`;
    }
    return `${MONTH_SHORT[s.getMonth()]} ${s.getDate()} – ${MONTH_SHORT[e.getMonth()]} ${e.getDate()}`;
  }
  return `${MONTH_FULL[dates[0].getMonth()]} ${dates[0].getFullYear()}`;
}

function formatError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'An unexpected error occurred. Check the list names in web part properties.';
}

// ── Component ─────────────────────────────────────────────────────────────────

const WellbeingTracker: React.FC<IWellbeingTrackerProps> = (props) => {
  const today = React.useMemo<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [activities, setActivities]         = React.useState<IActivity[]>([]);
  const [completions, setCompletions]       = React.useState<ICompletion[]>([]);
  const [categories, setCategories]         = React.useState<string[]>([]);
  const [isLoading, setIsLoading]           = React.useState<boolean>(true);
  const [error, setError]                   = React.useState<string | undefined>();
  const [filterCategory, setFilterCategory] = React.useState<string>('All Activities');
  const [filterPeriod, setFilterPeriod]     = React.useState<ViewPeriod>('week');
  const [referenceDate, setReferenceDate]   = React.useState<Date>(new Date(today.getTime()));
  const [newName, setNewName]               = React.useState<string>('');
  const [newCategory, setNewCategory]       = React.useState<string>('');
  const [nameError, setNameError]           = React.useState<boolean>(false);
  const [isSaving, setIsSaving]             = React.useState<boolean>(false);
  const [isDark, setIsDark]                 = React.useState<boolean>(() => {
    try { return localStorage.getItem('wt-dark') === '1'; } catch { return false; }
  });

  const serviceRef = React.useRef<WellbeingService | null>(null);

  function toggleDark(): void {
    setIsDark(prev => {
      const next = !prev;
      try { localStorage.setItem('wt-dark', next ? '1' : '0'); } catch { /* storage unavailable */ }
      return next;
    });
  }

  // ── Init service ─────────────────────────────────────────────────────────────

  React.useEffect(() => {
    const svc = new WellbeingService(getSP(), props.activitiesListName, props.completionsListName);
    serviceRef.current = svc;

    svc.init()
      .then(() => loadActivities(svc))
      .catch((err: unknown) => {
        setError(formatError(err));
        setIsLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.activitiesListName, props.completionsListName]);

  // ── Load data ─────────────────────────────────────────────────────────────────

  async function loadActivities(svc: WellbeingService): Promise<void> {
    try {
      const [acts, cats] = await Promise.all([svc.getActivities(), svc.getCategories()]);
      setActivities(acts);
      setCategories(cats);
      setNewCategory(prev => prev || cats[0] || '');
      await loadCompletions(svc, filterPeriod, referenceDate);
    } catch (err) {
      setError(formatError(err));
    } finally {
      setIsLoading(false);
    }
  }

  async function loadCompletions(svc: WellbeingService, period: ViewPeriod, refDate: Date): Promise<void> {
    const dates = period === 'week' ? getWeekDates(refDate) : getMonthDates(refDate);
    const start = dates[0];
    const end = dates[dates.length - 1];
    const items = await svc.getCompletions(start, end);
    setCompletions(items);
  }

  // Reload completions when period or reference date changes
  React.useEffect(() => {
    if (!serviceRef.current || isLoading) return;
    setIsLoading(true);
    loadCompletions(serviceRef.current, filterPeriod, referenceDate)
      .catch((err: unknown) => setError(formatError(err)))
      .finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPeriod, referenceDate]);

  // ── Navigation ────────────────────────────────────────────────────────────────

  function navigate(direction: -1 | 1): void {
    const next = new Date(referenceDate.getTime());
    if (filterPeriod === 'week') {
      next.setDate(next.getDate() + direction * 7);
    } else {
      next.setMonth(next.getMonth() + direction);
    }
    setReferenceDate(next);
  }

  // ── Toggle completion ─────────────────────────────────────────────────────────

  async function handleToggle(activityId: number, date: Date, existingId: number | undefined, activityTitle: string): Promise<void> {
    if (!serviceRef.current) return;
    try {
      if (existingId !== undefined) {
        await serviceRef.current.removeCompletion(existingId);
        setCompletions(prev => prev.filter(c => c.id !== existingId));
      } else {
        const added = await serviceRef.current.addCompletion(activityId, date, activityTitle);
        setCompletions(prev => [...prev, added]);
      }
    } catch (err) {
      setError(formatError(err));
    }
  }

  // ── Add activity ──────────────────────────────────────────────────────────────

  async function handleCreate(): Promise<void> {
    const trimmed = newName.trim();
    if (!trimmed) {
      setNameError(true);
      setTimeout(() => setNameError(false), 1000);
      return;
    }
    if (!serviceRef.current) return;
    setIsSaving(true);
    try {
      const added = await serviceRef.current.addActivity(trimmed, newCategory);
      setActivities(prev => [...prev, added].sort((a, b) => a.title.localeCompare(b.title)));
      setNewName('');
    } catch (err) {
      setError(formatError(err));
    } finally {
      setIsSaving(false);
    }
  }

  // ── Derived values ────────────────────────────────────────────────────────────

  const dates = filterPeriod === 'week' ? getWeekDates(referenceDate) : getMonthDates(referenceDate);
  const periodLabel = formatPeriodLabel(dates, filterPeriod);
  const visibleActivities = filterCategory === 'All Activities'
    ? activities
    : activities.filter(a => a.category === filterCategory);

  const existingCategories = React.useMemo<string[]>(
    () => ['All Activities', ...categories],
    [categories]
  );

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className={`${styles.container}${isDark ? ` ${styles.dark}` : ''}`}>

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>{props.title}</h2>

        <div className={styles.controls}>
          <select
            value={filterCategory}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilterCategory(e.target.value)}
            aria-label="Filter by category"
            className={styles.nativeSelect}
          >
            {existingCategories.map((cat: string) => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select
            value={filterPeriod}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFilterPeriod(e.target.value as ViewPeriod);
              setReferenceDate(new Date(today.getTime()));
            }}
            aria-label="View period"
            className={styles.nativeSelect}
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          <div className={styles.navGroup}>
            <button type="button" className={styles.navBtn} onClick={() => navigate(-1)} aria-label="Previous period">
              <ChevronLeft />
            </button>
            <span className={styles.periodLabel}>{periodLabel}</span>
            <button type="button" className={styles.navBtn} onClick={() => navigate(1)} aria-label="Next period">
              <ChevronRight />
            </button>
          </div>

          <button
            type="button"
            className={styles.addBtn}
            onClick={() => { const el = document.getElementById('wellbeing-name-input'); if (el) el.focus(); }}
          >
            <PlusIcon /> Add Activity
          </button>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Error */}
      {error && (
        <div className={styles.errorWrapper}>
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={true}
            onDismiss={() => setError(undefined)}
            dismissButtonAriaLabel="Close"
          >
            {error}
          </MessageBar>
          {error.toLowerCase().indexOf('list') !== -1 && (
            <div className={styles.setupMessage}>
              <h3>SharePoint List Setup Required</h3>
              <p>Please create the following lists in your SharePoint site:</p>
              <ul>
                <li><strong>{props.activitiesListName}</strong> — columns: <em>Title</em> (text), <em>Category</em> (choice: Health, Mindfulness, Social)</li>
                <li><strong>{props.completionsListName}</strong> — columns: <em>Title</em> (text), <em>Activity</em> (lookup → {props.activitiesListName}), <em>CompletionDate</em> (date)</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className={styles.spinnerWrapper}>
          <Spinner size={SpinnerSize.large} label="Loading tracker..." />
        </div>
      )}

      {/* Grid */}
      {!isLoading && (
        <TrackerGrid
          activities={visibleActivities}
          completions={completions}
          dates={dates}
          today={today}
          isWeekView={filterPeriod === 'week'}
          onToggle={handleToggle}
        />
      )}

      {/* Theme toggle — anchored to bottom-right of the container */}
      <button
        type="button"
        className={styles.darkToggle}
        onClick={toggleDark}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>

      {/* Add Activity Panel */}
      <div className={styles.addPanel}>
        <div className={styles.addPanelLabel}>New Activity</div>
        <div className={styles.addPanelForm}>
          <input
            id="wellbeing-name-input"
            type="text"
            className={`${styles.activityInput}${nameError ? ` ${styles.inputError}` : ''}`}
            placeholder="e.g., Morning Walk, Yoga, Team Check-in..."
            value={newName}
            maxLength={80}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') { handleCreate().catch(() => { /* handled inside */ }); } }}
            aria-label="New activity name"
          />
          <select
            value={newCategory}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewCategory(e.target.value)}
            aria-label="Activity category"
            className={styles.nativeSelect}
          >
            {categories.map((c: string) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button
            type="button"
            className={styles.createBtn}
            onClick={() => { handleCreate().catch(() => { /* handled inside */ }); }}
            disabled={isSaving}
            aria-label="Create activity"
          >
            {isSaving ? 'Creating...' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── SVG icons ─────────────────────────────────────────────────────────────────

const MoonIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const SunIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const ChevronLeft: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const PlusIcon: React.FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default WellbeingTracker;
