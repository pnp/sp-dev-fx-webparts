import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';



import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { WebPartContext } from '@microsoft/sp-webpart-base';

const SPFieldUserEdit: React.SFC<ISPFormFieldProps> = (props) => {
    let principalType = [];
    let principals = [];
    let context: WebPartContext = null;
    let selectionCount = 1;
    let required = false;
    let readOnly = false;
    let groupName = "";
    if (props != null) {
        if (props.fieldSchema.PrincipalAccountType.indexOf("User") >= 0) {
            principalType.push(PrincipalType.User);
        }
        if (props.fieldSchema.PrincipalAccountType.indexOf("SecGroup") >= 0) {
            principalType.push(PrincipalType.SecurityGroup);
        }
        if (props.fieldSchema.PrincipalAccountType.indexOf("SPGroup") >= 0) {
            principalType.push(PrincipalType.SharePointGroup);
        }
        if (props.fieldSchema.AllowMultipleValues) {
            selectionCount = 100;
        }
        context = props.context;

        if (props.value != null && props.value != "") {
            principals = props.value.map((x) => {
                if (x.EntityData != null) {
                    if (x.EntityData.Email != null) {
                        return x.EntityData.Email;
                    }
                    else {
                        return x.Key;
                    }
                }
                else {
                    let parts = x.Key.split("|");
                    return parts[parts.length - 1];
                }
            });
        }
        required = props.fieldSchema.Required;
        readOnly = props.fieldSchema.ReadOnlyField;
        if (props.fieldSchema['SharePointGroupName'] != null) {
            groupName = props.fieldSchema['SharePointGroupName'];
        }
    }

    return <PeoplePicker
        context={context}
        personSelectionLimit={selectionCount}
        groupName={groupName}
        defaultSelectedUsers={principals}
        showtooltip={true}
        isRequired={required}
        disabled={readOnly}
        selectedItems={(items) => props.valueChanged(getUpdatedValue(items))}
        showHiddenInUI={false}
        principalTypes={principalType}
        resolveDelay={500} />;
};

function getUpdatedValue(items): [] {
    let values = items.map((x) => {
        return { 'Key': x.loginName };
    });
    return values;
}
export default SPFieldUserEdit;
