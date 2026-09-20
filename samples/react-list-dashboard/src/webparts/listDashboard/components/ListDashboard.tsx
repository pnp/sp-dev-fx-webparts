import * as React from 'react';
import { IListDashboardProps } from './IListDashboardProps';
import { DashboardService } from '../model/DashboardService';
import { IDashboardData } from '../model/dashboardTypes';
import { StatView } from './views/StatView';
import { TilesView } from './views/TilesView';
import { BarChart } from './views/BarChart';
import { ColumnChart } from './views/ColumnChart';
import { PieChart } from './views/PieChart';
import { LineChart } from './views/LineChart';
import { TableView } from './views/TableView';
import { buildColors, statusFor, statusColor, StatusLevel } from '../shared/chartPalette';
import styles from './ListDashboard.module.scss';

const ListDashboard: React.FunctionComponent<IListDashboardProps> = (props) => {
  const { config, spHttpClient, webUrl, accent, showTitle, title, frameStyle } = props;
  const [data, setData] = React.useState<IDashboardData | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>('');

  const cfgKey = JSON.stringify(config);
  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    const svc = new DashboardService(spHttpClient, webUrl);
    svc.getData(config)
      .then((d) => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch((e) => { if (!cancelled) { setError((e && e.message) || 'Could not load data.'); setLoading(false); } });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cfgKey, webUrl]);

  const catViews: string[] = ['tiles', 'bar', 'column', 'pie', 'donut', 'line', 'area'];
  const timeViews: string[] = ['line', 'area'];
  const needsCategory = catViews.indexOf(config.displayType) !== -1;
  const isTime = timeViews.indexOf(config.displayType) !== -1;

  let body: JSX.Element;
  if (loading) {
    body = <div className={styles.note} role="status">Loading&hellip;</div>;
  } else if (error) {
    body = <div className={styles.softError} role="alert">Could not load this list. {error}</div>;
  } else if (!data) {
    body = <div className={styles.note}>No data.</div>;
  } else if (needsCategory && !config.categoryField && !data.isDemo) {
    body = (
      <div className={styles.note}>
        {isTime ? 'Pick a Date field to show the trend.' : 'Pick a Group by field to show this chart.'}
      </div>
    );
  } else if (needsCategory && data.points.length === 0) {
    body = <div className={styles.note}>No items to show.</div>;
  } else {
    const values = data.points.map((p) => p.value);
    const fmt = { kind: config.numberFormat, decimals: config.decimals, currencySymbol: config.currencySymbol };

    // In status mode, colour every mark by its value vs the target thresholds and
    // surface a per-mark status level (glyph + label) so colour is never alone.
    let statuses: StatusLevel[] | undefined;
    let colors: string[];
    if (config.colorMode === 'status') {
      statuses = values.map((v) => statusFor(v, config.statusDirection, config.targetGood, config.targetWarn));
      colors = statuses.map((s) => statusColor(s));
    } else {
      colors = buildColors(values, config.colorMode, accent, false, config.palette);
    }

    const statStatus: StatusLevel | undefined = config.colorMode === 'status'
      ? statusFor(data.total, config.statusDirection, config.targetGood, config.targetWarn) : undefined;

    switch (config.displayType) {
      case 'stat': body = <StatView data={data} accent={accent} fmt={fmt} status={statStatus} />; break;
      case 'tiles': body = <TilesView data={data} accent={accent} colors={colors} showDataLabels={config.showDataLabels} fmt={fmt} statuses={statuses} />; break;
      case 'bar': body = <BarChart data={data} accent={accent} colors={colors} showDataLabels={config.showDataLabels} fmt={fmt} statuses={statuses} />; break;
      case 'column': body = <ColumnChart data={data} accent={accent} colors={colors} showDataLabels={config.showDataLabels} fmt={fmt} statuses={statuses} />; break;
      case 'pie':
      case 'donut': {
        const bg = (frameStyle && (frameStyle.backgroundColor || frameStyle.background)) as string;
        const surface = bg && bg !== 'transparent' ? bg : '#ffffff';
        body = <PieChart data={data} accent={accent} colors={colors} showDataLabels={config.showDataLabels} fmt={fmt} statuses={statuses} donut={config.displayType === 'donut'} surface={surface} />;
        break;
      }
      case 'line':
      case 'area':
        body = <LineChart data={data} accent={accent} showDataLabels={config.showDataLabels} fmt={fmt} statuses={statuses} area={config.displayType === 'area'} />;
        break;
      case 'table': body = <TableView rows={data.rows} fields={data.tableColumns || config.tableFields} />; break;
      default: body = <div className={styles.note}>Choose a display type.</div>;
    }
  }

  return (
    <section className={styles.listDashboard} style={frameStyle} aria-label={title || 'List dashboard'}>
      {showTitle && title ? <h2 className={styles.title}>{title}</h2> : null}
      {data && data.isDemo ? <div className={styles.demoBadge}>Demo data. Bind a list in the property pane.</div> : null}
      {body}
    </section>
  );
};

export default ListDashboard;
