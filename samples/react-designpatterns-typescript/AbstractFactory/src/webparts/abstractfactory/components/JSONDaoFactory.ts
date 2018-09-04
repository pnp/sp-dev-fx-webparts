import DAOFactory from "./DaoFactory";  
import JsonCustomerDAO from "./JsonCustomerDAO";
import ICustomerDao from "./ICustomerDao";

class JsonDAOFactory extends DAOFactory {  
    public getCustomerDAO(): ICustomerDao{
        return new JsonCustomerDAO();
    }
}

export default JsonDAOFactory; 