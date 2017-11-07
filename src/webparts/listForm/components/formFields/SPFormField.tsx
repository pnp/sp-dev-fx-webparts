import * as React from 'react';

import { css } from 'office-ui-fabric-react/lib/Utilities';
import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';
import { Dropdown, IDropdownProps } from 'office-ui-fabric-react/lib/Dropdown';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ITextFieldProps, TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

import * as moment from 'moment';

import { ControlMode } from '../../../../common/datatypes/ControlMode';
import { IFieldSchema } from '../../../../common/services/datatypes/RenderListData';

import FormField from './FormField';
import { IFormFieldProps } from './FormField';
import DateFormField from './DateFormField';
import NumberFormField from './NumberFormField';

import { Locales } from '../../../../common/Locales';
import { initializeIcons } from '@uifabric/icons';

import styles from './SPFormField.module.scss';


export interface ISPFormFieldProps extends IFormFieldProps {
    fieldSchema: IFieldSchema;
}

const SPFormField: React.SFC<ISPFormFieldProps> = (props) => {
  let fieldControl = null;
  const fieldType = props.fieldSchema.FieldType;
  if (props.controlMode === ControlMode.Display) {
    let value = (props.value) ? ((typeof props.value === 'string') ? props.value : JSON.stringify(props.value)) : '';
    if (fieldType === 'Lookup') {
      if ((props.value) && (props.value.length > 0) && (props.value[0].lookupValue))  { value = props.value[0].lookupValue; }
    } else if (fieldType === 'User') {
      if ((props.value) && (props.value.length > 0) && (props.value[0].title))  { value = props.value[0].title; }
    }
    fieldControl = <span>{value}</span>;
  } else {
    if ((fieldType === 'Text') || (fieldType === 'Note')) {
      fieldControl = GetTextFieldControl(props);
    } else if (fieldType === 'DateTime') {
      fieldControl = GetDateTimeFieldControl(props);
    } else if ((fieldType === 'Number') || (fieldType === 'Currency')) {
      fieldControl = GetNumberFieldControl(props);
    } else if (fieldType === 'Choice') {
      fieldControl = GetChoiceFieldControl(props);
    } else if (fieldType === 'Lookup') {
      fieldControl = GetLookupFieldControl(props);
    } else if (fieldType === 'Boolean') {
      fieldControl = GetBooleanFieldControl(props);
    } else {
      const isObjValue = (props.value) && (typeof props.value !== 'string');
      const value = (props.value) ? ((typeof props.value === 'string') ? props.value : JSON.stringify(props.value)) : '';
      fieldControl = <TextField
                {...props}
                readOnly
                multiline={isObjValue}
                value={value}
                errorMessage={`Unsupported field type "${fieldType}"`}
                underlined
              />;
    }
  }
  return <FormField
            {...props}
            label={props.label || props.fieldSchema.Title}
            description={props.description || props.fieldSchema.Description}
            required={props.fieldSchema.Required}
            errorMessage={props.errorMessage}
            >
            {fieldControl}
          </FormField>;
};


function GetTextFieldControl(props: ISPFormFieldProps) {
  return <TextField
            {...props}
            className='ard-TextFormField'
            name={props.fieldSchema.InternalName}
            value={props.value}
            onChanged={props.valueChanged}
            placeholder='Enter text here'
            multiline={props.fieldSchema.FieldType === 'Note'}
            underlined
            noValidate
          />;
}

function GetBooleanFieldControl(props: ISPFormFieldProps) {
  return <Toggle
            className='ard-booleanFormField'
            checked={props.value === '1' || props.value === 'true' || props.value === 'Yes'}
            onAriaLabel='This toggle is checked. Press to uncheck.'
            offAriaLabel='This toggle is unchecked. Press to check.'
            onText='Yes'
            offText='No'
            onChanged={ (checked: boolean) => props.valueChanged(checked.toString())}
          />;
}

function GetChoiceFieldControl(props: ISPFormFieldProps) {
  const options = (props.fieldSchema.Required) ? props.fieldSchema.Choices : [''].concat(props.fieldSchema.Choices);
  return <Dropdown
            {...props}
            className={css(styles.dropDownFormField, 'ard-choiceFormField')}
            options = {options.map( (option: string) => ({key: option, text: option}) )}
            selectedKey = {props.value}
            onChanged={ (item) => props.valueChanged( item.key.toString() )  }
          />;
}

function GetLookupFieldControl(props: ISPFormFieldProps) {
  let options = props.fieldSchema.Choices.map( (option) => ({ key: option.LookupId, text: option.LookupValue }) );
  if (!props.required) { options = [{key: 0, text: '(None)'}].concat(options); }
  const value = props.value ? Number(props.value.split(';#')[0]) : 0;
  return <Dropdown
            {...props}
            className={css(styles.dropDownFormField, 'ard-lookupFormField')}
            options = {options}
            selectedKey = {value}
            onChanged={ (item) => props.valueChanged( `${item.key};#${item.text}` ) }
          />;
}

function GetNumberFieldControl(props: ISPFormFieldProps) {
  return <NumberFormField
            className='ard-numberFormField'
            value={props.value}
            valueChanged={props.valueChanged}
            placeholder='Enter value here'
            underlined
          />;
}

function GetDateTimeFieldControl(props: ISPFormFieldProps) {
  const locale = Locales[props.fieldSchema.LocaleId];
  return <DateFormField
            {...props.value && moment(props.value).isValid() ? {value: moment(props.value).toDate()} : {}}
            className={css(styles.dateFormField, 'ard-dateFormField')}
            placeholder='Enter a date'
            isRequired={props.fieldSchema.Required}
            ariaLabel={props.fieldSchema.Title}
            locale={Locales[locale]}
            firstDayOfWeek={props.fieldSchema.FirstDayOfWeek}
            allowTextInput
            onSelectDate={(date) => props.valueChanged(date.toLocaleDateString(locale))}
          />;
}


export default SPFormField;
