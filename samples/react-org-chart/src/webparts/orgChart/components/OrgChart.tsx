import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@fluentui/react';
import styles from './OrgChart.module.scss';
import { IOrgChartProps } from './IOrgChartProps';
import { IOrgNode } from '../models/IOrgNode';
import { OrgService } from '../services/OrgService';
import StartFromPicker from './StartFromPicker';

const MAX_DEPTH = 5;
const ZOOM_MIN = 0.4;
const ZOOM_MAX = 2;

const LAYOUT_CLASS: Record<string, string | undefined> = {
  card: styles.layoutCard,
  minimal: styles.layoutMinimal,
  bold: styles.layoutBold,
  compact: styles.layoutCompact
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0] ? parts[0][0] : '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase() || '?';
}

function photoFor(node: IOrgNode, webUrl: string): string {
  return node.email ? `${webUrl}/_layouts/15/userphoto.aspx?size=M&accountname=${encodeURIComponent(node.email)}` : '';
}

/** Map a Graph presence availability to a dot colour class. */
function presenceClassFor(a: string | undefined): string | undefined {
  if (!a) { return undefined; }
  if (a === 'Available' || a === 'AvailableIdle') { return styles.dotGreen; }
  if (a === 'Away' || a === 'BeRightBack') { return styles.dotYellow; }
  if (a === 'Busy' || a === 'BusyIdle' || a === 'DoNotDisturb') { return styles.dotRed; }
  if (a === 'Offline' || a === 'PresenceUnknown') { return styles.dotGrey; }
  return styles.dotGrey;
}

const Avatar: React.FC<{ node: IOrgNode; webUrl: string; showPhoto: boolean; avatarClass: string; presence?: string }> = (p) => {
  const [failed, setFailed] = useState(false);
  const url = photoFor(p.node, p.webUrl);
  const dotCls = presenceClassFor(p.presence);
  return (
    <span className={styles.avatarWrap}>
      {p.showPhoto && url && !failed
        ? <img className={p.avatarClass} src={url} alt="" aria-hidden="true" onError={() => setFailed(true)} />
        : <span className={p.avatarClass} aria-hidden="true">{initials(p.node.name)}</span>}
      {dotCls && <span className={`${styles.presenceDot} ${dotCls}`} title={p.presence} aria-hidden="true" />}
    </span>
  );
};

/** email / Teams chat / Teams call / profile links. No consent needed. */
const ActionBar: React.FC<{ node: IOrgNode; webUrl: string; className: string }> = (p) => {
  const email = p.node.email;
  if (!email) { return null; }
  const enc = encodeURIComponent(email);
  const stop = (e: React.MouseEvent): void => { e.stopPropagation(); };
  return (
    <div className={p.className} onClick={stop}>
      <a className={styles.action} href={`mailto:${email}`} title={`Email ${p.node.name}`} aria-label={`Email ${p.node.name}`}><Icon iconName="Mail" /></a>
      <a className={styles.action} href={`https://teams.microsoft.com/l/chat/0/0?users=${enc}`} target="_blank" rel="noopener noreferrer" title={`Chat with ${p.node.name} in Teams`} aria-label={`Chat with ${p.node.name} in Teams`}><Icon iconName="Chat" /></a>
      <a className={styles.action} href={`https://teams.microsoft.com/l/call/0/0?users=${enc}`} target="_blank" rel="noopener noreferrer" title={`Call ${p.node.name} in Teams`} aria-label={`Call ${p.node.name} in Teams`}><Icon iconName="Phone" /></a>
      <a className={styles.action} href={`${p.webUrl}/_layouts/15/me.aspx?p=${enc}&v=work`} target="_blank" rel="noopener noreferrer" title={`Open ${p.node.name}'s profile`} aria-label={`Open ${p.node.name}'s profile`}><Icon iconName="ContactCard" /></a>
    </div>
  );
};

/* ---------- Horizontal "tree" view node (boxed) ---------- */
interface INodeProps {
  node: IOrgNode;
  webUrl: string;
  showPhoto: boolean;
  enableActions: boolean;
  emphasis?: boolean;
  presence?: string;
  drillHint?: string;
  onDrill?: (node: IOrgNode) => void;
}

