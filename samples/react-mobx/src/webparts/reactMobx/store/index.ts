import { observable, ObservableMap } from 'mobx';

export class WebpartStore {
  @observable public properties = new ObservableMap();
}

export default class Store {
  public webpart = new WebpartStore();
}
