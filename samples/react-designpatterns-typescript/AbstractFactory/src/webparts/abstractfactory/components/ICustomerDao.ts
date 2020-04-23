import Customer from "./Customer";

 interface ICustomerDao {
    insertCustomer(): number;
    deleteCustomer(): boolean;
    findCustomer(): Customer;
    updateCustomer(): boolean;
    listCustomers(): Customer[];
}

export default ICustomerDao;