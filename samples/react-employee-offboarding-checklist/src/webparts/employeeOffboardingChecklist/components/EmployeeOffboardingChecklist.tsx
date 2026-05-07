import * as React from 'react';
import { Spinner, SpinnerSize, MessageBar, MessageBarType } from '@fluentui/react';
import { IEmployeeOffboardingChecklistProps } from './IEmployeeOffboardingChecklistProps';
import { getSP } from '../pnpjsConfig';
import styles from './EmployeeOffboardingChecklist.module.scss';

// ── Models ────────────────────────────────────────────────────────────────────

interface IEmployee {
  id: number;
  title: string;
  department: string;
  lastDay: string;
}

interface ITask {
  id: number;
  title: string;
  department: string;
  assignedTo: string;
  status: 'Pending' | 'Done' | 'Blocked';
  notes: string;
  employeeId: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const DEPT_COLORS: Record<string, string> = {
  'IT':         '#3b82f6',
  'HR':         '#8b5cf6',
  'Finance':    '#f59e0b',
  'Management': '#10b981',
  'Security':   '#ef4444',
  'IAM':        '#06b6d4',
  'Legal':      '#6366f1',
  'Facilities': '#84cc16',
};

function getDeptColor(dept: string): string {
  return DEPT_COLORS[dept] || '#6b7280';
}

function getDeptInitials(dept: string): string {
  const words = dept.split(' ');
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase();
  return dept.substring(0, 2).toUpperCase();
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'An unexpected error occurred.';
}

// ── Component ─────────────────────────────────────────────────────────────────

const EmployeeOffboardingChecklist: React.FC<IEmployeeOffboardingChecklistProps> = (props) => {
  const [employees, setEmployees]             = React.useState<IEmployee[]>([]);
  const [selectedId, setSelectedId]           = React.useState<number | null>(null);
  const [tasks, setTasks]                     = React.useState<ITask[]>([]);
  const [isLoadingEmployees, setIsLoadingEmployees] = React.useState<boolean>(true);
  const [isLoadingTasks, setIsLoadingTasks]   = React.useState<boolean>(false);
  const [updatingIds, setUpdatingIds]         = React.useState<Set<number>>(new Set());
  const [error, setError]                     = React.useState<string | undefined>();
  const [isDark, setIsDark]                   = React.useState<boolean>(() => {
    try { return localStorage.getItem('eoc-dark') === 'true'; } catch { return false; }
  });

  function toggleDark(): void {
    setIsDark(prev => {
      const next = !prev;
      try { localStorage.setItem('eoc-dark', String(next)); } catch { /* ignore */ }
      return next;
    });
  }

  // ── Load employees ──────────────────────────────────────────────────────────

  React.useEffect(() => {
    const sp = getSP();
    sp.web.lists.getByTitle(props.employeesListName)
      .items
      .select('ID', 'Title', 'Department', 'LastDay')
      .orderBy('Title')()
      .then((items: {ID: number; Title: string; Department: string; LastDay: string}[]) => {
        const emps: IEmployee[] = items.map(i => ({
          id: i.ID,
          title: i.Title,
          department: i.Department || '',
          lastDay: i.LastDay || '',
        }));
        setEmployees(emps);
        if (emps.length > 0) setSelectedId(emps[0].id);
      })
      .catch((err: unknown) => setError(formatError(err)))
      .finally(() => setIsLoadingEmployees(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.employeesListName]);

  // ── Load tasks for selected employee ────────────────────────────────────────

  React.useEffect(() => {
    if (selectedId === null) return;
    setIsLoadingTasks(true);
    const sp = getSP();
    sp.web.lists.getByTitle(props.tasksListName)
      .items
      .select('ID', 'Title', 'OwningDepartment', 'AssignedTo/Title', 'Status', 'Notes', 'EmployeeId')
      .expand('AssignedTo')
      .filter(`EmployeeId eq ${selectedId}`)
      .orderBy('Title')()
      .then((items: {ID: number; Title: string; OwningDepartment: string; AssignedTo: {Title: string} | null; Status: string; Notes: string; EmployeeId: number}[]) => {
        setTasks(items.map(i => ({
          id: i.ID,
          title: i.Title,
          department: i.OwningDepartment || '',
          assignedTo: i.AssignedTo?.Title || '',
          status: (i.Status as ITask['status']) || 'Pending',
          notes: i.Notes || '',
          employeeId: i.EmployeeId,
        })));
      })
      .catch((err: unknown) => setError(formatError(err)))
      .finally(() => setIsLoadingTasks(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, props.tasksListName]);

  // ── Set task status ──────────────────────────────────────────────────────────

  async function handleSetStatus(taskId: number, newStatus: ITask['status']): Promise<void> {
    setUpdatingIds(prev => new Set(prev).add(taskId));
    try {
      const sp = getSP();
      await sp.web.lists.getByTitle(props.tasksListName).items.getById(taskId).update({ Status: newStatus });
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    } catch (err) {
      setError(formatError(err));
    } finally {
      setUpdatingIds(prev => { const next = new Set(prev); next.delete(taskId); return next; });
    }
  }

  // ── Derived stats ─────────────────────────────────────────────────────────

  const totalTasks     = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Done').length;
  const progress       = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const selectedEmployee = employees.find(e => e.id === selectedId);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={`${styles.container} ${isDark ? styles.dark : ''}`}>

      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{props.title}</h1>
          <div className={styles.subtitle}>Coordinated exit workflow across HR, IT, Finance &amp; Management</div>
        </div>
        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>

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
        </div>
      )}

      {/* Employee selector */}
      {!isLoadingEmployees && employees.length > 0 && (
        <div className={styles.selectorRow}>
          <label className={styles.selectorLabel} htmlFor="employee-select">Departing Employee</label>
          <select
            id="employee-select"
            className={styles.employeeSelect}
            value={selectedId ?? ''}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedId(Number(e.target.value))}
            aria-label="Select departing employee"
          >
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.title}{emp.lastDay ? ` — Last day: ${formatDate(emp.lastDay)}` : ''}
              </option>
            ))}
          </select>
        </div>
      )}

      {isLoadingEmployees ? (
        <div className={styles.spinnerWrapper}>
          <Spinner size={SpinnerSize.large} label="Loading employees..." />
        </div>
      ) : employees.length === 0 && !error ? (
        <div className={styles.emptyState}>
          <p>No offboarding employees found in <strong>{props.employeesListName}</strong>.</p>
          <p>Add an employee to the list to get started.</p>
        </div>
      ) : (
        <>
          {/* Stats row */}
          <div className={styles.statsRow}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{totalTasks}</div>
              <div className={styles.statLabel}>Total Tasks</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{completedTasks}</div>
              <div className={styles.statLabel}>Completed</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{progress}%</div>
              <div className={styles.statLabel}>Overall Progress</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className={styles.overallProgressWrap}>
            <progress
              className={`${styles.overallProgress} ${progress >= 100 ? styles.progressDone : progress >= 50 ? styles.progressMid : styles.progressLow}`}
              value={progress}
              max={100}
              aria-label={`Overall progress: ${progress}%`}
            />
          </div>

          {/* Task grid */}
          {isLoadingTasks ? (
            <div className={styles.spinnerWrapper}>
              <Spinner size={SpinnerSize.medium} label="Loading tasks..." />
            </div>
          ) : tasks.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No tasks found for {selectedEmployee?.title || 'this employee'}.</p>
              <p>Add tasks to the <strong>{props.tasksListName}</strong> list linked to this employee.</p>
            </div>
          ) : (
            <div className={styles.taskGrid}>
              {tasks.map(task => {
                const isDone    = task.status === 'Done';
                const isBlocked = task.status === 'Blocked';
                const isUpdating = updatingIds.has(task.id);
                const deptColor  = getDeptColor(task.department);
                const deptInit   = getDeptInitials(task.department);

                return (
                  <div key={task.id} className={`${styles.taskCard} ${isDone ? styles.taskCardDone : ''}`}>

                    {/* Department badge — SVG circle avoids inline style */}
                    <svg width="36" height="36" viewBox="0 0 36 36" className={styles.deptBadge} aria-hidden="true">
                      <circle cx="18" cy="18" r="18" fill={deptColor} />
                      <text x="18" y="23" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="inherit">
                        {deptInit}
                      </text>
                    </svg>

                    <div className={styles.taskCardBody}>
                      <div className={styles.taskTitle}>{task.title}</div>
                      <div className={styles.taskTeam}>{task.assignedTo || '—'}</div>

                      <div className={styles.taskMeta}>
                        <span className={`${styles.statusBadge} ${isDone ? styles.statusDone : isBlocked ? styles.statusBlocked : styles.statusPending}`}>
                          {task.status}
                        </span>
                      </div>

                      {task.notes && (
                        <div className={styles.taskNotes}>{task.notes}</div>
                      )}

                      <progress
                        className={`${styles.taskProgress} ${isDone ? styles.progressDone : styles.progressLow}`}
                        value={progress}
                        max={100}
                        aria-label={`Overall progress: ${progress}%`}
                      />

                      <div className={styles.taskActions}>
                        {isDone && (
                          <button type="button" className={styles.undoBtn}
                            onClick={() => { handleSetStatus(task.id, 'Pending').catch(() => { /* handled inside */ }); }}
                            disabled={isUpdating}
                            aria-label={`Undo: ${task.title}`}>
                            {isUpdating ? 'Updating...' : 'Undo'}
                          </button>
                        )}
                        {isBlocked && (
                          <button type="button" className={styles.unblockBtn}
                            onClick={() => { handleSetStatus(task.id, 'Pending').catch(() => { /* handled inside */ }); }}
                            disabled={isUpdating}
                            aria-label={`Unblock: ${task.title}`}>
                            {isUpdating ? 'Updating...' : 'Unblock'}
                          </button>
                        )}
                        {!isDone && !isBlocked && (
                          <>
                            <button type="button" className={styles.markDoneBtn}
                              onClick={() => { handleSetStatus(task.id, 'Done').catch(() => { /* handled inside */ }); }}
                              disabled={isUpdating}
                              aria-label={`Mark done: ${task.title}`}>
                              {isUpdating ? 'Updating...' : 'Mark Done'}
                            </button>
                            <button type="button" className={styles.blockBtn}
                              onClick={() => { handleSetStatus(task.id, 'Blocked').catch(() => { /* handled inside */ }); }}
                              disabled={isUpdating}
                              aria-label={`Block: ${task.title}`}>
                              Block
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeeOffboardingChecklist;
