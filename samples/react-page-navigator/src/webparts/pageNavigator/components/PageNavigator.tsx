import * as React from 'react';
import styles from './PageNavigator.module.scss';
import { IPageNavigatorProps } from './IPageNavigatorProps';
import { IPageNavigatorState } from './IPageNavigatorState';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';

export default class PageNavigator extends React.Component<IPageNavigatorProps, IPageNavigatorState> {
  constructor(props: IPageNavigatorProps) {
    super(props);

    this.state = {
      anchorLinks: [],
      selectedKey: ''
    };

    this.onLinkClick = this.onLinkClick.bind(this);
  }

  public componentDidMount() {
    this.setState({ anchorLinks: this.props.anchorLinks, selectedKey: this.props.anchorLinks[0] ? this.props.anchorLinks[0].key : '' });
  }

  public componentDidUpdate(prevProps: IPageNavigatorProps) {
    if (JSON.stringify(prevProps.anchorLinks) !== JSON.stringify(this.props.anchorLinks)) {
      this.setState({ anchorLinks: this.props.anchorLinks, selectedKey: this.props.anchorLinks[0] ? this.props.anchorLinks[0].key : '' });
    }
  }

  private onLinkClick(ev: React.MouseEvent<HTMLElement>, item?: INavLink) {
    this.setState({ selectedKey: item.key });
  }

  public render(): React.ReactElement<IPageNavigatorProps> {
    return (
      <div className={styles.pageNavigator}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <Nav selectedKey={this.state.selectedKey}
                onLinkClick={this.onLinkClick}
                groups={[
                  {
                    links: this.state.anchorLinks
                  }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
