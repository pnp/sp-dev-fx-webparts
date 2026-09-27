import * as React from 'react';
import {
  Button,
  FluentProvider,
  makeStyles,
  mergeClasses,
  MessageBar,
  MessageBarBody,
  Skeleton,
  SkeletonItem,
  tokens
} from '@fluentui/react-components';
import { CalendarLtr28Regular } from '@fluentui/react-icons';
import * as strings from 'EventsLayoutsWebPartStrings';
import { DateRangeKey, LayoutType } from '../models';
import { createFormatter } from '../common/formatter';
import { useContainerSize } from '../common/useContainerSize';
import { IEventsLayoutsProps } from './IEventsLayoutsProps';
import { IEventsContext, EventsContext } from './EventsContext';
import { EventsHeader } from './EventsHeader';
import { useEvents } from './useEvents';
import { ILayoutProps } from './layouts/ILayoutProps';
import { AgendaLayout } from './layouts/AgendaLayout';
import { GridLayout } from './layouts/GridLayout';
import { ListLayout } from './layouts/ListLayout';
import { FilmstripLayout } from './layouts/FilmstripLayout';
import { CarouselLayout } from './layouts/CarouselLayout';
import { TimelineLayout } from './layouts/TimelineLayout';

const LAYOUTS: Record<LayoutType, React.FC<ILayoutProps>> = {
  agenda: AgendaLayout,
  grid: GridLayout,
  list: ListLayout,
  filmstrip: FilmstripLayout,
  carousel: CarouselLayout,
  timeline: TimelineLayout
};

/** Layouts that manage their own height; the others scroll inside a fixed height. */
const SELF_SIZED: LayoutType[] = ['carousel', 'filmstrip'];

const useStyles = makeStyles({
  body: { minWidth: 0 },
  scroll: { overflowY: 'auto', paddingRight: tokens.spacingHorizontalXS },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalXXL} ${tokens.spacingHorizontalL}`,
    textAlign: 'center',
    color: tokens.colorNeutralForeground3,
    border: `1px dashed ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusLarge
  },
  emptyTitle: { margin: 0, fontSize: tokens.fontSizeBase400, fontWeight: tokens.fontWeightSemibold, color: tokens.colorNeutralForeground1 },
  emptyText: { margin: 0 },
  skeleton: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL },
  skeletonRow: { display: 'grid', gridTemplateColumns: '64px 1fr', gap: tokens.spacingHorizontalL, alignItems: 'center' },
  skeletonLines: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS },
  message: { marginBottom: tokens.spacingVerticalM }
});

const LoadingState: React.FC = () => {
  const styles = useStyles();
  return (
    <Skeleton className={styles.skeleton} aria-busy="true">
      {[0, 1, 2].map(row => (
        <div key={row} className={styles.skeletonRow}>
          <SkeletonItem shape="square" size={64} />
          <div className={styles.skeletonLines}>
            <SkeletonItem size={16} style={{ width: '60%' }} />
            <SkeletonItem size={12} />
            <SkeletonItem size={12} style={{ width: '40%' }} />
          </div>
        </div>
      ))}
    </Skeleton>
  );
};

const EmptyState: React.FC<{ title?: string; text: string; onConfigure?: () => void }> = ({ title, text, onConfigure }) => {
  const styles = useStyles();
  return (
    <div className={styles.empty} role="status">
      <CalendarLtr28Regular />
      {title && <h3 className={styles.emptyTitle}>{title}</h3>}
      <p className={styles.emptyText}>{text}</p>
      {onConfigure && <Button appearance="primary" onClick={onConfigure}>{strings.Configure}</Button>}
    </div>
  );
};

/** Everything inside the FluentProvider, so styles resolve with the right theme and direction. */
const EventsContent: React.FC<IEventsLayoutsProps> = props => {
  const styles = useStyles();
  const [containerRef, size] = useContainerSize<HTMLDivElement>();
  const [range, setRange] = React.useState<DateRangeKey>(props.dateRange);
  const { status, events, failedSources } = useEvents(props.service, props.sources, range, props.maxEvents);

  // The property pane default wins whenever an author changes it.
  React.useEffect(() => setRange(props.dateRange), [props.dateRange]);

  const context = React.useMemo<IEventsContext>(() => ({
    formatter: createFormatter(props.locale, strings.AllDay),
    display: props.display,
    dir: props.dir
  }), [props.locale, props.display, props.dir]);

  const Layout = LAYOUTS[props.layout] || AgendaLayout;
  const fixedHeight = props.height > 0 && SELF_SIZED.indexOf(props.layout) < 0;

  const renderBody = (): React.ReactNode => {
    switch (status) {
      case 'loading':
        return <LoadingState />;
      case 'noSource':
        return <EmptyState title={strings.NoSourceTitle} text={strings.NoSourceDescription} onConfigure={props.onConfigure} />;
      case 'error':
        return <MessageBar intent="error"><MessageBarBody>{strings.LoadError}</MessageBarBody></MessageBar>;
      default:
        return (
          <>
            {failedSources.length > 0 && (
              <MessageBar intent="warning" className={styles.message}>
                <MessageBarBody>{strings.PartialError.replace('{0}', failedSources.join(', '))}</MessageBarBody>
              </MessageBar>
            )}
            {events.length
              ? <Layout events={events} size={size} autoplay={props.autoplay} height={props.height} />
              : <EmptyState text={strings.NoEvents} />}
          </>
        );
    }
  };

  return (
    <EventsContext.Provider value={context}>
      <div ref={containerRef} data-size={size}>
        <EventsHeader
          title={props.title}
          range={range}
          showDateFilter={props.showDateFilter}
          seeAllUrl={props.seeAllUrl}
          onRangeChange={setRange}
        />
        <div
          className={mergeClasses(styles.body, fixedHeight && styles.scroll)}
          style={fixedHeight ? { maxHeight: props.height } : undefined}
        >
          {renderBody()}
        </div>
      </div>
    </EventsContext.Provider>
  );
};

// Transparent so section backgrounds (neutral, soft, strong, image) show through.
const PROVIDER_STYLE: React.CSSProperties = { backgroundColor: 'transparent' };

export const EventsLayouts: React.FC<IEventsLayoutsProps> = props => (
  <FluentProvider theme={props.theme} dir={props.dir} style={PROVIDER_STYLE}>
    <EventsContent {...props} />
  </FluentProvider>
);

export default EventsLayouts;
