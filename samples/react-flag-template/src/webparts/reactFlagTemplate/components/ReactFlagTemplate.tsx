import * as React from 'react';
import { IReactFlagTemplateProps } from './IReactFlagTemplateProps';
import styles from './ReactFlagTemplate.module.scss';
import { SPFI, spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

type FlagItem = {
  id: number;
  title: string;
  descr: string;
  iconUrl?: string;
  bgColor: string;
  textColor: string;
  url?: string;
};

interface RawItem {
  Id: number;
  Title?: string;
  Description?: string;
  Icon?: string | { Url?: string };
  Color?: string;
  BackgroundColor?: string;
  Url?: string | { Url?: string };
}

type ComponentState = { items: FlagItem[]; loading: boolean; error?: string };

export default class ReactFlagTemplate extends React.Component<
  IReactFlagTemplateProps,
  ComponentState
> {
  private _sp: SPFI | null = null;
  private _isMounted = false;
  private static readonly palette = ['#0B374D', '#1286A8', '#D2B53B', '#DA611E', '#AC2A1A'];
  private static readonly hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

  constructor(props: IReactFlagTemplateProps) {
    super(props);
    this.state = { items: [], loading: true };
  }

  async componentDidMount(): Promise<void> {
    this._isMounted = true;
    try {
      this._sp = spfi().using(SPFx(this.props.spfxContext));
      // Mark intentionally not awaited to satisfy no-floating-promises
      await this.loadItems();
    } catch (err) {
      this.fail(err, 'SP init failed');
    }
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  private getUrl(value: unknown): string | undefined {
    if (typeof value === 'string') return value.trim();
    if (value && typeof value === 'object' && 'Url' in value) {
      const u = (value as { Url?: unknown }).Url;
      if (typeof u === 'string') return u.trim();
    }
    return undefined;
  }

  private isHex(v: string | undefined): v is string {
    return !!v && ReactFlagTemplate.hexRegex.test(v);
  }

  private fail(err: unknown, fallback: string): void {
    const message =
      err instanceof Error ? err.message : typeof err === 'string' ? err : fallback;
    if (this._isMounted) this.setState({ loading: false, error: message || fallback });
  }

  async loadItems(): Promise<void> {
    if (!this._sp || !this.props.listName) {
      this.fail(undefined, 'List name not set');
      return;
    }
    try {
      const raw: RawItem[] = await this._sp.web.lists
        .getByTitle(this.props.listName)
        .items.select('Id', 'Title', 'Description', 'Icon', 'Color', 'BackgroundColor', 'Url')
        .top(50)();

      const items: FlagItem[] = raw.map((r, idx) => {
        const bgColorCandidate = this.getUrl(r.BackgroundColor);
        const textColorCandidate = this.getUrl(r.Color);
        const bgColor = this.isHex(bgColorCandidate)
          ? bgColorCandidate
          : ReactFlagTemplate.palette[idx % ReactFlagTemplate.palette.length];
        const textColor = this.isHex(textColorCandidate) ? textColorCandidate : '#FFFFFF';

        let iconUrl = this.getUrl(r.Icon);
        if (iconUrl && !/^(https?:)?\/\//i.test(iconUrl) && !/^data:/i.test(iconUrl)) {
          iconUrl = undefined;
        }

        const link = this.getUrl(r.Url);

        return {
          id: r.Id,
          title: r.Title ?? '',
          descr: r.Description ?? '',
          iconUrl,
          bgColor,
          textColor,
          url: link
        };
      });

      if (this._isMounted) this.setState({ items, loading: false, error: undefined });
    } catch (err) {
      this.fail(err, 'Load failed');
    }
  }

  private renderFlagContent(flag: FlagItem): JSX.Element {
    return (
      <div
        className={styles.flag}
        ref={el => {
          if (el) {
            el.style.setProperty('--accent-color', flag.bgColor);
            el.style.setProperty('--text-color', flag.textColor);
          }
        }}
      >
        {flag.iconUrl && (
          <div className={styles.icon}>
            <img src={flag.iconUrl} alt={flag.title || 'logo'} />
          </div>
        )}
        <div className={styles.title}>{flag.title}</div>
        {flag.descr && <div className={styles.descr}>{flag.descr}</div>}
      </div>
    );
  }

  public render(): JSX.Element {
    const { items, loading, error } = this.state;
    return (
      <div className={styles.flagBannerRoot}>
        <div className={styles.bannerBar} />
        {loading && <div>Loading…</div>}
        {error && <div>{error}</div>}
        {!loading && !error && (
          <ul className={styles.flagList}>
            {items.map(flag => (
              <li key={flag.id} className={styles.flagListItem}>
                {flag.url ? (
                  <a
                    href={flag.url}
                    className={styles.flagLink}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {this.renderFlagContent(flag)}
                  </a>
                ) : (
                  this.renderFlagContent(flag)
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
