import { ICustomer } from '../../model/ICustomer';

export interface ICustomerService {
    getCustomer (customerID: string) : Promise<ICustomer>;
}