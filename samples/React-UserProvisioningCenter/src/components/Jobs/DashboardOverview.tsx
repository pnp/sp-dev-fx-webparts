import * as React from 'react';
import {
  Text,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  typographyStyles
} from '@fluentui/react-components';
import {
  Clock24Regular,
  CheckmarkCircle24Regular,
  Warning24Regular,
  PlayCircle24Regular,
  People24Regular,
  PersonSubtract24Regular
} from '@fluentui/react-icons';
import { motionTokens } from '@fluentui/react-motion';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  type TooltipContentProps
} from 'recharts';
import * as strings from 'UpcStrings';
import { useReducedMotion } from '../../hooks/useMediaQuery';
import type { IJobSummary, JobStatus, JobType } from '../../models';
import { jobStatusLabel, jobTypeLabel } from '../Shared/StatusBadge';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalL
  },

  kpiRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: tokens.spacingHorizontalM
  },
  kpiCard: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalXS,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2,
    transitionProperty: 'transform, box-shadow',
    transitionDuration: `${motionTokens.durationGentle}ms`,
    transitionTimingFunction: motionTokens.curveEasyEase,
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: tokens.shadow4
    },
    '@media (prefers-reduced-motion: reduce)': {
      transitionDuration: '0.01ms',
      ':hover': { transform: 'none' }
    }
  },
  kpiCardActive: {
    ...shorthands.border(tokens.strokeWidthThick, 'solid', tokens.colorBrandStroke1),
    backgroundColor: tokens.colorBrandBackground2
  },

  kpiCardButtonBase: {
    textAlign: 'left',
    fontFamily: 'inherit'
  },
  kpiCardClickable: {
    cursor: 'pointer'
  },
  kpiCardStatic: {
    cursor: 'default'
  },
  kpiCardHeader: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS
  },
  kpiIcon: {
    width: '32px',
    height: '32px',
    borderRadius: tokens.borderRadiusMedium,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  kpiIconPending: {
    backgroundColor: tokens.colorPaletteMarigoldBackground1,
    color: tokens.colorPaletteMarigoldForeground1
  },
  kpiIconRunning: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1
  },
  kpiIconFailed: {
    backgroundColor: tokens.colorPaletteRedBackground1,
    color: tokens.colorPaletteRedForeground3
  },
  kpiIconCompleted: {
    backgroundColor: tokens.colorPaletteGreenBackground1,
    color: tokens.colorPaletteGreenForeground1
  },
  kpiLabel: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightMedium
  },
  kpiValue: {
    fontSize: tokens.fontSizeHero800,
    lineHeight: tokens.lineHeightHero800,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginTop: tokens.spacingVerticalXS
  },
  kpiSubtext: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200
  },

  chartsRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: tokens.spacingHorizontalM,
    '@container (max-width: 760px)': {
      gridTemplateColumns: '1fr'
    }
  },
  chartCard: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: tokens.spacingVerticalM,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2
  },
  chartTitle: {
    ...typographyStyles.subtitle2,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1
  },
  chartContainer: {
    width: '100%',
    height: '260px'
  },
  trendChartContainer: {
    width: '100%',
    height: '300px'
  },

  donutWrap: {
    position: 'relative',
    width: '100%',
    height: '220px'
  },
  donutCenter: {
    position: 'absolute',
    top: '38%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    pointerEvents: 'none'
  },
  donutCenterValue: {
    fontSize: tokens.fontSizeHero700,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: tokens.lineHeightHero700
  },
  donutCenterLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3
  },

  statsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: tokens.spacingHorizontalXL,
    rowGap: tokens.spacingVerticalS,
    paddingTop: tokens.spacingVerticalS,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    columnGap: tokens.spacingHorizontalS
  },
  statLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3
  },
  statValue: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1
  },
  emptyChart: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '260px',
    color: tokens.colorNeutralForeground3
  },
  visuallyHidden: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: 0
  }
});

interface IChartTableProps {
  caption: string;
  columns: [string, string];
  rows: [string, number][];
}

