import * as React from 'react';
import styles from './RetailDashboard.module.scss';
import * as strings from 'RetailDashboardWebPartStrings';
import { IRetailDashboardProps } from './IRetailDashboardProps';
import { IRetailDashboardState } from './IRetailDashboardState';

import { WidgetSize, Dashboard, IWidget } from '@pnp/spfx-controls-react/lib/Dashboard';
import { Spinner, SpinnerSize, initializeIcons } from 'office-ui-fabric-react';

import { ReturnVolumes } from '../../../components/ReturnVolumes/ReturnVolumes';

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

    content = <Dashboard widgets={this.getHomeWidgets()} />;

    return (
      <div className={styles.retailDashboard}>
        {this.state.isLoading && <Spinner size={SpinnerSize.large} title={strings.Generic.Loading} className={styles.loader} />}
        {!this.state.isLoading && content}
      </div>
    );
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 500);
  }

  /*
  * Get the home dashboard widgets
  * @returns An array of the widgets to be added to the home dashboard element
  */
 private getHomeWidgets() : IWidget[] {
   return [
    {
     title: strings.Dashboard.ReturnVolumeWidgetTitle,
     size: WidgetSize.Box,
     body: [
       {
         id: "returnVolume",
         title: strings.Dashboard.ReturnVolumeWidgetTitle,
         content: (
           this.getReturnVolumes()
         )
       }
     ]
    }
  ];
 }

 /**
 * Get the content for the Return Volume widget
 * @returns Element representing the Return Volume widget
 */
  private getReturnVolumes(): JSX.Element {
    return <ReturnVolumes 
      retailDataService={this.props.retailDataService}
      settingsService={this.props.settingsService}
      maxMonths={12}
      showDetails={false}
    />;
  }
}
