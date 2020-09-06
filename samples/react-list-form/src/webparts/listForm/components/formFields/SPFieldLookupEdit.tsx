import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import { Dropdown, IDropdownProps, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { css } from 'office-ui-fabric-react/lib/Utilities';

import * as strings from 'FormFieldStrings';
import styles from './SPFormField.module.scss';

const SPFieldLookupEdit: React.SFC<ISPFormFieldProps> = (props) => {
    let options = props.fieldSchema.Choices.map((option) => ({ key: option.LookupId, text: option.LookupValue }));
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
            values = splitArray.filter((item, idx) => (idx % 2 === 0))
                .map((comp, idx) => ({ key: Number(comp), text: (splitArray.length > idx + 1) ? splitArray[idx + 1] : '' }));
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
    return newValues.reduce((valStr, item) => valStr + `${item.key};#${item.text}`, '');
}

export default SPFieldLookupEdit;
