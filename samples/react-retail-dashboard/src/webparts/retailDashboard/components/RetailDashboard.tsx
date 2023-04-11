import * as React from 'react';
import styles from './RetailDashboard.module.scss';
import * as strings from 'RetailDashboardWebPartStrings';
import { IRetailDashboardProps } from './IRetailDashboardProps';
import { IRetailDashboardState } from './IRetailDashboardState';

import { WidgetSize, Dashboard } from '@pnp/spfx-controls-react/lib/Dashboard';
import { Spinner, SpinnerSize, initializeIcons, Text } from 'office-ui-fabric-react';

export default class RetailDashboard extends React.Component<IRetailDashboardProps, IRetailDashboardState> {

  constructor(props: IRetailDashboardProps) {
    super(props);

    // Initialize Office UI Fabric icons
    initializeIcons();
    
    // Initialize the state
    this.state = {
      isLoading: true,
    };
  }

  public render(): React.ReactElement<IRetailDashboardProps> {

    let content: JSX.Element = null;

    content = <Dashboard widgets={[{
      title: "Card 1",
      desc: "Last updated Monday, April 4 at 11:15 AM (PT)",
      size: WidgetSize.Triple,
      body: [
        {
          id: "t1",
          title: "Tab 1",
          content: (
            <Text>
              Content #1
            </Text>
          ),
        },
        {
          id: "t2",
          title: "Tab 2",
          content: (
            <Text>
              Content #2
            </Text>
          ),
        },
        {
          id: "t3",
          title: "Tab 3",
          content: (
            <Text>
              Content #3
            </Text>
          ),
        },
      ],
      link: { href: "#" },
    },
    {
      title: "Card 2",
      size: WidgetSize.Single,
      link: { href: "#" },
    },
    {
      title: "Card 3",
      size: WidgetSize.Double,
      link: { href: "#" },
    }]} />;

    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 500);

    return (
      <div className={styles.retailDashboard}>
        {this.state.isLoading && <Spinner size={SpinnerSize.large} title={strings.Generic.Loading} className={styles.loader} />}
        {!this.state.isLoading && content}
      </div>
    );
  }
}
