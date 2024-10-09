import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { ICustomCollectionField } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { TextField } from '@fluentui/react';
import { IListData, ICustomOption, SiteList, ListField } from '../model/IListConfigProps';
import { IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';
import styles from '../ListSearchWebPart.module.scss';
import { Checkbox } from '@fluentui/react';




export default class CustomCollectionDataField {
  private static getCustomCollectionDropDown(
    options: IPropertyPaneDropdownOption[], 
    field: ICustomCollectionField, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateFunction: (fieldId: string, value: any) => void, 
    errorFunction?: (fieldId: string, value: string) => void, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customOnchangeFunction?: (row: any, fieldId: string, option: IDropdownOption<any>, updateFunction: (fieldId: string, value: any) => void, errorFunction: (fieldId: string, value: string) => void) => void
  ): JSX.Element {
    return (<Dropdown placeholder={field.placeholder || field.title}
      options={options.sort((a, b) => { return a.text.localeCompare(b.text); })}
      selectedKey={row[field.id] || null}
      required={field.required}
      onChange={(evt, option) => customOnchangeFunction ? customOnchangeFunction(row, field.id, option, updateFunction, errorFunction) : updateFunction(field.id, option.key)}
      onRenderOption={field.onRenderOption}
      className="PropertyFieldCollectionData__panel__dropdown-field" />);
  }

  public static getListPickerBySiteOptions(
    possibleOptions: Array<IListData>,
    field: ICustomCollectionField, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateFunction: (fieldId: string, value: any) => void, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customOnChange?: (row: any, fieldId: string, option: IDropdownOption<any>, updateFunction: (fieldId: string, value: any) => void, errorFunction: (fieldId: string, value: string) => void) => void,
  ): JSX.Element {
    const currentOptions: IPropertyPaneDropdownOption[] = [];
    possibleOptions.filter(option => {
      if (row.SiteCollectionSource && option.SiteCollectionSource == row.SiteCollectionSource) {
        currentOptions.push({
          key: option.ListSourceField,
          text: option.ListSourceFieldName
        });
      }
    });
    return this.getCustomCollectionDropDown(currentOptions, field, row, updateFunction, null, customOnChange);
  }

  public static getListPicker(
    possibleOptions: Array<SiteList>,
    field: ICustomCollectionField,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateFunction: (fieldId: string, value: any) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customOnChange: (row: any, fieldId: string, option: IDropdownOption<any>, updateFunction: (fieldId: string, value: any) => void, errorFunction: (fieldId: string, value: string) => void) => void,
    customError?: (fieldId: string, value: string) => string
  ): JSX.Element {
    let options: IPropertyPaneDropdownOption[] = [];
    if (possibleOptions) {
      options = possibleOptions.map(option => { return { key: option.Id, text: option.Title }; });
    }
    return this.getCustomCollectionDropDown(options, field, row, updateFunction, customError, customOnChange);
  }

  public static getPickerByStringOptions(
    possibleOptions: Array<string>, 
    field: ICustomCollectionField, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateFunction: (fieldId: string, value: any) => void, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customOnChange: (row: any, fieldId: string, option: IDropdownOption<any>, updateFunction: (fieldId: string, value: any) => void, errorFunction: (fieldId: string, value: string) => void) => void,
    customError?: (fieldId: string, value: string) => void
  ): JSX.Element {
    let options: IPropertyPaneDropdownOption[] = [];
    if (possibleOptions) {
      options = possibleOptions.map(option => { return { key: option, text: option }; });
    }
    return this.getCustomCollectionDropDown(options, field, row, updateFunction, customError, customOnChange);
  }

  public static getFieldPickerByList(
    possibleOptions: Array<ListField>, 
    field: ICustomCollectionField, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row: any, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateFunction: (fieldId: string, value: any) => void, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    customOnChange: (row: any, fieldId: string, option: IDropdownOption<any>, updateFunction: (fieldId: string, value: any) => void, errorFunction: (fieldId: string, value: string) => void) => void,
    customOptions?: Array<ICustomOption>
  ): JSX.Element {
    let options: IPropertyPaneDropdownOption[] = [];
    if (possibleOptions) {
      options = possibleOptions.map(option => { return { key: option.InternalName, text: option.Title, title: option.InternalName, FieldType: option.TypeAsString }; });
    }
    if (customOptions) {
      customOptions.map(option => {
        options.push({
          key: option.Key,
          text: option.Option,
        });
      });
    }
    return this.getCustomCollectionDropDown(options, field, row, updateFunction, null, customOnChange);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getDisabledTextField(field: ICustomCollectionField, item: any, updateFunction: (fieldId: string, value: any) => void): JSX.Element {
    return <TextField placeholder={field.placeholder || field.title
    }
      className={styles.collectionDataField}
      value={item[field.id] ? item[field.id] : ""}
      required={field.required}
      disabled={true}
      onChange={(value) => updateFunction(field.id, value)}
      deferredValidationTime={field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200}
      inputClassName="PropertyFieldCollectionData__panel__string-field" />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static getDisabledCheckBoxField(field: ICustomCollectionField, item: any, updateFunction: (fieldId: string, value: any) => void): JSX.Element {
    return <Checkbox checked={item[field.id] ? item[field.id] : false}
      onChange={(ev, value) => updateFunction(field.id, value)}
      disabled={true}
      className="PropertyFieldCollectionData__panel__boolean-field" />;
  }
}
