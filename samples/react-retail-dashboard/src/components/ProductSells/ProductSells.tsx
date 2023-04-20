import * as React from "react";
import styles from './ProductSells.module.scss';
import * as strings from 'RetailHomeWebPartStrings';

import { IProductSellsProps } from "./IProductSellsProps";
import { IProductSellsState } from "./IProductSellsState";
import { RetailProduct } from "../../models";

import { ChartControl, ChartType, ChartPalette } from '@pnp/spfx-controls-react/lib/ChartControl';
import { Spinner, SpinnerSize } from "office-ui-fabric-react";

export class ProductSells extends React.Component<IProductSellsProps, IProductSellsState> {

    constructor(props: IProductSellsProps) {
        super(props);

        this.state = {
            products: undefined
        };
    }

    public async componentDidMount(): Promise<void> {
        // Get the products
        const products = await this.getProducts();

        // Set the state
        this.setState({
          products: products
        });
    }

    private async getProducts(): Promise<RetailProduct[]> {
        // Get the products
        const result = await this.props.retailDataService.ListProductsInventory();
        return result;
    }
    
    public render(): React.ReactElement<IProductSellsProps> {

        const {
          products
        } = this.state;

        const data = {
            labels: products?.map(p => p.code) || [],
            datasets: [
              {
                label: strings.ReturnReasons.DataSetTitle,
                data: products?.map(p => p.sales) || [],
              }
            ]
          };

        const options = {
            legend: {
              display: false
            },
            title: {
              display: false
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
                      },
                      gridLines: {
                          display: false
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
                          display: true,
                          beginAtZero: true,
                          min: 0,
                          max: 25000,
                          stepSize: 5000,
                          callback: function(value: number) {
                              return (value === 0 ? '0' : `${value / 1000}K`);
                          }
                      }
                  }
              ]
          }
      };
        
        return (
            <div>
            {products ? 
                <div className={styles.productSells}>
                    <ChartControl
                        className={styles.chart}
                        type={ChartType.Bar}
                        data={data}
                        options={options}
                        palette={ChartPalette.OfficeMonochromatic1}
                        loadingtemplate={() => <Spinner size={SpinnerSize.large} label={strings.Generic.Loading} />}
                    />                        
                </div>
                :
                <div>No Products data found!</div>
            }
            </div>
        );
    }
}