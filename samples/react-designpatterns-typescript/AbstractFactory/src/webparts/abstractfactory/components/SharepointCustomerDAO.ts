import ICustomerDao from "./ICustomerDao";  
import Customer from "./Customer";

 class SharepointCustomerDao implements ICustomerDao {
    public insertCustomer(): number {
        // implementation to be done by reader
        return 1;
    }

    public deleteCustomer(): boolean {
         // implementation to be done by reader
        return true;
    }

    public findCustomer(): Customer {
         // implementation to be done by reader
        return new Customer();
    }

    public updateCustomer(): boolean {
         // implementation to be done by reader
        return true;
    }

    public listCustomers(): Customer[] {
         // implementation to be done by reader
        let c1: Customer = new Customer();
        c1.id="1";
        c1.firstName="Luis";
        c1.lastName="Valencia";
        let c2: Customer = new Customer();
        c2.id="2";
        c2.firstName="John";
        c2.lastName="Smith";
        let list: Array<Customer> = [c1, c2 ];
        return list;
    }
}

export default SharepointCustomerDao;