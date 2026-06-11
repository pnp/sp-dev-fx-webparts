import * as React from 'react';
import styles from './PageNavigator.module.scss';
import { IPageNavigatorProps } from './IPageNavigatorProps';
import { IPageNavigatorState } from './IPageNavigatorState';
import { Nav, INavLink } from '@fluentui/react/lib/Nav';
import { ITheme } from '@fluentui/react';

export default class PageNavigator extends React.Component<IPageNavigatorProps, IPageNavigatorState> {
  private _scrollTarget: Document | Element = document;

  constructor(props: IPageNavigatorProps) {
    super(props);

    this.state = {
      anchorLinks: [],
      selectedKey: ''
    };

    this.onLinkClick = this.onLinkClick.bind(this);
    this._onScroll = this._onScroll.bind(this);
  }

  public componentDidMount(): void {
    this.setState({ anchorLinks: this.props.anchorLinks, selectedKey: this.props.anchorLinks[0] ? this.props.anchorLinks[0].key : '' });
    this._scrollTarget = this._getScrollTarget();
    this._scrollTarget.addEventListener('scroll', this._onScroll, { passive: true });
  }

  public componentWillUnmount(): void {
    this._scrollTarget.removeEventListener('scroll', this._onScroll);
  }

  public componentDidUpdate(prevProps: IPageNavigatorProps): void {
    if (JSON.stringify(prevProps.anchorLinks) !== JSON.stringify(this.props.anchorLinks)) {
      this.setState({ anchorLinks: this.props.anchorLinks, selectedKey: this.props.anchorLinks[0] ? this.props.anchorLinks[0].key : '' });
    }
  }

  /**
   * Walk up from the webpart element to find the nearest scrollable ancestor,
   * falling back to the document so the listener always fires.
   */
  private _getScrollTarget(): Document | Element {
    const wpEl = document.querySelector("[id='" + this.props.webpartId + "']");
    if (!wpEl) return document;
    let el: Element | null = wpEl.parentElement;
    while (el && el !== document.body) {
      const style = window.getComputedStyle(el);
      const overflow = style.overflow + style.overflowY;
      if (/auto|scroll/.test(overflow)) return el;
      el = el.parentElement;
    }
    return document;
  }

  /** Flatten nested nav links to a plain array of keys (anchor hrefs). */
  private _flattenKeys(links: INavLink[]): string[] {
    const keys: string[] = [];
    const visit = (items: INavLink[]): void => {
      items.forEach(item => {
        if (item.key) keys.push(item.key);
        if (item.links && item.links.length) visit(item.links);
      });
    };
    visit(links);
    return keys;
  }

  private _onScroll(): void {
    const keys = this._flattenKeys(this.state.anchorLinks);
    if (!keys.length) return;

    // Determine the scroll offset relative to the viewport
    const scrollTop = this._scrollTarget === document
      ? (document.documentElement.scrollTop || document.body.scrollTop)
      : (this._scrollTarget as Element).scrollTop;

    // Offset threshold: treat a heading as "active" when it is within the top 20% of the viewport
    const threshold = window.innerHeight * 0.2;

    let activeKey = keys[0];
    for (const key of keys) {
      // key is the anchor href, e.g. "#my-heading"; the id on the element omits the "#"
      const id = key.charAt(0) === '#' ? key.slice(1) : key;
      const el = document.getElementById(id);
      if (!el) continue;

      const elTop = el.getBoundingClientRect().top +
        (this._scrollTarget === document ? 0 : (this._scrollTarget as Element).getBoundingClientRect().top * -1) +
        scrollTop;

      if (scrollTop + threshold >= elTop) {
        activeKey = key;
      }
    }

    if (activeKey !== this.state.selectedKey) {
      this.setState({ selectedKey: activeKey });
    }
  }

  private onLinkClick(ev: React.MouseEvent<HTMLElement>, item?: INavLink): void {
    this.setState({ selectedKey: item.key });
  }

  /**
   * Traverse up the DOM from the webpart stickyParentDistance times and then apply the relevant CSS to enable sticky mode to the right component
   * This does involve modifying HTML elements outside of the webpart, so could stop working in the future if Microsoft change their HTML\CSS etc.
   * At time of writing, stickyParentDistance = 1 works correctly for the component when configured on a vertical section as per the README.
   */
  private configureSticky(): void {

    let HTMLElementSticky: HTMLElement = document.querySelector("[id='" + this.props.webpartId + "']");
    const dist: number = parseInt(this.props.stickyParentDistance);
    if (isNaN(dist)) {
      console.log("Invalid parent distance "+this.props.stickyParentDistance);
      return;
    }

    if (HTMLElementSticky !== null) {
      for (let i=0; i<dist; i++) {
        if (HTMLElementSticky.parentElement === null) {
          console.log("Sticky Parent distance overflow: "+i);
          break;
        }
        HTMLElementSticky = HTMLElementSticky.parentElement;
      }
      if (this.props.stickyMode && window.innerWidth > 1024) {
        HTMLElementSticky.style.position = "Sticky";
        HTMLElementSticky.style.top = "0px";
      }
      else {
        HTMLElementSticky.style.position = "";
        HTMLElementSticky.style.top = "";
      }
    }
  }

  public render(): React.ReactElement<IPageNavigatorProps> {
    this.configureSticky();
    return (
      <div className={styles.pageNavigator}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <Nav selectedKey={this.state.selectedKey}
                onLinkClick={this.onLinkClick}
                groups={[{ links: this.state.anchorLinks }]}
                theme={this.props.themeVariant as ITheme}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