const Node: React.FC<INodeProps> = (p) => {
  const avatarCls = p.emphasis ? `${styles.avatar} ${styles.avatarBig}` : styles.avatar;
  const drillable = !!(p.drillHint && p.onDrill && p.node.account);
  const onKey = (e: React.KeyboardEvent): void => {
    if (drillable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); if (p.onDrill) { p.onDrill(p.node); } }
  };
  return (
    <div className={`${styles.node} ${p.emphasis ? styles.nodeMe : ''}`}>
      <div
        className={drillable ? `${styles.nodeMain} ${styles.drillable}` : styles.nodeMain}
        role={drillable ? 'button' : undefined}
        tabIndex={drillable ? 0 : undefined}
        title={drillable ? p.drillHint : undefined}
        aria-label={drillable ? p.drillHint : undefined}
        onClick={drillable && p.onDrill ? () => p.onDrill!(p.node) : undefined}
        onKeyDown={drillable ? onKey : undefined}
      >
        <Avatar node={p.node} webUrl={p.webUrl} showPhoto={p.showPhoto} avatarClass={avatarCls} presence={p.presence} />
        <span className={styles.nodeName}>{p.node.name}</span>
        {p.node.title && <span className={styles.nodeTitle}>{p.node.title}</span>}
      </div>
      {p.enableActions && <ActionBar node={p.node} webUrl={p.webUrl} className={styles.actions} />}
    </div>
  );
};

/* ---------- Teams-style row card ---------- */
interface IRowProps {
  node: IOrgNode;
  webUrl: string;
  showPhoto: boolean;
  enableActions: boolean;
  emphasis?: boolean;
  presence?: string;
  drillHint?: string;
  onDrill?: (node: IOrgNode) => void;
  expandable?: boolean;
  expanded?: boolean;
  loadingChildren?: boolean;
  onToggle?: () => void;
}

const RowNode: React.FC<IRowProps> = (p) => {
  const drillable = !!(p.drillHint && p.onDrill && p.node.account);
  const onKey = (e: React.KeyboardEvent): void => {
    if (drillable && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); if (p.onDrill) { p.onDrill(p.node); } }
  };
  return (
    <div className={`${styles.rowNode} ${p.emphasis ? styles.rowMe : ''}`}>
      <div
        className={drillable ? `${styles.rowBody} ${styles.rowDrillable}` : styles.rowBody}
        role={drillable ? 'button' : undefined}
        tabIndex={drillable ? 0 : undefined}
        title={drillable ? p.drillHint : undefined}
        aria-label={drillable ? p.drillHint : undefined}
        onClick={drillable && p.onDrill ? () => p.onDrill!(p.node) : undefined}
        onKeyDown={drillable ? onKey : undefined}
      >
        <Avatar node={p.node} webUrl={p.webUrl} showPhoto={p.showPhoto} avatarClass={styles.rowAvatar} presence={p.presence} />
        <div className={styles.rowText}>
          <span className={styles.rowName}>{p.node.name}</span>
          {p.node.title && <span className={styles.rowTitle}>{p.node.title}</span>}
        </div>
      </div>
      {p.enableActions && <ActionBar node={p.node} webUrl={p.webUrl} className={styles.rowActions} />}
      {p.expandable && (
        <button type="button" className={styles.expandBtn}
          aria-label={p.expanded ? `Collapse ${p.node.name}'s team` : `Expand ${p.node.name}'s team`}
          aria-expanded={!!p.expanded} title={p.expanded ? 'Collapse' : 'Expand team'}
          onClick={(e) => { e.stopPropagation(); if (p.onToggle) { p.onToggle(); } }}>
          <Icon iconName={p.loadingChildren ? 'Sync' : (p.expanded ? 'ChevronDownMed' : 'ChevronRightMed')} className={p.loadingChildren ? styles.spin : undefined} />
        </button>
      )}
    </div>
  );
};

