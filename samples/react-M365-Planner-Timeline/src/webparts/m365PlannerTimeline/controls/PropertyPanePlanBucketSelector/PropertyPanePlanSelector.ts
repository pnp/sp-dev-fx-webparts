import * as React from "react";
import * as ReactDom from "react-dom";
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from "@microsoft/sp-property-pane";
import PlanBucketSelector from "./PlanBucketSelector";
import {
  IPropertyPanePlanSelectorProp,
  IPropertyPanePlanSelectorPropsInternal,
  IPlanerIds,
} from "./IPropertyPanePlanSelectorProps";

class PropertyPanePlanBucketSelectorBuilder implements IPropertyPaneField<IPropertyPanePlanSelectorPropsInternal> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public properties: IPropertyPanePlanSelectorPropsInternal;
  public targetProperty: string;

  private _onChangeCallback: (targetProperty?: string , newValue?: IPlanerIds) => void;

  public constructor(targetProperty: string, props: IPropertyPanePlanSelectorPropsInternal) {
    // set the internal props
    this.targetProperty = targetProperty;
    this.properties = props;

    // bind the rendering handlers
    this.properties.onRender = this._render.bind(this);
    this.properties.onDispose = this._dispose.bind(this);
  }

  private _render(domElement: HTMLElement, context?: {}, changeCallback?: (targetProperty?: string, newValue?: {}) => void): void {
    const props: IPropertyPanePlanSelectorProp = this.properties as IPropertyPanePlanSelectorProp;

    const propertyPaneControl: React.ReactElement = React.createElement(PlanBucketSelector, {
      ...props,
      onChanged: this._onChanged.bind(this)
    });

    ReactDom.render(propertyPaneControl, domElement);

    // if change callback provided, wire it up
    if (changeCallback) {
      this._onChangeCallback = changeCallback;
    }
  }

  private _dispose(domElement: HTMLElement): void {
    ReactDom.unmountComponentAtNode(domElement);
  }

  /**
   * Event handler for React component to bubble up the changed value to the hosting web part.
   *
   * @private
   * @param {IPlanerIds} planerIds
   * @memberof PropertyPanePlanBucketSelectorBuilder
   */
  private _onChanged(planerIds : IPlanerIds): void {
    if (this._onChangeCallback) {
      this._onChangeCallback(this.targetProperty, planerIds);
    }
  }
}

/**
 * Utility function to mirror same pattern OOTB SPFx prop pane control usage.
 *
 * @export
 * @param {string} targetProperty
 * @param {IPropertyPanePlanSelectorProp} properties
 * @returns {IPropertyPaneField<IPropertyPanePlanSelectorPropsInternal>}
 */
export function PropertyPanePlanBucketSelector(targetProperty: string, properties: IPropertyPanePlanSelectorProp): IPropertyPaneField<IPropertyPanePlanSelectorPropsInternal> {
  return new PropertyPanePlanBucketSelectorBuilder(targetProperty, {
    ...properties,
    key: properties.label,
    onRender: () => {},
    onDispose: () => {}
  });
}
