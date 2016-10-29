import {
  IPropertyPaneField,
  IPropertyPaneFieldType
} from '@microsoft/sp-client-preview';

import { PropertyPaneViewSelectorViewModel } from './PropertyPaneViewSelectorViewModel';
import { PropertyPaneViewSelectorView } from './PropertyPaneViewSelectorView';
import {
  IPropertyPaneViewSelectorFieldPropsInternal,
  IPropertyPaneViewSelectorFieldProps
} from './Common';

import * as ko from 'knockout';
import { registerDropdown } from '../components/dropdown/Dropdown';

/**
 * PropertyPaneViewSelector component
 */
class PropertyPaneViewSelector implements IPropertyPaneField<IPropertyPaneViewSelectorFieldPropsInternal> {
  /**
   * This is a Custom field
   */
  public type: IPropertyPaneFieldType = IPropertyPaneFieldType.Custom;
  /**
   * Path to target property in web part properties
   */
  public targetProperty: string;
  /**
   * component properties
   */
  public properties: IPropertyPaneViewSelectorFieldPropsInternal;

  /**
   * selected list id
   */
  public listId: string;
  /**
   * selected view id
   */
  public viewId: string;

  /**
   * MVVM component view
   */
  private _view: PropertyPaneViewSelectorView;
  /**
   * MVVM component view model
   */
  private _viewModel: PropertyPaneViewSelectorViewModel;

  /**
   * Parent node for the component
   */
  private _parentNode: Element;

  /**
   * ctor
   */
  public constructor(_targetProperty: string, _properties: IPropertyPaneViewSelectorFieldPropsInternal) {
    this.targetProperty = _targetProperty;
    this.properties = _properties;
    this.properties.onRender = this._render.bind(this); // applying custom rendering method
    this.properties.onDispose = this._dispose.bind(this); // applying custom disposing method
    this.listId = _properties.listId;
    this.viewId = _properties.viewId;

    this._view = new PropertyPaneViewSelectorView();
    this._viewModel = new PropertyPaneViewSelectorViewModel(_properties);

    // registering used custom Knockout components (dropdown)
    this._registerComponents();
  }

  /**
   * Rendering the component
   */
  private _render(elem: HTMLElement): void {
    this._parentNode = elem;
    this._view.render(elem).then(() => {     // rendering of HTML markup
      this._viewModel.init().then(() => {    // getting data
        ko.applyBindings(this._viewModel, elem);   // applying bindings
      });
    });
  }

  private _dispose(elem: HTMLElement): void {
    // cleaning the bindings
    ko.cleanNode(this._parentNode); // elem is undefined for some reason
  }

  /**
   * Registers used custom Knockout components
   */
  private _registerComponents(): void {
    registerDropdown();
  }
}

/**
 * Helper method to create a ViewSelectorField on the PropertyPane.
 * @param targetProperty - Target property the viewselector is associated to.
 * @param properties - Strongly typed viewselector properties.
 */
export function PropertyPaneViewSelectorField(targetProperty: string, properties: IPropertyPaneViewSelectorFieldProps): IPropertyPaneField<IPropertyPaneViewSelectorFieldProps> {
  var internalProps: IPropertyPaneViewSelectorFieldPropsInternal = {
    context: properties.context,
    listId: properties.listId,
    viewId: properties.viewId,
    listLabel: properties.listLabel,
    viewLabel: properties.viewLabel,
    onPropertyChange: properties.onPropertyChange,
    targetProperty: targetProperty,
    onRender: null,
    onDispose: null
  };
  return new PropertyPaneViewSelector(targetProperty, internalProps);
}