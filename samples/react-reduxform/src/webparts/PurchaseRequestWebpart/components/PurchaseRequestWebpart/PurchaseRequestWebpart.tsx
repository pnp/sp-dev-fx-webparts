import * as React from 'react';
import styles from './PurchaseRequestWebpart.module.scss';
import { IPurchaseRequestWebpartProps } from './IPurchaseRequestWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ConfigureStore from "../../store/ConfigureStore";
import { connect } from "react-redux";
import {INewFormState} from "../../state/INewFormControlsState";
import { Provider } from "react-redux";
import NewPurchaseRequestComponent from "../CreateNewRequest/CreateNewRequestComponent";

export default class PurchaseRequestWebpart extends React.Component<IPurchaseRequestWebpartProps, {}> {
  
  public render(){

    // Initialize the redux store
    const purchaseRequertStore = ConfigureStore();
    
    return (
      <Provider store={purchaseRequertStore}>
          <NewPurchaseRequestComponent {...this.props}/>
      </Provider>
    );
  }


}

