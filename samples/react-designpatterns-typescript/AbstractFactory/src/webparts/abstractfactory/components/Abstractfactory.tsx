import * as React from 'react';
import { IAbstractFactoryProps } from "./IAbstractFactoryProps";  
import { IAbstractFactoryState } from "./IAbstractFactoryState";  
import styles from './Abstractfactory.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import DaoFactory from "./DaoFactory";  
import ICustomerDao from "./ICustomerDao";  
import DataSources from "./DatasourcesEnum";

export default class Abstractfactory extends React.Component<IAbstractFactoryProps, IAbstractFactoryState> {
  //Private instance of customerDao, please note it returns ICustomerDao, an Interface,
    //not a concrete type
    private customerDao: ICustomerDao;

    constructor(props: IAbstractFactoryProps, state: IAbstractFactoryState) {
      super(props);
      this.setInitialState();

      // We set the Dao depending on the selected data source
      this.setDaos(props.datasource);
      
      //Then we set the list of customers and note, we dont care if they come from Sharepoint
      //Rest API or anything else.
      this.state = {
        items: this.customerDao.listCustomers(),
      };

      
    }

    public render(): React.ReactElement<IAbstractFactoryProps> {
      return (
        <div className={ styles.abstractfactory }>
          <div className={ styles.container }>
            <div className={ styles.row }>
              <div className={ styles.column }>
              {this.state.items.map( i => (<div key={i.id}>{i.firstName}</div>))}
             </div>
            </div>
          </div>
        </div>
      );
    }

    public setInitialState(): void {
      this.state = {
        items: []
      };
    }

    public componentWillReceiveProps(nextProps: IAbstractFactoryProps): void {
      if(nextProps.datasource !== this.props.datasource) {
        this.setDaos(nextProps.datasource);
      }
    }

    private setDaos(datasource: string): void {
      const data: DataSources = datasource === "1" ? DataSources.SharepointList : DataSources.JsonData;
      this.customerDao = DaoFactory.getDAOFactory(data).getCustomerDAO();

      this.state = {
        items: this.customerDao.listCustomers(),
      };
      //Now, its transparent for us a UI developers what datasource was selected
      //this.customerDao.
    }
}
