import DaoFactory from "./DaoFactory";  
import ICustomerDao from "./ICustomerDao";  
import SharepointCustomerDao from "./SharepointCustomerDAO";

// We extend the abstract class and implement the abstract method which returns a new instance of the
// needed factory class
class SharepointListDAOFactory extends DaoFactory {  
    public getCustomerDAO(): ICustomerDao{
        return new SharepointCustomerDao();
    }
}

export default SharepointListDAOFactory;