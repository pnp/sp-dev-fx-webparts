import * as React from 'react';
import { useMemo } from 'react';
import styles from './ContentRollup.module.scss';
import { IContentRollupProps } from './IContentRollupProps';

const LAYOUT_CLASS: Record<string, string | undefined> = {
  card: styles.layoutCard,
  minimal: styles.layoutMinimal,
  bold: styles.layoutBold,
  compact: styles.layoutCompact
};

function niceDate(iso: string | undefined): string {
  if (!iso) { return ''; }
  const d = new Date(iso);
  return isNaN(d.getTime()) ? '' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

const ContentRollup: React.FC<IContentRollupProps> = (props) => {
  const { title, layout, showTitle, frameStyle, isDemo, accent, items, loading, error } = props;
  const style = useMemo(
    () => ({ ...frameStyle, ['--accent' as string]: accent } as React.CSSProperties),
    [accent, frameStyle]
  );
  const layoutClass = LAYOUT_CLASS[layout] || styles.layoutCard;

  return (
    <section className={`${styles.rollup} ${layoutClass}`} style={style}>
      {showTitle && <h2 className={styles.heading}>{title || 'News from across the organisation'}</h2>}
      {isDemo && <p className={styles.demoNote}>Demo mode. Deploy to a tenant to roll up real news.</p>}

      {loading && <p className={styles.muted}>Loading...</p>}
      {error && !loading && <p className={styles.error}>{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className={styles.muted}>No news found across your sites yet.</p>
      )}
      {!loading && !error && items.length > 0 && (
        <ul className={styles.list}>
          {items.map((n) => (
            <li key={n.id} className={styles.item}>
              <p className={styles.itemTitle}>
                {n.path
                  ? <a className={styles.link} href={n.path} target="_blank" rel="noreferrer">{n.title}</a>
                  : n.title}
              </p>
              <p className={styles.meta}>
                {n.site && <span className={styles.site}>{n.site}</span>}
                {n.date && <span>{niceDate(n.date)}</span>}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ContentRollup;
