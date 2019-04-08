import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styles from './PageSectionsNavigation.module.scss';
import { IAnchorItem } from '../../../common/model';
import { css, getDocument, ICssInput } from 'office-ui-fabric-react/lib/Utilities';
import * as strings from 'PageSectionsNavigationStrings';
import Scrollparent from 'scrollparent';
import smoothscroll from 'smoothscroll-polyfill';
import { NavTheme, NavAlign, NavPosition } from '../../../common/types';

// kick off the polyfill!
smoothscroll.polyfill();

export interface IPageSectionsNavigationProps {
  anchors: IAnchorItem[];
  scrollBehavior: ScrollBehavior;
  position: NavPosition;
  theme: NavTheme;
  align: NavAlign;
  isEditMode: boolean;
  homeItem?: string;
}

export interface IPageSectionsNavigationState {
  isMounted?: boolean;
}


export class PageSectionsNavigation extends React.Component<IPageSectionsNavigationProps, IPageSectionsNavigationState> {
  // layer div to host navigation elements OUTSIDE of normal DOM hierarchy
  private _layerElement: HTMLElement | undefined;
  // parent node where the current component should be renderred
  private _host: Node;
  // span DOM element that is renderered IN normal DOM hierarchy
  private _sectionHostSpanRef = React.createRef<HTMLSpanElement>();
  // first scrollable parent in normal DOM hierarchy. Needed for Home click implementation
  private _scrollableParent: Element;

  // page canvas DOM element id
  private readonly _pageCanvasId = 'spPageCanvasContent';
  // page layout element selector
  private readonly _pageLayoutSelector = '[class*="layoutWrapper_"]';

  constructor(props: IPageSectionsNavigationProps) {
    super(props);


    this.state = {
      isMounted: false
    };
  }

  public componentWillMount() {
    this._layerElement = this._getLayerElement();
  }

  public componentWillUpdate(nextProps: IPageSectionsNavigationProps) {
    if (nextProps.position !== this.props.position) {
      // updating layer based on position
      this._removeLayerElement();
      this._layerElement = this._getLayerElement(nextProps.position);
    }
    else if (!this._layerElement) {
      // creating layer if not exist
      this._layerElement = this._getLayerElement();
    }
  }

  public componentDidMount() {
    this.setState({
      isMounted: true
    });
  }

  public componentWillUnmount() {
    this._removeLayerElement();
  }

  public render(): React.ReactElement<IPageSectionsNavigationProps> {
    const { align, theme, isEditMode, homeItem } = this.props;
    const { isMounted } = this.state;

    const rootDivClassNames: ICssInput = {
      'psn-container': true
    };
    rootDivClassNames[styles.pageSectionsNavigation] = true;

    if (theme === 'dark') {
      rootDivClassNames[styles.dark] = true;
    }
    else if (theme === 'theme') {
      rootDivClassNames[styles.theme] = true;
    }

    const navItems: JSX.Element[] = this.props.anchors.map((anchor) => {
      return <li className={css(styles.navItem, 'psn-navItem')}>
        <a className={css(styles.navItemLink, 'psn-navItemLink')} onClick={this._onClick.bind(this, anchor)}>{anchor.title}</a>
      </li>;
    });
    if (homeItem) {
      navItems.unshift(<li className={css(styles.navItem, 'psn-navItem')}>
        <a className={css(styles.navItemLink, 'psn-navItemLink')} onClick={this._onHomeClick.bind(this)}>{homeItem}</a>
      </li>);
    }

    //
    // React Portal component is used to render navigation outside of normal div hierarchy
    //
    return (
      <span ref={this._sectionHostSpanRef}>
        {
          isEditMode && <span>{strings.NavigationWebPartPlaceholderText}</span>
        }
        {
          this._layerElement &&
          isMounted &&
          ReactDOM.createPortal(
            <div className={css(rootDivClassNames)}>
              <ul className={css(styles.nav, 'psn-nav')} style={{ justifyContent: align }}>
                {navItems}
              </ul>
            </div>,
            this._layerElement
          )
        }

      </span>
    );
  }

  private _onHomeClick() {
    // home click
    if (!this._scrollableParent) {
      this._initScrollParent();
    }
    this._scrollableParent.scroll({
      top: 0,
      behavior: this.props.scrollBehavior
    });
  }

  private _onClick(anchor: IAnchorItem, index: number) {

    // click on one of anchor's nav items
    if (anchor.domElement) {
      anchor.domElement.scrollIntoView({
        behavior: this.props.scrollBehavior,
        block: 'start'
      });
    }
  }

  /**
   * creates layer element to host the navigation outside of normal DOM hierarchy
   * @param position - current position value
   */
  private _getLayerElement(position?: NavPosition): HTMLElement | undefined {
    const host = this._getHost(position);

    if (host !== this._host) {
      this._removeLayerElement();
    }

    if (host) {
      this._host = host;

      if (!this._layerElement) {
        const doc = getDocument();
        if (!doc) {
          return;
        }

        this._layerElement = doc.createElement('div');
        this._layerElement.className = css(styles.psnLayer, 'psn-layer');

        host.insertBefore(this._layerElement, host.firstChild);
      }
    }

    return this._layerElement;
  }

  private _removeLayerElement(): void {
    if (this._layerElement) {

      const parentNode = this._layerElement.parentNode;
      if (parentNode) {
        parentNode.removeChild(this._layerElement);
      }
      this._layerElement = undefined;
    }
  }

  /**
   * gets host DOM element based on position property
   * @param position - current position value
   */
  private _getHost(position?: NavPosition): Node | undefined {

    const navPos = position || this.props.position;

    const doc = getDocument();
    if (!doc) {
      return undefined;
    }
    
    let hostNode: Node;

    if (navPos === 'section') {
      hostNode = doc.getElementById(this._pageCanvasId) as Node;
    }
    else {
      hostNode = doc.querySelector(this._pageLayoutSelector) as Node;
    }

    return hostNode;
  }

  private _initScrollParent() {
    if (this._sectionHostSpanRef.current) {
      this._scrollableParent = Scrollparent(this._sectionHostSpanRef.current);
    }
  }
}
