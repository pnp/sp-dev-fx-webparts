import * as React from 'react';
import { Badge, Text, makeStyles, shorthands, tokens } from '@fluentui/react-components';
import * as strings from 'UpcStrings';
import { useServices } from '../../contexts/ServicesContext';
import type { ITelemetryEvent } from '../../services/telemetry/TelemetryService';

const useStyles = makeStyles({
  root: {
    ...shorthands.border(tokens.strokeWidthThin, 'solid', tokens.colorNeutralStroke2),
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalS,
    backgroundColor: tokens.colorNeutralBackground2,
    marginTop: tokens.spacingVerticalS
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
    display: 'block',
    marginBottom: tokens.spacingVerticalXS
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: tokens.fontFamilyMonospace,
    fontSize: tokens.fontSizeBase200
  },
  cell: {
    padding: `2px ${tokens.spacingHorizontalS}`,
    verticalAlign: 'top',
    wordBreak: 'break-word'
  },
  empty: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200
  }
});

function levelColor(level: string): 'danger' | 'warning' | 'informative' {
  if (level === 'error') return 'danger';
  if (level === 'warning') return 'warning';
  return 'informative';
}

function shortTime(iso: string): string {
  const at: number = iso.indexOf('T');
  return at === -1 ? iso : iso.slice(at + 1, at + 13);
}

function describe(evt: ITelemetryEvent): string {
  const props = evt.properties ?? {};
  return Object.keys(props)
    .map((k) => `${k}=${String(props[k])}`)
    .join(' ')
    .slice(0, 300);
}

export interface IDiagnosticsPanelProps {
  max?: number;
}

export const DiagnosticsPanel: React.FC<IDiagnosticsPanelProps> = ({ max = 12 }) => {
  const styles = useStyles();
  const services = useServices();
  const [, forceTick] = React.useState<number>(0);

  React.useEffect(() => {
    const timer: number = window.setInterval(() => forceTick((n) => n + 1), 2000);
    return () => window.clearInterval(timer);
  }, []);

  const events: ITelemetryEvent[] = services.telemetry.events.slice(-max);

  return (
    <div className={styles.root}>
      <Text className={styles.title}>{strings.DiagnosticsTitle}</Text>
      {events.length === 0 ? (
        <Text className={styles.empty}>{strings.DiagnosticsEmpty}</Text>
      ) : (
        <table className={styles.table}>
          <tbody>
            {events.map((evt, index) => (
              <tr key={`${evt.timestamp}-${index}`}>
                <td className={styles.cell}>{shortTime(evt.timestamp)}</td>
                <td className={styles.cell}>
                  <Badge appearance="tint" color={levelColor(evt.level)}>
                    {evt.name}
                  </Badge>
                </td>
                <td className={styles.cell}>{describe(evt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
