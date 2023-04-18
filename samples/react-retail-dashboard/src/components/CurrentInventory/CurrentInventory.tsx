import * as React from "react";
import styles from './CurrentInventory.module.scss';
import * as strings from 'RetailHomeWebPartStrings';

import { ICurrentInventoryProps } from "./ICurrentInventoryProps";
import { ICurrentInventoryState } from "./ICurrentInventoryState";
import { RetailInventory } from "../../models";

import { ChartControl, ChartType, ChartPalette } from '@pnp/spfx-controls-react/lib/ChartControl';

export class CurrentInventory extends React.Component<ICurrentInventoryProps, ICurrentInventoryState> {

    constructor(props: ICurrentInventoryProps) {
        super(props);

        this.state = {
            inventory: null
        };
    }

    public async componentDidMount(): Promise<void> {
        // Get the return reasons stats
        const currentInventory = await this.getCurrentInventory();

        // Set the state
        this.setState({
            inventory: currentInventory
        });
    }

    private async getCurrentInventory(): Promise<RetailInventory> {
        // Get the current inventory
        const result = await this.props.retailDataService.LoadInventory();
        return result;
    }
    
    public render(): React.ReactElement<ICurrentInventoryProps> {

        const {
            inventory
        } = this.state;

        const data = {
            labels:
              [
                strings.CurrentInventory.Womens, 
                strings.CurrentInventory.Mens,
                strings.CurrentInventory.Accessories, 
                strings.CurrentInventory.Handbags,
                strings.CurrentInventory.Sales
              ],
            datasets: [
              {
                label: 'Current Inventory',
                data:
                  [
                    inventory?.womensItems ?? 0,
                    inventory?.mensItems ?? 0,
                    inventory?.accessoriesItems ?? 0,
                    inventory?.handbagsItems ?? 0,
                    inventory?.salesItems ?? 0
                  ]
              }
            ]
          };

        const options = {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: `${inventory?.inventoryDate.toDateString()} ${inventory?.inventoryDate.toLocaleTimeString()}`
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        display: true,
                        border: {
                            display: false
                        },
                        scaleLabel: {
                            labelString: '',
                        },
                        ticks: {
                            display: true
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        border: {
                            display: false
                        },
                        scaleLabel: {
                            labelString: '',
                        },
                        ticks: {
                            display: true
                        }
                    }
                ]
            },
        };

        return (
            <div>
            {inventory ? 
                <div className={styles.currentInventory}>
                    <ChartControl
                        type={ChartType.HorizontalBar}
                        data={data}
                        options={options}
                        palette={ChartPalette.OfficeMonochromatic1}
                    />                        
                </div>
                :
                <div>No Current Inventory found!</div>
            }
            </div>
        );
    }
}