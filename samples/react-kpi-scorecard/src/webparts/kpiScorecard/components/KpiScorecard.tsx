import {
  Body1,
  Button,
  Card,
  MessageBar,
  MessageBarBody,
  Spinner,
  Text
} from '@fluentui/react-components';
import {
  ArrowDownRegular,
  ArrowUpRegular,
  CheckmarkCircleFilled,
  DismissCircleFilled,
  QuestionCircleRegular,
  SubtractRegular,
  WarningFilled
} from '@fluentui/react-icons';
import * as React from 'react';
import * as strings from 'KpiScorecardWebPartStrings';
import type { KpiThresholdState, KpiTrend } from '../models/IKpiScorecard';
import { classifyKpiError, validateConfig } from '../services/KpiScorecardService';
import { safeDisplayDelta, safeDisplayNumber } from '../utils/kpiUtils';
import type { IKpiScorecardProps, IKpiScorecardState } from './IKpiScorecardProps';
import styles from './KpiScorecard.module.scss';

const initialState: IKpiScorecardState = { status: 'loading', cards: [] };
let nextId = 0;

const stateLabel: Record<KpiThresholdState, string> = {
  onTrack: strings.OnTrack,
  attention: strings.Attention,
  atRisk: strings.AtRisk,
  unknown: strings.Unknown
};

function thresholdIcon(state: KpiThresholdState): JSX.Element {
  switch (state) {
    case 'onTrack': return <CheckmarkCircleFilled />;
    case 'attention': return <WarningFilled />;
    case 'atRisk': return <DismissCircleFilled />;
    default: return <QuestionCircleRegular />;
  }
}

function trendIcon(trend: KpiTrend): JSX.Element {
  switch (trend) {
    case 'rising': return <ArrowUpRegular />;
    case 'falling': return <ArrowDownRegular />;
    case 'steady': return <SubtractRegular />;
    default: return <QuestionCircleRegular />;
  }
}

function thresholdClass(state: KpiThresholdState): string {
  return state === 'onTrack'
    ? styles.statusOnTrack
    : state === 'attention'
      ? styles.statusAttention
      : state === 'atRisk' ? styles.statusAtRisk : styles.statusUnknown;
}

function trendClass(trend: KpiTrend): string {
  return trend === 'rising'
    ? styles.trendUp
    : trend === 'falling'
      ? styles.trendDown
      : trend === 'steady' ? styles.trendSteady : styles.trendUnknown;
}

function updatedLabel(value: string | undefined): string {
  return value ? strings.Updated.replace('{0}', new Date(value).toLocaleDateString()) : strings.NoTrend;
}

const KpiScorecard: React.FC<IKpiScorecardProps> = ({ config, service, cardsTitle }) => {
  const [instanceId] = React.useState(() => `kpi-scorecard-${++nextId}`);
  const [state, setState] = React.useState<IKpiScorecardState>(initialState);
  const [retry, setRetry] = React.useState(0);
  const validationErrors = React.useMemo(() => validateConfig(config), [config]);
  const headingId = `${instanceId}-heading`;
  const requestId = React.useRef(0);

  React.useEffect(() => {
    if (validationErrors.length) {
      return undefined;
    }
    const currentRequest = ++requestId.current;
    setState({ status: 'loading', cards: [] });
    service.getCards(config).then((cards) => {
      if (currentRequest !== requestId.current) return;
      setState({ status: cards.length ? 'success' : 'empty', cards });
    }).catch((error: unknown) => {
      if (currentRequest !== requestId.current) return;
      const normalized = classifyKpiError(error);
      setState({ status: 'error', cards: [], errorKind: normalized.kind });
    });
    return () => {
      requestId.current += 1;
    };
  }, [config, retry, service, validationErrors.length]);

  if (validationErrors.length) {
    return (
      <section className={styles.root} aria-labelledby={`${instanceId}-setup-heading`}>
        <div className={styles.setup}>
          <h2 className={styles.setupTitle} id={`${instanceId}-setup-heading`}>{strings.SetupTitle}</h2>
          <Body1>{strings.SetupDescription}</Body1>
          <ul className={styles.setupList}>
            {validationErrors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>
      </section>
    );
  }

  const statusMessage = state.status === 'loading'
    ? strings.LoadingMessage
    : state.status === 'empty' ? strings.EmptyMessage : '';
  const errorMessage = state.errorKind === 'accessDenied'
    ? strings.AccessDeniedMessage
    : state.errorKind === 'notFound'
      ? strings.NotFoundMessage
      : state.errorKind === 'throttled' ? strings.ThrottledMessage : strings.GenericErrorMessage;

  return (
    <section className={styles.root} aria-labelledby={headingId} aria-busy={state.status === 'loading'}>
      <h2 className={styles.heading} id={headingId}>{cardsTitle || strings.DefaultTitle}</h2>
      <div className={styles.liveStatus} role="status" aria-live="polite">{statusMessage}</div>

      {state.status === 'loading' ? (
        <div className={styles.centered}>
          <Spinner label={strings.LoadingMessage} />
        </div>
      ) : null}

      {state.status === 'empty' ? (
        <div className={styles.centered} role="status">
          <Body1>{strings.EmptyMessage}</Body1>
        </div>
      ) : null}

      {state.status === 'error' ? (
        <div className={styles.error} role="alert">
          <MessageBar intent="error">
            <MessageBarBody>
              <Text weight="semibold">{strings.ErrorTitle}</Text>
              <div>{errorMessage}</div>
            </MessageBarBody>
          </MessageBar>
          <Button appearance="primary" onClick={() => setRetry((value) => value + 1)}>
            {strings.TryAgain}
          </Button>
        </div>
      ) : null}

      {state.status === 'success' ? (
        <div className={styles.cards} aria-label="KPI scorecard results">
          {state.cards.map((card) => (
            <Card className={styles.card} key={card.title} aria-label={`${card.title}: ${stateLabel[card.threshold]}`}>
              <Text className={styles.cardTitle}>{card.title}</Text>
              <div className={styles.valueRow}>
                <Text className={styles.value}>{safeDisplayNumber(card.value)}</Text>
                <span className={styles.target}>Target: {safeDisplayNumber(card.target)}</span>
              </div>
              <div className={`${styles.statusRow} ${thresholdClass(card.threshold)}`}>
                <span className={styles.statusMark} aria-hidden="true">{thresholdIcon(card.threshold)}</span>
                <span>Status: {stateLabel[card.threshold]}</span>
                <span>{card.status || strings.NoStatus}</span>
              </div>
              <div className={`${styles.trendRow} ${trendClass(card.trend)}`}>
                <span className={styles.statusMark} aria-hidden="true">{trendIcon(card.trend)}</span>
                <span>{card.trend === 'rising' ? strings.Rising : card.trend === 'falling' ? strings.Falling : card.trend === 'steady' ? strings.Steady : strings.NoTrend}</span>
                <span>{safeDisplayDelta(card.delta)}</span>
              </div>
              <div className={styles.updated}>{updatedLabel(card.updatedAt)}</div>
            </Card>
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default KpiScorecard;
