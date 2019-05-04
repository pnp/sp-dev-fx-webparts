import { ICustomerService } from './ICustomerService';
import { ICustomer } from '../../model/ICustomer';

import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { HttpClient } from '@microsoft/sp-http';


export default class CustomerService implements ICustomerService {

    private context: IWebPartContext;
    constructor(context: IWebPartContext, serviceScope: ServiceScope) {
        this.context = context;
    }

    public getCustomer(customerID: string): Promise<ICustomer> {

        var result: Promise<ICustomer> = new Promise<ICustomer> 
            ((resolve, reject) => {

                this.context.httpClient
                .fetch(`https://services.odata.org/V3/Northwind/Northwind.svc/Customers?$filter=CustomerID eq '${customerID}'`,
                       HttpClient.configurations.v1,
                       {
                           method: 'GET',
                           headers: {"accept": "application/json"},
                           mode: 'cors',
                           cache: 'default'
                       })
                .then ((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw (`Error ${response.status}: ${response.statusText}`);
                    }
                })
                // TODO: Kill the any
                .then ((o: any) => {
                    resolve(o.value[0]);
                });
                // TODO: Handle exception
            });
        return result;
    }
}
