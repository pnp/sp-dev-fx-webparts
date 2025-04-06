import * as React from 'react';
import styles from './PageNavigator.module.scss';
import { IPageNavigatorProps } from './IPageNavigatorProps';
import { IPageNavigatorState } from './IPageNavigatorState';
import { Nav, INavLink } from '@fluentui/react/lib/Nav';
import { ITheme } from '@fluentui/react';

export default class PageNavigator extends React.Component<IPageNavigatorProps, IPageNavigatorState> {
  constructor(props: IPageNavigatorProps) {
    super(props);

    this.state = {
      anchorLinks: [],
      selectedKey: ''
    };

    this.onLinkClick = this.onLinkClick.bind(this);
  }

  public componentDidMount(): void {
    this.setState({ anchorLinks: this.props.anchorLinks, selectedKey: this.props.anchorLinks[0] ? this.props.anchorLinks[0].key : '' });
  }

  public componentDidUpdate(prevProps: IPageNavigatorProps): void {
    if (JSON.stringify(prevProps.anchorLinks) !== JSON.stringify(this.props.anchorLinks)) {
      this.setState({ anchorLinks: this.props.anchorLinks, selectedKey: this.props.anchorLinks[0] ? this.props.anchorLinks[0].key : '' });
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
