import ICustomerDao from "./ICustomerDao";  
import Customer from "./Customer";

  class JsonCustomerDAO implements ICustomerDao{
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
        let c1: Customer= new Customer();
        let c2: Customer= new Customer();
        c1.id="3";
        c1.firstName="Andrew";
        c1.lastName="Valencia";
        c2.id="4";
        c2.firstName="Charles";
        c2.lastName="Smith";
        
        
        let list: Array<Customer> = [c1, c2 ];
        return list;
    }
}

export default JsonCustomerDAO;