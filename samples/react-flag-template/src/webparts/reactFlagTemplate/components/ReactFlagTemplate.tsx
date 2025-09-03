

import * as React from 'react';
import { IReactFlagTemplateProps } from './IReactFlagTemplateProps';
import styles from './ReactFlagTemplate.module.scss';
import { SPFI, spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

type FlagItem = { title: string; descr: string; icon: React.ReactNode; color: string };

export default class ReactFlagTemplate extends React.Component<IReactFlagTemplateProps, { items: FlagItem[]; loading: boolean; error?: string }> {
  private _sp: SPFI | null = null;

  constructor(props: IReactFlagTemplateProps) {
    super(props);
    this.state = { items: [], loading: true };
  }

  componentDidMount(): void {
    try {
      this._sp = spfi().using(SPFx(this.props.spfxContext));
      this.loadItems();
    } catch (e: any) {
      this.setState({ loading: false, error: e?.message ?? 'SP init failed' });
    }
  }

  async loadItems() {
    if (!this._sp || !this.props.listName) {
      this.setState({ loading: false, error: 'List name not set' });
      return;
    }
    try {
      const raw = await this._sp.web.lists.getByTitle(this.props.listName).items.select('Id', 'Title', 'Description', 'Icon', 'Color').top(10)();
      const fallbackPalette = ['#0B374D', '#1286A8', '#D2B53B', '#DA611E', '#AC2A1A'];
      const items: FlagItem[] = raw.map((r: any, idx: number) => {
        const colorStr: string | undefined = (r.Color && typeof r.Color === 'string') ? r.Color.trim() : undefined;
        const isHex = !!colorStr && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(colorStr);
        const color = isHex ? colorStr! : fallbackPalette[idx % fallbackPalette.length];
        return {
          title: r.Title ?? '',
          descr: r.Description ?? '',
          color,
          icon: this.renderIcon(r.Icon)
        };
      });
      this.setState({ items, loading: false });
    } catch (e: any) {
      this.setState({ loading: false, error: e?.message ?? 'Load failed' });
    }
  }

  renderIcon(iconName?: string): React.ReactNode {
    switch ((iconName || '').toLowerCase()) {
      case 'html':
      case 'html5':
        return (
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 16H48L44 48L32 52L20 48L16 16Z" fill="white" fillOpacity="0.1" />
            <path d="M32 44V36H40L41 28H32V24H44L43 32L40 44L32 48L24 44L21 32H32V36H24L25 44L32 48L39 44L40 36H32Z" fill="white" />
            <rect x="20" y="20" width="24" height="24" rx="4" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        );
      case 'css':
      case 'css3':
        return (
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="16" width="32" height="32" rx="6" stroke="white" strokeWidth="4" fill="none" />
            <path d="M24 40L32 24L40 40H24Z" fill="white" />
          </svg>
        );
      case 'js':
      case 'javascript':
        return (
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="16" width="32" height="32" rx="6" stroke="white" strokeWidth="4" fill="none" />
            <rect x="24" y="24" width="16" height="16" fill="white" />
            <text x="32" y="38" textAnchor="middle" fontSize="12" fill="#DA611E" fontWeight="bold">JS</text>
          </svg>
        );
      case 'codepen':
        return (
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="12" width="40" height="40" rx="8" stroke="white" strokeWidth="4" fill="none" />
            <path d="M32 20L44 28V44H20V28L32 20Z" stroke="white" strokeWidth="3" fill="none" />
          </svg>
        );
      case 'github':
        return (
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="24" stroke="white" strokeWidth="4" fill="none" />
            <path d="M40 36C40 38.2091 36.4183 40 32 40C27.5817 40 24 38.2091 24 36" stroke="white" strokeWidth="3" />
            <circle cx="32" cy="28" r="6" stroke="white" strokeWidth="2" />
          </svg>
        );
      default:
        return null;
    }
  }

  render() {
    const { items, loading, error } = this.state;
    return (
      <div className={styles.flagBannerRoot}>
        <h1>UL banner cards</h1>
        <div className={styles.bannerBar}></div>
        {loading && <div>Loading…</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <ul className={styles.flagList}>
            {items.map((flag, idx) => (
              <li key={idx} className={styles.flagListItem}>
                <div
                  className={styles.flag}
                  ref={(el: HTMLDivElement | null) => {
                    if (el) el.style.setProperty('--accent-color', flag.color);
                  }}
                >
                  <div className={styles.icon}>{flag.icon}</div>
                  <div className={styles.title}>{flag.title}</div>
                  <div className={styles.descr}>{flag.descr}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
