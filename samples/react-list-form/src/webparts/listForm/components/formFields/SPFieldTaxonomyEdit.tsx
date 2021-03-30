import * as React from 'react';
import { ISPFormFieldProps } from './SPFormField';
import { TaxonomyPicker, IPickerTerms } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'FormFieldStrings';
import styles from './SPFormField.module.scss';

const SPFieldTaxonomyEdit: React.SFC<ISPFormFieldProps> = (props) => {
    let context: WebPartContext = null;
    let termsetId = "";
    let allowMultipleSelections = false;
    let terms = null;

    if (props != null) {
        context = props.context;
        termsetId = props.fieldSchema.TermSetId;
        allowMultipleSelections = props.fieldSchema.AllowMultipleValues;
        if (props.value != null && props.value != "") {
            terms = [];
            let multiparts = props.value.split(";");
            multiparts.forEach((x) => {
                let parts = x.split("|");
                terms.push({
                    key: parts[1],
                    name: parts[0],
                });
            });
        }
    }

    return <TaxonomyPicker
        allowMultipleSelections={allowMultipleSelections}
        termsetNameOrID={termsetId}
        panelTitle={strings.SelectTerm}
        label=""
        initialValues={terms}
        context={context}
        onChange={(items) => props.valueChanged(getUpdatedValue(items))}
        isTermSetSelectable={false} />;
};

function getUpdatedValue(terms) {
    let value = "";
    for (let i = 0; i < terms.length; i++) {
        if (i > 0) {
            value += ";";
        }
        value += terms[i].name + "|" + terms[i].key;
    }
    return value;
}
export default SPFieldTaxonomyEdit;
