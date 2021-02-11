import * as React from 'react';
import { Dropdown } from 'office-ui-fabric-react/lib/components/Dropdown';
import { ICustomCollectionField } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';



export default class CustomCheckBox {
  private static getCustomCollectionDropDown(options: IPropertyPaneDropdownOption[], field: ICustomCollectionField, row: any, updateFunction: any, errorFunction?: any, customOnchangeFunction?: any): JSX.Element {
    return (<Dropdown placeholder={field.placeholder || field.title}
      options={options.sort((a, b) => { return a.text.localeCompare(b.text); })}
      selectedKey={row[field.id] || null}
      required={field.required}
      onChange={(evt, option, index) => customOnchangeFunction ? customOnchangeFunction(row, field.id, option, updateFunction, errorFunction) : updateFunction(field.id, option.key)}
      onRenderOption={field.onRenderOption}
      className="PropertyFieldCollectionData__panel__dropdown-field" />);
  }
}
