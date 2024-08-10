/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from 'react';

import { SearchHit } from '@microsoft/microsoft-graph-types';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import {
  sortBy,
  uniqBy,
} from '@microsoft/sp-lodash-subset';

import { ICustomer } from '../models/ICustomer';
import { IOrder } from '../models/IOrder';

interface IuseGraphAPI {
  searchOrders: (searchText: string) => Promise<any>;
  getCustomers: (searchText: string) => Promise<ICustomer[] | []>;
}

export const useGraphAPI = (context: BaseComponentContext): IuseGraphAPI => {
  const graphClient = React.useMemo(async () => {
    if (!context) return undefined;
    return await context.msGraphClientFactory.getClient("3");
  }, [context]);

  const mappingOrders = React.useCallback(
    (result: SearchHit[]): IOrder[] => {
      const ordersList: IOrder[] = [];
      for (const item of result) {
        const { resource } = item;
        if (resource) {
          const { properties } = resource as any;
          if (properties) {
            const {
              id,
              custcode,
              custname,
              email,
              state,
              country,
              orders,
              orderdates,
              ordertotals,
              orderstatus,
            } = properties as any;

            for (let i = 0; i < orders.length; i++) {
              const order: IOrder = {
                customer: custname,
                city: `${state} ${country}`,
                order: orders[i],
                total: ordertotals[i],
                orderDate: orderdates[i],
                status: orderstatus[i],
                customerCode: custcode,
                custmoerEmail: email,
                customerState: state,
                id: id,
              };
              ordersList.push(order);
            }
          }
        }
      }
      return ordersList;
    },
    [graphClient]
  );

  const mappingCustomers = React.useCallback(
    (result: SearchHit[]): ICustomer[] => {
      const customersList: ICustomer[] = [];
      for (const item of result) {
        const { resource } = item;
        if (resource) {
          const { properties } = resource as any;
          if (properties) {
            const {
              custcode,
              custname,
              email,
              state,
              country,
              orders,
              orderdates,
              ordertotals,
              orderstatus,
            } = properties as any;

            const customer: ICustomer = {
              customerName: custname,
              customerCode: custcode,
              customerEmail: email,
              customerState: state,
              customerCountry: country,
              lastOrder: orders[orders.length - 1],
              totalOrders: orders.length,
              lastOrderDate: orderdates[orderdates.length - 1],
              lastOrderTotal: ordertotals[ordertotals.length - 1],
              lastOrderStatus: orderstatus[orderstatus.length - 1],
            };
            customersList.push(customer);
          }
        }
      }
      return customersList;
    },
    [graphClient]
  );

  const searchOrders = React.useCallback(
    async (searchText: string): Promise<any> => {
      if (!graphClient) return undefined;

      const request = {
        requests: [
          {
            entityTypes: ["externalItem"],
            contentSources: ["/external/connections/ibmdb2lob"],
            query: {
              queryString: `${searchText}*`,
            },
            from: 0,
            size: 100,
          },
        ],
      };

      try {
        const response = await (await graphClient)?.api(`search/query`).post(request);

        const result: SearchHit[] = response?.value[0]?.hitsContainers[0]?.hits;
        if (!result) return [];

        const ordersList = mappingOrders(result);
        console.log(ordersList);
        return ordersList;
      } catch (error) {
        console.log("[searchOrders] error:", error);
        throw new Error("Something went wrong when search Orders");
      }
    },
    [graphClient]
  );

  const getCustomers = React.useCallback(
    async (searchText: string): Promise<ICustomer[] | []> => {
      if (!graphClient) return [];
      const request = {
        requests: [
          {
            entityTypes: ["externalItem"],
            contentSources: ["/external/connections/ibmdb2lob"],
            query: {
              queryString: `${searchText}*`,
            },
            from: 0,
            size: 100,
          },
        ],
      };
      try {
        const response = await (await graphClient)?.api(`search/query`).post(request);

        const result: SearchHit[] = response?.value[0]?.hitsContainers[0]?.hits;
        const customersList = mappingCustomers(result);
        const uniqueCustomers = uniqBy(customersList, "customerCode");
        return sortBy(uniqueCustomers, "customerName");
      } catch (error) {
        console.log("[getCustomers] error:", error);
        throw new Error("Something went wrong when getting customers");
      }
    },
    [graphClient]
  );

  return {
    searchOrders,
    getCustomers,
  };
};
