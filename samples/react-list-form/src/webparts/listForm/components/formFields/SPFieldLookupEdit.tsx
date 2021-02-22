import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import { Dropdown, IDropdownProps, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { SPHelper } from '../../../../common/SPHelper';

import * as strings from 'FormFieldStrings';
import styles from './SPFormField.module.scss';

const SPFieldLookupEdit: React.SFC<ISPFormFieldProps> = (props) => {
    let choices = props.fieldSchema.Choices;
    if (props.fieldSchema["DependerValue"] != null) {
        let parentField = props.fieldSchema["DependerValue"].Field;
        let parentValue = props.fieldSchema["DependerValue"].Value;
        const splitArray = parentValue.split(';#');
        let values = splitArray.filter((item, idx) => (idx % 2 === 0));
        let parentId = Number(parentValue.split(";#")[0]);
        if (values.length > 0) {
            choices = choices.filter((x) => {
                let matches = values.filter((itm) => { return x.x[`${parentField}Id`] == itm; });
                return matches.length > 0;
            });
        }
    }
    let options = choices.map((option) => ({ key: option.LookupId, text: option.LookupValue }));
    if (props.fieldSchema.FieldType !== 'LookupMulti') {
        if (!props.required) { options = [{ key: 0, text: strings.LookupEmptyOptionText }].concat(options); }
        const value = props.value ? Number(props.value.split(';#')[0]) : 0;

        return <Dropdown
            className={css(styles.dropDownFormField, 'ard-lookupFormField')}
            options={options}
            selectedKey={value}
            onChanged={(item) => props.valueChanged(`${item.key};#${item.text}`)}
        />;
    } else {
        let values = [];
        if (props.value) {
            const splitArray = props.value.split(';#');
            values = SPHelper.LookupValueFromString(props.value);
            //Need to remove invalid options for better cascading
            values = values.filter((x) => {
                return options.filter((option) => option.key == x.key).length > 0;
            });
        }
        return <Dropdown
            className={css(styles.dropDownFormField, 'ard-lookupMultiFormField')}
            options={options}
            selectedKeys={values.map((val) => val.key)}
            multiSelect
            onChanged={(item) => props.valueChanged(getUpdatedValue(values, item))}
        />;
    }
};


function getUpdatedValue(oldValues: Array<{ key: number, text: string }>, changedItem: IDropdownOption): string {
    let newValues: Array<{ key: number, text: string }>;
    if (changedItem.selected) {
        newValues = [...oldValues, { key: Number(changedItem.key), text: changedItem.text }];
    } else {
        newValues = oldValues.filter((item) => item.key !== changedItem.key);
    }
    return SPHelper.LookupValueToString(newValues);
}

export default SPFieldLookupEdit;
