import * as React from 'react';
import styles from './RetailDashboard.module.scss';
import * as strings from 'RetailDashboardWebPartStrings';
import { IRetailDashboardProps } from './IRetailDashboardProps';
import { IRetailDashboardState } from './IRetailDashboardState';

import { WidgetSize, Dashboard, IWidget } from '@pnp/spfx-controls-react/lib/Dashboard';
import { Spinner, SpinnerSize, initializeIcons } from 'office-ui-fabric-react';

import { ReturnVolumes } from '../../../components/ReturnVolumes/ReturnVolumes';
import { ReturnReasons } from '../../../components/ReturnReasons/ReturnReasons';
import { ProductSells } from '../../../components/ProductSells/ProductSells';
import { GlobalCustomerSatisfaction } from '../../../components/GlobalCustomerSatisfaction/GlobalCustomerSatisfaction';

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

    content = <Dashboard widgets={this.getDashboarWidgets()} />;

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
  * Get the Dashboard widgets
  * @returns An array of the widgets to be added to the Dashboard element
  */
 private getDashboarWidgets() : IWidget[] {
   return [
    {
     title: strings.Dashboard.GlobalReturnVolumeWidgetTitle,
     size: WidgetSize.Double,
     body: [
       {
         id: "returnVolume",
         title: strings.Dashboard.GlobalReturnVolumeWidgetTitle,
         content: (
           this.getReturnVolumes()
         )
       }
     ]
    },
    {
      title: strings.Dashboard.GlobalCustomerSatisfactionWidgetTitle,
      size: WidgetSize.Double,
      body: [
        {
          id: "customerSatisfaction",
          title: strings.Dashboard.GlobalCustomerSatisfactionWidgetTitle,
          content: (
            this.getGlobalCustomerSatisfaction()
          )
        }
      ]
    },
    {
      title: strings.Dashboard.ProductsSellsWidgetTitle,
      size: WidgetSize.Double,
      body: [
        {
          id: "productSells",
          title: strings.Dashboard.ProductsSellsWidgetTitle,
          content: (
            this.getProductsSells()
          )
        }
      ]
    },
    {
      title: strings.Dashboard.ReturnReasonsWidgetTitle,
      size: WidgetSize.Double,
      body: [
        {
          id: "returnReasons",
          title: strings.Dashboard.ReturnReasonsWidgetTitle,
          content: (
            this.getReturnReasons()
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

   /**
 * Get the content for the Return Volume widget
 * @returns Element representing the Return Volume widget
 */
   private getGlobalCustomerSatisfaction(): JSX.Element {
    return <GlobalCustomerSatisfaction 
      retailDataService={this.props.retailDataService}
      settingsService={this.props.settingsService}
    />;
  }

  /**
   * Get the content for the Return Volume widget
   * @returns Element representing the Return Volume widget
   */
  private getReturnReasons(): JSX.Element {
    return <ReturnReasons 
      retailDataService={this.props.retailDataService}
      settingsService={this.props.settingsService}
    />;
  }

  /**
   * Get the content for the Return Volume widget
   * @returns Element representing the Return Volume widget
   */
  private getProductsSells(): JSX.Element {
    return <ProductSells
      retailDataService={this.props.retailDataService}
      settingsService={this.props.settingsService}
    />;
  }
}
