import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';
import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";

import styles from './LatestOrders.module.scss';
import { ILatestOrdersWebPartProps } from './ILatestOrdersWebPartProps';
import { IOrder, Region } from './IOrder';

export default class LatestOrdersWebPart extends BaseClientSideWebPart<ILatestOrdersWebPartProps> {
  private remotePartyLoaded: boolean = false;
  private orders: IOrder[];

  public render(): void {
    this.domElement.innerHTML = `
    <div class="${styles.latestOrders}">
      <iframe src="https://contoso.azurewebsites.net/"
          style="display:none;"></iframe>
      <div class="ms-font-xxl">Recent orders</div>
      <div class="loading"></div>
      <table class="data" style="display:none;">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Region</th>
            <th>Rep</th>
            <th>Item</th>
            <th>Units</th>
            <th>Unit cost</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>`;

    this.context.statusRenderer.displayLoadingIndicator(
      this.domElement.querySelector(".loading"), "orders");

    this.domElement.querySelector("iframe").addEventListener("load", (): void => {
      this.remotePartyLoaded = true;
    });

    this.executeOrDelayUntilRemotePartyLoaded((): void => {
      this.context.httpClient.get("https://contoso.azurewebsites.net/api/orders",
        HttpClient.configurations.v1, {
          credentials: "include"
        })
        .then((response: HttpClientResponse): Promise<IOrder[]> => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.resolve(null);
          }
        })
        .then((orders: IOrder[]): void => {
          this.orders = orders;
          this.context.statusRenderer.clearLoadingIndicator(
            this.domElement.querySelector(".loading"));
          this.renderData();
        })
        .catch((error: any): void => {
          this.context.statusRenderer.clearLoadingIndicator(
            this.domElement.querySelector(".loading"));
          this.context.statusRenderer.renderError(this.domElement, "Error loading orders: " + (error ? error.message : ""));
        });
    });
  }

  private renderData(): void {
    if (this.orders === null) {
      return;
    }

    let ordersString: string = "";
    this.orders.forEach(order => {
      ordersString += `
<tr>
  <td class="${styles.number}">${order.id}</td>
  <td class="${styles.number}">${new Date(order.orderDate).toLocaleDateString()}</td>
  <td>${order.region.toString()}</td>
  <td>${order.rep}</td>
  <td>${order.item}</td>
  <td class="${styles.number}">${order.units}</td>
  <td class="${styles.number}">$${order.unitCost.toFixed(2)}</td>
  <td class="${styles.number}">$${order.total.toFixed(2)}</td>
</tr>`;
    });

    const table: Element = this.domElement.querySelector(".data");
    table.removeAttribute("style");
    table.querySelector("tbody").innerHTML = ordersString;
  }

  private executeOrDelayUntilRemotePartyLoaded(func: Function): void {
    if (this.remotePartyLoaded) {
      func();
    } else {
      setTimeout((): void => { this.executeOrDelayUntilRemotePartyLoaded(func); }, 100);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
