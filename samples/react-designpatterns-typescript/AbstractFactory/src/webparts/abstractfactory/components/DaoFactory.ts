import ICustomerDAO from "./ICustomerDAO";  

import DataSources from "./DatasourcesEnum";

abstract class DAOFactory {

    //For each entity we will need to implement getCustomerDAO, this will make it easily replaceable
    //when another datasource comes in
    public abstract getCustomerDAO(): ICustomerDAO;

    //Static method that receives a parameter depending on the datasource and will return the specifc 
    //factory
    public  static getDAOFactory(whichFactory: DataSources): DAOFactory {
        switch (whichFactory) {
          case DataSources.SharepointList:
            return new SharepointListDAOFactory();
          case DataSources.JsonData:
            return new JsonDAOFactory();
          default  :
            return null;
        }
      }
}

export default DAOFactory;
import SharepointListDAOFactory from "./SharepointListDAOFactory";  
import JsonDAOFactory from "./JsonDAOFactory";  