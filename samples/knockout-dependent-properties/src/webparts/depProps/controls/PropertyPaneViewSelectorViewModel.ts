import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { ISPList, ISPView } from '../common/SPEntities';
import { PropertyPaneViewSelectorModel } from './PropertyPaneViewSelectorModel';
import * as ko from 'knockout';
import {
  IPropertyPaneViewSelectorFieldPropsInternal
} from './Common';

import { IDropdownOption } from '../components/dropdown/viewmodel';

/**
 * ViewSelector component view model
 */
export class PropertyPaneViewSelectorViewModel {
  /**
   * Web part context
   */
  private _context: IWebPartContext;
  /**
   * Current List Id
   */
  private _listId: string;
  /**
   * Current View Id
   */
  private _viewId: string;
  /**
   * ViewSelector component properties
   */
  private _properties: IPropertyPaneViewSelectorFieldPropsInternal;

  /**
   * MVVM model
   */
  private _model: PropertyPaneViewSelectorModel;

  /**
   * Observable collection of lists
   */
  protected lists: KnockoutObservableArray<IDropdownOption>;
  /**
   * Observable collection of views
   */
  protected views: KnockoutObservableArray<IDropdownOption>;
  /**
   * Current selected list
   */
  protected currentList: KnockoutObservable<string>;
  /**
   * Current selected view
   */
  protected currentView: KnockoutObservable<string>;

  /**
   * Flag if there is a list selection
   */
  protected noListSelection: KnockoutObservable<boolean>;

  /**
   * List dropdown lable
   */
  protected listLabel: string;
  /**
   * View dropdown label
   */
  protected viewLabel: string;

  /**
   * ctor
   * */
  public constructor(_properties: IPropertyPaneViewSelectorFieldPropsInternal) {
    this._properties = _properties;
    this._context = _properties.wpContext;
    this._listId = _properties.listId;
    this._viewId = _properties.viewId;
    this.listLabel = _properties.listLabel;
    this.viewLabel = _properties.viewLabel;
    this.currentList = ko.observable<string>(this._listId);
    this.currentView = ko.observable<string>(this._viewId);
    this.noListSelection = ko.observable<boolean>(this._listId == '-1');

    // subscribing on changes in lists dropdown
    this.currentList.subscribe((value) => {
      const oldListId: string = this._listId;
      this._listId = value;
      this._initViews().then(() => {
        this.noListSelection(this._listId == '-1');
      });

      this._firePropertyChange();

    });

    // subscribing on changes in view dropdown
    this.currentView.subscribe((value) => {
      const oldViewId: string = this._viewId;
      this._viewId = value;
      this._firePropertyChange();
    });

    this.lists = ko.observableArray<IDropdownOption>();
    this.views = ko.observableArray<IDropdownOption>();

    this._model = new PropertyPaneViewSelectorModel(this._context);
  }

  /**
   * Fires property changed event handler
   * This method should be called in 'Reactive' mode of web part properties pane
   */
  private _firePropertyChange(): void {
    if (this._properties.onPropertyChange) {
      const newValue = {
        listId: this._listId || '-1',
        viewId: this._viewId || '-1'
      };
      this._properties.onPropertyChange(this._properties.targetProperty,  newValue);
    }
  }

  /**
   * Initializes the view model
   */
  public init(): Promise<void> {
    return new Promise<void>((resolve) => {
      this._model.getLists().then((lists) => {  // getting lists
        var listOptions = new Array<IDropdownOption>();
        lists.forEach((list: ISPList) => {
          listOptions.push({ value: list.Id, text: list.Title, selected: false });
        });
        this.lists(listOptions);
        this._initViews().then(() => {
          resolve();
        });
      });
    });
  }

  /**
   * Initializes views collection based on selected list
   */
  private _initViews(): Promise<void> {
    return new Promise<void>((resolve) => {
      if (this._listId) {
        this._model.getViews(this._listId).then((views) => { // getting views
          var viewOptions = new Array<IDropdownOption>();
          views.forEach((view: ISPView) => {
            viewOptions.push({ value: view.Id, text: view.Title, selected: false });
          });
          this.views(viewOptions);
          resolve();
        });
      }
      else
        resolve();
    });
  }
}