const ChartDataTable: React.FC<IChartTableProps> = ({ caption, columns, rows }) => {
  const styles = useStyles();
  return (
    <table className={styles.visuallyHidden}>
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">{columns[0]}</th>
          <th scope="col">{columns[1]}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const WEEK_MS: number = 7 * 24 * 60 * 60 * 1000;
const DAY_MS: number = 24 * 60 * 60 * 1000;

const STATUS_COLORS: Record<JobStatus, string> = {
  PendingApproval: tokens.colorPaletteMarigoldForeground1,
  Approved: tokens.colorBrandForeground1,
  Scheduled: tokens.colorPaletteRoyalBlueForeground2,
  Running: tokens.colorBrandForeground1,
  PartiallyFailed: tokens.colorPaletteDarkOrangeForeground3,
  Failed: tokens.colorPaletteRedForeground3,
  Completed: tokens.colorPaletteGreenForeground1,
  Cancelled: tokens.colorNeutralForeground3,
  Rejected: tokens.colorPaletteRedForeground3
};

const TYPE_COLORS: Record<JobType, string> = {
  Onboard: tokens.colorBrandForeground1,
  Offboard: tokens.colorPaletteRedForeground3,
  Transfer: tokens.colorPaletteRoyalBlueForeground2,
  Clone: tokens.colorPaletteGreenForeground1,
  Bulk: tokens.colorPaletteMarigoldForeground1
};

interface ITooltipPayloadItem {
  name: string;
  value: number;
  color: string;
  payload?: { fill?: string };
}

function FluentTooltip({
  active,
  payload,
  label
}: TooltipContentProps<number, string>): React.ReactElement | null {
  if (!active || !payload || payload.length === 0) {
    return null;
  }
  return (
    <div
      style={{
        backgroundColor: tokens.colorNeutralBackground1,
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        borderRadius: tokens.borderRadiusMedium,
        padding: tokens.spacingHorizontalS,
        boxShadow: tokens.shadow4,
        fontSize: tokens.fontSizeBase200
      }}
    >
      {label !== undefined && label !== '' ? (
        <div style={{ fontWeight: tokens.fontWeightSemibold, marginBottom: '4px' }}>
          {String(label)}
        </div>
      ) : undefined}
      {payload.map((entry, i: number) => {
        const item: ITooltipPayloadItem = entry as unknown as ITooltipPayloadItem;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', columnGap: '6px', marginTop: '2px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: item.color || item.payload?.fill || tokens.colorBrandForeground1,
                flexShrink: 0
              }}
            />
            <span style={{ color: tokens.colorNeutralForeground2 }}>{item.name}:</span>
            <span style={{ fontWeight: tokens.fontWeightSemibold, color: tokens.colorNeutralForeground1 }}>
              {item.value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

interface IStatusDatum {
  name: string;
  value: number;
  color: string;
  status: JobStatus;
}

interface ITypeDatum {
  name: string;
  value: number;
  type: JobType;
}

interface ITrendDay {
  day: string;
  Completed: number;
  Failed: number;
  Pending: number;
  Running: number;
  Other: number;
  total: number;
}

interface IKpiSummary {
  total: number;
  pending: number;
  running: number;
  failed7: number;
  completedToday: number;
  completedTotal: number;
  finishedTotal: number;
  successRate: number;
  onboardCount: number;
  offboardCount: number;
  statusData: IStatusDatum[];
  typeData: ITypeDatum[];
  trendData: ITrendDay[];
  hasTrend: boolean;
}

const STATUS_ORDER: JobStatus[] = [
  'Completed',
  'Running',
  'PendingApproval',
  'Approved',
  'PartiallyFailed',
  'Failed',
  'Cancelled',
  'Rejected',
  'Scheduled'
];

const ALL_JOB_TYPES: JobType[] = ['Onboard', 'Offboard', 'Transfer', 'Clone', 'Bulk'];

function computeSummary(jobs: IJobSummary[], now: number): IKpiSummary {
  const statusCounts: Map<JobStatus, number> = new Map();
  const typeCounts: Map<JobType, number> = new Map();
  let pending = 0;
  let running = 0;
  let failed7 = 0;
  let completedToday = 0;
  let completedTotal = 0;
  let finishedTotal = 0;
  let onboardCount = 0;
  let offboardCount = 0;

  const trend: ITrendDay[] = [];
  for (let i = 6; i >= 0; i--) {
    const dayStart: number = now - i * DAY_MS;
    const label: string = new Date(dayStart).toLocaleDateString(undefined, { weekday: 'short' });
    trend.push({ day: label, Completed: 0, Failed: 0, Pending: 0, Running: 0, Other: 0, total: 0 });
  }

  for (const job of jobs) {
    statusCounts.set(job.status, (statusCounts.get(job.status) ?? 0) + 1);
    typeCounts.set(job.jobType, (typeCounts.get(job.jobType) ?? 0) + 1);

    switch (job.status) {
      case 'PendingApproval':
        pending++;
        break;
      case 'Running':
        running++;
        break;
      case 'Completed':
        completedTotal++;
        finishedTotal++;
        break;
      case 'Failed':
      case 'PartiallyFailed':
        finishedTotal++;
        break;
    }

    if (job.createdUtc) {
      const created: number = Date.parse(job.createdUtc);
      if (!isNaN(created)) {
        const ageMs: number = now - created;
        if (ageMs <= DAY_MS && job.status === 'Completed') {
          completedToday++;
        }
        if (ageMs <= WEEK_MS && (job.status === 'Failed' || job.status === 'PartiallyFailed')) {
          failed7++;
        }
        const ageDays: number = Math.floor(ageMs / DAY_MS);
        if (ageDays >= 0 && ageDays < 7) {
          const dayIdx: number = 6 - ageDays;
          trend[dayIdx].total++;
          switch (job.status) {
            case 'Completed':
              trend[dayIdx].Completed++;
              break;
            case 'Failed':
            case 'PartiallyFailed':
              trend[dayIdx].Failed++;
              break;
            case 'PendingApproval':
              trend[dayIdx].Pending++;
              break;
            case 'Running':
              trend[dayIdx].Running++;
              break;
            default:
              trend[dayIdx].Other++;
              break;
          }
        }
      }
    }

    if (job.jobType === 'Onboard') {
      onboardCount++;
    } else if (job.jobType === 'Offboard') {
      offboardCount++;
    }
  }

  const successRate: number =
    finishedTotal > 0 ? Math.round((completedTotal / finishedTotal) * 100) : 0;

  const statusData: IStatusDatum[] = STATUS_ORDER.filter((s) => (statusCounts.get(s) ?? 0) > 0).map(
    (s) => ({
      name: jobStatusLabel(s),
      value: statusCounts.get(s) ?? 0,
      color: STATUS_COLORS[s],
      status: s
    })
  );

  const typeData: ITypeDatum[] = ALL_JOB_TYPES.filter((t) => (typeCounts.get(t) ?? 0) > 0).map(
    (t) => ({
      name: jobTypeLabel(t),
      value: typeCounts.get(t) ?? 0,
      type: t
    })
  );

  return {
    total: jobs.length,
    pending,
    running,
    failed7,
    completedToday,
    completedTotal,
    finishedTotal,
    successRate,
    onboardCount,
    offboardCount,
    statusData,
    typeData,
    trendData: trend,
    hasTrend: trend.some((d) => d.total > 0)
  };
}

export type KpiFilterKey = 'pending' | 'running' | 'failed7' | 'completedToday' | null;

export interface IDashboardOverviewProps {
  jobs: IJobSummary[];
  activeKpi?: KpiFilterKey;
  onKpiClick?: (key: KpiFilterKey) => void;
}

export const DashboardOverview: React.FC<IDashboardOverviewProps> = ({ jobs, activeKpi, onKpiClick }) => {
  const styles = useStyles();

  const summary: IKpiSummary = React.useMemo(() => computeSummary(jobs, Date.now()), [jobs]);

  const hasRenderedOnce = React.useRef(false);
  React.useEffect(() => {
    hasRenderedOnce.current = true;
  }, []);
  const reducedMotion: boolean = useReducedMotion();
  const chartsAnimate: boolean = !hasRenderedOnce.current && !reducedMotion;

  const kpiCards: {
    key: KpiFilterKey;
    label: string;
    value: number;
    subtext: string;
    icon: React.ReactElement;
    iconClass: string;
  }[] = [
    {
      key: 'pending',
      label: strings.DashboardPendingReview,
      value: summary.pending,
      subtext: strings.StatusPendingApproval,
      icon: <Clock24Regular />,
      iconClass: styles.kpiIconPending
    },
    {
      key: 'running',
      label: strings.DashboardActiveNow,
      value: summary.running,
      subtext: strings.StatusRunning,
      icon: <PlayCircle24Regular />,
      iconClass: styles.kpiIconRunning
    },
    {
      key: 'failed7',
      label: strings.DashboardNeedsAttention,
      value: summary.failed7,
      subtext: strings.KpiFailed7,
      icon: <Warning24Regular />,
      iconClass: styles.kpiIconFailed
    },
    {
      key: 'completedToday',
      label: strings.DashboardCompletedToday,
      value: summary.completedToday,
      subtext: strings.KpiCompleted7,
      icon: <CheckmarkCircle24Regular />,
      iconClass: styles.kpiIconCompleted
    }
  ];

  return (
    <div className={styles.root} role="region" aria-label={strings.DashboardOverviewTitle}>
      {}
      <div className={styles.kpiRow}>
        {kpiCards.map((card) => {
          const isActive: boolean = activeKpi === card.key;
          return (
            <button
              key={card.key}
              type="button"
              className={mergeClasses(
                styles.kpiCard,
                isActive && styles.kpiCardActive,
                styles.kpiCardButtonBase,
                onKpiClick ? styles.kpiCardClickable : styles.kpiCardStatic
              )}
              onClick={() => onKpiClick?.(isActive ? null : card.key)}
              aria-pressed={isActive}
              aria-label={`${card.label}: ${card.value}`}
            >
              <div className={styles.kpiCardHeader}>
                <span className={mergeClasses(styles.kpiIcon, card.iconClass)}>{card.icon}</span>
                <Text className={styles.kpiLabel}>{card.label}</Text>
              </div>
              <Text className={styles.kpiValue}>{card.value}</Text>
              <Text className={styles.kpiSubtext}>{card.subtext}</Text>
            </button>
          );
        })}
      </div>

      {}
      <div className={styles.chartsRow}>
        {}
        <div className={styles.chartCard}>
          <Text className={styles.chartTitle}>{strings.DashboardJobsByStatus}</Text>
          {summary.statusData.length > 0 ? (
            <div className={styles.donutWrap}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={summary.statusData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="55%"
                    outerRadius="80%"
                    paddingAngle={2}
                    stroke={tokens.colorNeutralBackground1}
                    strokeWidth={2}
                    isAnimationActive={chartsAnimate}
                    animationDuration={motionTokens.durationSlow}
                    animationEasing="ease-out"
                  >
                    {summary.statusData.map((entry) => (
                      <Cell key={entry.status} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={FluentTooltip as never} />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{ fontSize: '12px', color: tokens.colorNeutralForeground2 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className={styles.donutCenter}>
                <span className={styles.donutCenterValue}>{summary.total}</span>
                <span className={styles.donutCenterLabel}>{strings.DashboardTotalJobs}</span>
              </div>
              <ChartDataTable
                caption={strings.DashboardJobsByStatus}
                columns={[strings.JobColumnStatus, strings.DashboardTotalJobs]}
                rows={summary.statusData.map((d) => [d.name, d.value])}
              />
            </div>
          ) : (
            <div className={styles.emptyChart}>{strings.DashboardNoActivity}</div>
          )}
        </div>

        {}
        <div className={styles.chartCard}>
          <Text className={styles.chartTitle}>{strings.DashboardJobsByType}</Text>
          {summary.typeData.length > 0 ? (
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={summary.typeData}
                  layout="vertical"
                  margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={tokens.colorNeutralStroke2} horizontal={false} />
                  <XAxis type="number" stroke={tokens.colorNeutralForeground3} fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke={tokens.colorNeutralForeground2}
                    fontSize={12}
                    width={90}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    content={FluentTooltip as never}
                    cursor={{ fill: tokens.colorNeutralBackground1Hover }}
                  />
                  <Bar
                    dataKey="value"
                    name={strings.DashboardJobsByType}
                    radius={[0, 6, 6, 0]}
                    isAnimationActive={chartsAnimate}
                    animationDuration={motionTokens.durationSlow}
                  >
                    {summary.typeData.map((entry) => (
                      <Cell key={entry.type} fill={TYPE_COLORS[entry.type]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <ChartDataTable
                caption={strings.DashboardJobsByType}
                columns={[strings.JobColumnType, strings.DashboardTotalJobs]}
                rows={summary.typeData.map((d) => [d.name, d.value])}
              />
            </div>
          ) : (
            <div className={styles.emptyChart}>{strings.DashboardNoActivity}</div>
          )}
        </div>
      </div>

      {}
      <div className={styles.chartCard}>
        <Text className={styles.chartTitle}>{strings.DashboardTrend7Days}</Text>
        {summary.hasTrend ? (
          <div className={styles.trendChartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={summary.trendData} margin={{ top: 8, right: 16, bottom: 4, left: -16 }}>
                <defs>
                  <linearGradient id="gradCompleted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={STATUS_COLORS.Completed} stopOpacity={0.85} />
                    <stop offset="95%" stopColor={STATUS_COLORS.Completed} stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="gradFailed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={STATUS_COLORS.Failed} stopOpacity={0.75} />
                    <stop offset="95%" stopColor={STATUS_COLORS.Failed} stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="gradPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={STATUS_COLORS.PendingApproval} stopOpacity={0.65} />
                    <stop offset="95%" stopColor={STATUS_COLORS.PendingApproval} stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="gradRunning" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={STATUS_COLORS.Running} stopOpacity={0.65} />
                    <stop offset="95%" stopColor={STATUS_COLORS.Running} stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="0"
                  stroke={tokens.colorNeutralStroke3}
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  stroke={tokens.colorNeutralForeground3}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  dy={8}
                />
                <YAxis
                  stroke={tokens.colorNeutralForeground3}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                  width={28}
                />
                <Tooltip content={FluentTooltip as never} cursor={{ stroke: tokens.colorNeutralStroke2, strokeWidth: 1 }} />
                <Legend
                  verticalAlign="top"
                  iconType="circle"
                  iconSize={10}
                  wrapperStyle={{ fontSize: '12px', paddingBottom: '12px' }}
                />
                <Area
                  type="natural"
                  dataKey="Completed"
                  stackId="1"
                  stroke={STATUS_COLORS.Completed}
                  strokeWidth={2}
                  fill="url(#gradCompleted)"
                  activeDot={{ r: 4, strokeWidth: 2, stroke: tokens.colorNeutralBackground1 }}
                  isAnimationActive={chartsAnimate}
                  animationDuration={motionTokens.durationSlow}
                />
                <Area
                  type="natural"
                  dataKey="Running"
                  stackId="1"
                  stroke={STATUS_COLORS.Running}
                  strokeWidth={2}
                  fill="url(#gradRunning)"
                  activeDot={{ r: 4, strokeWidth: 2, stroke: tokens.colorNeutralBackground1 }}
                  isAnimationActive={chartsAnimate}
                  animationDuration={motionTokens.durationSlow}
                />
                <Area
                  type="natural"
                  dataKey="Pending"
                  stackId="1"
                  stroke={STATUS_COLORS.PendingApproval}
                  strokeWidth={2}
                  fill="url(#gradPending)"
                  activeDot={{ r: 4, strokeWidth: 2, stroke: tokens.colorNeutralBackground1 }}
                  isAnimationActive={chartsAnimate}
                  animationDuration={motionTokens.durationSlow}
                />
                <Area
                  type="natural"
                  dataKey="Failed"
                  stackId="1"
                  stroke={STATUS_COLORS.Failed}
                  strokeWidth={2}
                  fill="url(#gradFailed)"
                  activeDot={{ r: 4, strokeWidth: 2, stroke: tokens.colorNeutralBackground1 }}
                  isAnimationActive={chartsAnimate}
                  animationDuration={motionTokens.durationSlow}
                />
              </AreaChart>
            </ResponsiveContainer>
            <ChartDataTable
              caption={strings.DashboardTrend7Days}
              columns={[strings.DashboardDays, strings.DashboardTotalJobs]}
              rows={summary.trendData.map((d) => [d.day, d.total])}
            />
          </div>
        ) : (
          <div className={styles.emptyChart}>{strings.DashboardNoActivity}</div>
        )}
      </div>

      {}
      <div className={styles.chartCard}>
        <Text className={styles.chartTitle}>{strings.DashboardOverviewTitle}</Text>
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <Text className={styles.statLabel}>{strings.DashboardTotalJobs}:</Text>
            <Text className={styles.statValue}>{summary.total}</Text>
          </div>
          <div className={styles.statItem}>
            <Text className={styles.statLabel}>{strings.DashboardSuccessRate}:</Text>
            <Text className={styles.statValue}>{summary.successRate}%</Text>
          </div>
          <div className={styles.statItem}>
            <People24Regular style={{ color: tokens.colorBrandForeground1 }} />
            <Text className={styles.statLabel}>{strings.DashboardOnboarding}:</Text>
            <Text className={styles.statValue}>{summary.onboardCount}</Text>
          </div>
          <div className={styles.statItem}>
            <PersonSubtract24Regular style={{ color: tokens.colorPaletteRedForeground3 }} />
            <Text className={styles.statLabel}>{strings.DashboardOffboarding}:</Text>
            <Text className={styles.statValue}>{summary.offboardCount}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};