/* ---------- Recursive, lazy-loading report branch (Teams view) ---------- */
interface IBranchProps {
  node: IOrgNode;
  service?: OrgService;
  webUrl: string;
  showPhoto: boolean;
  enableActions: boolean;
  depth: number;
  onDrill: (node: IOrgNode) => void;
  presenceOf: (email?: string) => string | undefined;
  fetchPresence: (emails: (string | undefined)[]) => void;
}

const ReportBranch: React.FC<IBranchProps> = (p) => {
  const [expanded, setExpanded] = useState(false);
  const [children, setChildren] = useState<IOrgNode[] | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const canExpand = !!(p.service && p.node.account && p.depth < MAX_DEPTH);

  const toggle = async (): Promise<void> => {
    if (!canExpand) { return; }
    if (children === undefined) {
      setLoading(true);
      try {
        const v = await p.service!.getView(p.node.account);
        const kids = await Promise.all(v.reportAccounts.map((a) => p.service!.resolve(a)));
        const list = kids.filter((k): k is IOrgNode => !!k);
        setChildren(list);
        p.fetchPresence(list.map((k) => k.email));
      } catch {
        setChildren([]);
      }
      setLoading(false);
      setExpanded(true);
      return;
    }
    setExpanded(!expanded);
  };

  return (
    <div className={styles.branch}>
      <RowNode node={p.node} webUrl={p.webUrl} showPhoto={p.showPhoto} enableActions={p.enableActions}
        presence={p.presenceOf(p.node.email)}
        drillHint={`Show ${p.node.name}'s team`} onDrill={p.onDrill}
        expandable={canExpand} expanded={expanded} loadingChildren={loading} onToggle={toggle} />
      {expanded && children && (
        <div className={styles.reportList}>
          {children.length === 0 && <div className={styles.branchEmpty}>No direct reports.</div>}
          {children.map((c, i) => (
            <ReportBranch key={c.account || c.email || `b${i}`} node={c} service={p.service} webUrl={p.webUrl}
              showPhoto={p.showPhoto} enableActions={p.enableActions} depth={p.depth + 1} onDrill={p.onDrill}
              presenceOf={p.presenceOf} fetchPresence={p.fetchPresence} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrgChart: React.FC<IOrgChartProps> = (props) => {
  const {
    title, view, layout, showTitle, frameStyle, showPhoto, webUrl, accent,
    overlayBg, overlayText, overlayBar,
    isDemo, demoManager, demoMe, demoReports, service, rootAccount, maxReports, enableActions, showExport, presenceProvider
  } = props;

  const [history, setHistory] = useState<IOrgNode[]>([]);
  const [center, setCenter] = useState<IOrgNode | undefined>(undefined);
  const [managerChain, setManagerChain] = useState<IOrgNode[]>([]);
  const [reports, setReports] = useState<IOrgNode[]>([]);
  const [loading, setLoading] = useState<boolean>(!isDemo);
  const [error, setError] = useState<string | undefined>(undefined);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const [zoom, setZoom] = useState<number>(1);

  const presenceRef = useRef<Record<string, string>>({});
  const [, setPresenceVersion] = useState<number>(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  const style = useMemo(
    () => ({ ...frameStyle, ['--accent' as string]: accent } as React.CSSProperties),
    [accent, frameStyle]
  );
  const layoutClass = LAYOUT_CLASS[layout] || styles.layoutCard;
  const isTeams = view !== 'tree';

  const fetchPresence = useCallback((emails: (string | undefined)[]): void => {
    if (!presenceProvider) { return; }
    const need: string[] = [];
    emails.forEach((e) => {
      if (e) {
        const k = e.toLowerCase();
        if (!(k in presenceRef.current)) { presenceRef.current[k] = ''; need.push(e); }
      }
    });
    if (need.length === 0) { return; }
    presenceProvider(need).then((map) => {
      Object.keys(map).forEach((k) => { presenceRef.current[k.toLowerCase()] = map[k]; });
      setPresenceVersion((v) => v + 1);
    }).catch(() => { /* ignore presence errors */ });
  }, [presenceProvider]);

  const presenceOf = useCallback((email?: string): string | undefined => {
    if (!email) { return undefined; }
    const v = presenceRef.current[email.toLowerCase()];
    return v ? v : undefined;
  }, []);

  const load = useCallback(async (account: string | undefined): Promise<IOrgNode | undefined> => {
    if (!service) { return undefined; }
    setLoading(true); setError(undefined); setShowAll(false);
    try {
      const v = await service.getView(account);
      const chain = await Promise.all(v.managerChainAccounts.map((a) => service.resolve(a)));
      const resolved = await Promise.all(v.reportAccounts.map((a) => service.resolve(a)));
      setCenter(v.me);
      setManagerChain(chain.filter((m): m is IOrgNode => !!m));
      setReports(resolved.filter((r): r is IOrgNode => !!r));
      setLoading(false);
      return v.me;
    } catch {
      setError('Could not load the org chart.');
      setCenter(undefined); setManagerChain([]); setReports([]);
      setLoading(false);
      return undefined;
    }
  }, [service]);

  useEffect(() => {
    if (isDemo || !service) { setLoading(false); return; }
    load(rootAccount || undefined).then((me) => { if (me) { setHistory([me]); } }).catch(() => { /* handled in load */ });
  }, [isDemo, service, rootAccount, load]);

  // Fetch presence for the main visible set whenever it changes.
  useEffect(() => {
    if (!presenceProvider) { return; }
    const emails: (string | undefined)[] = [];
    managerChain.forEach((m) => emails.push(m.email));
    if (center) { emails.push(center.email); }
    reports.forEach((r) => emails.push(r.email));
    fetchPresence(emails);
  }, [presenceProvider, managerChain, center, reports, fetchPresence]);

  // While the explorer is open, inject a print stylesheet so only the chart prints.
  useEffect(() => {
    if (!fullscreen) { return undefined; }
    const id = 'org-explorer-print-style';
    if (!document.getElementById(id)) {
      const el = document.createElement('style');
      el.id = id;
      el.textContent = '@media print {'
        + 'body > *:not(#org-explorer-overlay){display:none !important;}'
        + '#org-explorer-overlay{position:static !important;height:auto !important;overflow:visible !important;background:#fff !important;}'
        + '#org-explorer-overlay [data-noprint]{display:none !important;}'
        + '#org-explorer-overlay [data-org-canvas]{overflow:visible !important;padding:16px !important;}'
        + '#org-explorer-overlay [data-org-canvasinner]{transform:none !important;width:auto !important;}'
        + '}';
      document.head.appendChild(el);
    }
    return () => {
      const e = document.getElementById(id);
      if (e && e.parentNode) { e.parentNode.removeChild(e); }
    };
  }, [fullscreen]);

  // Focus trap + Escape-to-close for the explorer dialog.
  useEffect(() => {
    if (!fullscreen) { return undefined; }
    const prev = (document.activeElement as HTMLElement) || undefined;
    const root = overlayRef.current;
    const getFocusable = (): HTMLElement[] => {
      if (!root) { return []; }
      const nodes = root.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])');
      const list: HTMLElement[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const el = nodes[i] as HTMLElement;
        if (el.offsetParent !== null) { list.push(el); }
      }
      return list;
    };
    const first = getFocusable()[0];
    if (first) { first.focus(); } else if (root) { root.focus(); }
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') { e.preventDefault(); setFullscreen(false); return; }
      if (e.key === 'Tab') {
        const f = getFocusable();
        if (f.length === 0) { return; }
        const firstEl = f[0];
        const lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => {
      document.removeEventListener('keydown', onKey, true);
      if (prev && prev.focus) { prev.focus(); }
    };
  }, [fullscreen]);

  const drill = useCallback(async (node: IOrgNode): Promise<void> => {
    if (!node.account || (center && node.account === center.account)) { return; }
    let idx = -1;
    for (let i = 0; i < history.length; i++) {
      if (history[i].account === node.account) { idx = i; break; }
    }
    const me = await load(node.account);
    if (!me) { return; }
    setHistory(idx >= 0 ? history.slice(0, idx + 1) : [...history, me]);
  }, [center, history, load]);

  const jumpTo = useCallback(async (i: number): Promise<void> => {
    const target = history[i];
    if (!target || !target.account) { return; }
    const me = await load(target.account);
    if (me) { setHistory(history.slice(0, i + 1)); }
  }, [history, load]);

  const goHome = useCallback(async (): Promise<void> => {
    const me = await load(rootAccount || undefined);
    if (me) { setHistory([me]); }
  }, [load, rootAccount]);

  const goTo = useCallback(async (account: string): Promise<void> => {
    if (!account) { await goHome(); return; }
    const me = await load(account);
    if (me) { setHistory([me]); }
  }, [goHome, load]);

  const effChain = isDemo ? (demoManager ? [demoManager] : []) : managerChain;
  const effMe = isDemo ? demoMe : center;
  const effReports = isDemo ? (demoReports || []) : reports;
  const immediateManager = effChain.length > 0 ? effChain[effChain.length - 1] : undefined;
  const drillHintFor = (n: IOrgNode): string | undefined => (isDemo ? undefined : `Show ${n.name}'s team`);

  const cap = maxReports > 0 && !showAll && effReports.length > maxReports;
  const shownReports = cap ? effReports.slice(0, maxReports) : effReports;
  const showAllBtn = cap
    ? <button type="button" className={styles.showAll} onClick={() => setShowAll(true)}>Show all {effReports.length} reports</button>
    : null;

  const breadcrumbEl = (!isDemo && history.length > 1) ? (
    <nav className={styles.toolbar} aria-label="Org chart path">
      <button type="button" className={styles.crumbBtn} onClick={goHome} title="Back to the top person">
        <Icon iconName="Home" /> <span>{history[0] ? history[0].name : 'Top'}</span>
      </button>
      {history.slice(1).map((h, i) => (
        <React.Fragment key={h.account || `c${i}`}>
          <Icon iconName="ChevronRightSmall" className={styles.sep} />
          <button type="button" className={styles.crumbBtn} onClick={() => jumpTo(i + 1)}>{h.name}</button>
        </React.Fragment>
      ))}
    </nav>
  ) : null;

  const treeBody = (!loading && !error && effMe) ? (
    isTeams ? (
      <div className={styles.teams}>
        {effChain.map((m, i) => (
          <div key={m.account || `m${i}`} className={styles.managerWrap}>
            <RowNode node={m} webUrl={webUrl} showPhoto={showPhoto} enableActions={enableActions}
              presence={presenceOf(m.email)} drillHint={drillHintFor(m)} onDrill={drill} />
            <div className={styles.vline} aria-hidden="true" />
          </div>
        ))}
        <RowNode node={effMe} webUrl={webUrl} showPhoto={showPhoto} enableActions={enableActions}
          presence={presenceOf(effMe.email)} emphasis />
        {shownReports.length > 0 && (
          <div className={styles.reportList}>
            {shownReports.map((r, i) => (
              <ReportBranch key={r.account || r.email || `r${i}`} node={r} service={isDemo ? undefined : service}
                webUrl={webUrl} showPhoto={showPhoto} enableActions={enableActions} depth={0} onDrill={drill}
                presenceOf={presenceOf} fetchPresence={fetchPresence} />
            ))}
          </div>
        )}
        {showAllBtn}
      </div>
    ) : (
      <div className={styles.tree}>
        {immediateManager && (
          <>
            <div className={styles.row}>
              <Node node={immediateManager} webUrl={webUrl} showPhoto={showPhoto} enableActions={enableActions}
                presence={presenceOf(immediateManager.email)} drillHint={drillHintFor(immediateManager)} onDrill={drill} />
            </div>
            <div className={styles.connector} aria-hidden="true" />
          </>
        )}
        <div className={styles.row}>
          <Node node={effMe} webUrl={webUrl} showPhoto={showPhoto} enableActions={enableActions}
            presence={presenceOf(effMe.email)} emphasis />
        </div>
        {shownReports.length > 0 && (
          <>
            <div className={styles.connector} aria-hidden="true" />
            <div className={styles.reports}>
              {shownReports.map((r, i) => (
                <Node key={r.account || r.email || `r${i}`} node={r} webUrl={webUrl} showPhoto={showPhoto}
                  enableActions={enableActions} presence={presenceOf(r.email)} drillHint={drillHintFor(r)} onDrill={drill} />
              ))}
            </div>
          </>
        )}
        {showAllBtn}
      </div>
    )
  ) : null;

  const clampZoom = (z: number): number => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, z));

  const overlay = fullscreen ? createPortal(
    <div id="org-explorer-overlay" ref={overlayRef} tabIndex={-1}
      className={`${styles.org} ${styles.overlay} ${layoutClass} ${isTeams ? styles.viewTeams : styles.viewTree}`}
      style={{
        ['--accent' as string]: accent,
        ['--org-overlay-bg' as string]: overlayBg || '#faf9f8',
        ['--org-overlay-text' as string]: overlayText || '#201f1e',
        ['--org-overlay-bar' as string]: overlayBar || '#ffffff',
        ['--wp-card-bg' as string]: overlayBar || '#ffffff'
      } as React.CSSProperties}
      role="dialog" aria-modal="true" aria-label="Org explorer">
      <div className={styles.overlayBar} data-noprint="true">
        <strong className={styles.overlayTitle}>{title || 'Org chart'}</strong>
        {service && (
          <div className={styles.overlaySearch}>
            <StartFromPicker service={service} valueKey="" valueLabel="" onChange={(key) => { goTo(key).catch(() => { /* handled */ }); }} />
          </div>
        )}
        <div className={styles.zoomCtrls}>
          <button type="button" className={styles.zoomBtn} onClick={() => setZoom((z) => clampZoom(z - 0.1))} aria-label="Zoom out" title="Zoom out"><Icon iconName="Remove" /></button>
          <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
          <button type="button" className={styles.zoomBtn} onClick={() => setZoom((z) => clampZoom(z + 0.1))} aria-label="Zoom in" title="Zoom in"><Icon iconName="Add" /></button>
          <button type="button" className={styles.zoomBtn} onClick={() => setZoom(1)} aria-label="Reset zoom" title="Reset zoom"><Icon iconName="ZoomToFit" /></button>
        </div>
        {showExport && (
          <button type="button" className={styles.zoomBtn} onClick={() => window.print()} aria-label="Print or save as PDF" title="Print / Save as PDF"><Icon iconName="Print" /></button>
        )}
        <button type="button" className={styles.closeBtn} onClick={() => setFullscreen(false)} aria-label="Close" title="Close"><Icon iconName="Cancel" /></button>
      </div>
      <div className={styles.canvas} data-org-canvas="true">
        <div className={styles.canvasInner} data-org-canvasinner="true" style={{ ['--accent' as string]: accent, transform: `scale(${zoom})` } as React.CSSProperties}>
          {breadcrumbEl}
          {loading && <p className={styles.muted}>Loading...</p>}
          {error && !loading && <p className={styles.error}>{error}</p>}
          {treeBody}
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <section className={`${styles.org} ${layoutClass} ${isTeams ? styles.viewTeams : styles.viewTree}`} style={style}>
      {(showTitle || (!isDemo && service)) && (
        <div className={styles.header}>
          {showTitle && <h2 className={styles.heading}>{title || 'Team'}</h2>}
          {!isDemo && service && (
            <button type="button" className={styles.fsBtn} onClick={() => setFullscreen(true)} aria-label="Open full screen explorer" title="Full screen explorer">
              <Icon iconName="FullScreen" />
            </button>
          )}
        </div>
      )}
      {isDemo && <p className={styles.demoNote}>Demo mode. Deploy to a tenant to show your real, clickable reporting line.</p>}

      {breadcrumbEl}

      {loading && <p className={styles.muted}>Loading...</p>}
      {error && !loading && <p className={styles.error}>{error}</p>}
      {!loading && !error && !effMe && <p className={styles.muted}>No profile information available.</p>}

      {treeBody}
      {overlay}
    </section>
  );
};

export default OrgChart;
