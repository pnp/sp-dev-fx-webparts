import * as React from 'react';
import { FieldType, GroupDirection, IChoiceField, IConditionalField, IField, IGroupField } from '../../../../Models/FormField';
import { ActionButton, Checkbox, Dropdown, Label, MessageBar, MessageBarType, Position, PrimaryButton, SpinButton, Text, TextField, getTheme } from '@fluentui/react';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { FieldEditorDialog } from './FieldEditorDialog';
import { NewField } from '../../../../Util/Util';
import styles from './FormFieldCustomizer.module.scss'

export interface IFormFieldCustomizer {
    field: IField;
    update: (updates: Partial<IField | IChoiceField | IGroupField | IConditionalField>) => void;
    delete: () => void;
    readonly allFieldsFlat: IField[];
}

const MAX_NUMBER_OF_ITEMS_IN_GROUP: number = 5;

export const FormFieldCustomizer: React.FunctionComponent<IFormFieldCustomizer> = (props: React.PropsWithChildren<IFormFieldCustomizer>) => {
    const { field } = props;
    const [shouldEdit, setShouldEdit] = React.useState<boolean>(false);

    const editDialog = <FieldEditorDialog
        allFieldsFlat={props.allFieldsFlat}
        field={field}
        update={(updates) => {
            props.update(updates);
            setShouldEdit(false)
        }}
        delete={() => {
            props.delete();
            setShouldEdit(false)
        }}
        cancel={() => setShouldEdit(false)}
    />


    if (FieldType.FieldGroup === field.Type) {
        const f = (field as IGroupField)
        const AtCapacity = f.Fields.length === MAX_NUMBER_OF_ITEMS_IN_GROUP;
        return <div>
            {shouldEdit && editDialog}
            <div style={{ display: "flex" }}>
                {(f.DisplayName !== null || f.DisplayName !== "") && <Label disabled>{f.DisplayName}</Label>}
                <ActionButton iconProps={{ iconName: "Edit" }} onClick={() => setShouldEdit(true)} />
                <ActionButton iconProps={{ iconName: "Delete" }} onClick={() => props.delete()} />
            </div>
            <div
                style={{
                    display: "grid",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    gridTemplateColumns: (field as IGroupField).Direction === GroupDirection.Horizontal ? `repeat(auto-fill,minmax(calc(${100 / ((field as any as IGroupField).Fields.length + (!AtCapacity ? 1 : 0))}% - 10px),1fr))` : '',
                    gap: 10
                }}>
                {f.Fields.map((child, index) => {
                    return <FormFieldCustomizer
                        key={child.Id}
                        allFieldsFlat={props.allFieldsFlat}
                        field={child}
                        delete={() => props.update({ Fields: (field as IGroupField).Fields.filter(x => x.Id !== child.Id) })}
                        update={(val) => {
                            const children = cloneDeep(f.Fields)
                            children[index] = { ...children[index], ...val };
                            props.update({ Fields: children });
                        }}
                    />
                })}
                {!AtCapacity && <PrimaryButton styles={{ root: { alignSelf: "end" } }} iconProps={{ iconName: "Add" }} text='Add field' onClick={() => props.update({ Fields: [...f.Fields, NewField()] })} />}
            </div>
        </div>;
    }

    if (FieldType.Conditional === field.Type) {
        const f = (field as IConditionalField);
        const lookupField = props.allFieldsFlat.filter(x => x.Id === f.LookupFieldId)[0];
        return <>
            {shouldEdit && editDialog}
            <div style={{ border: `1px solid ${getTheme().palette.themeDarkAlt}` }}>
                <div style={{ display: "flex", background: getTheme().palette.themeLighter, alignItems: 'center', paddingLeft: "1em" }}>
                    <Label>Visible if &apos;{lookupField?.DisplayName}&apos; is equal to &apos;{f.MatchValue?.toString()}&apos;</Label>
                    <ActionButton iconProps={{ iconName: "Edit" }} onClick={() => setShouldEdit(true)} />
                    <ActionButton iconProps={{ iconName: "Delete" }} onClick={() => props.delete()} />
                </div>
                <div style={{ padding: 10 }}>
                    <FormFieldCustomizer
                        allFieldsFlat={props.allFieldsFlat}
                        field={f.Field}
                        delete={() => props.update({ Field: NewField() })}
                        update={(val) => props.update({ Field: { ...f.Field, ...val } })}
                    />
                </div>
            </div >
        </>;
    }


    const genericProps = {
        styles: {
            title: { cursor: "pointer" },
            root: { cursor: "pointer" },
            label: { cursor: "pointer" },
            dropdown: { cursor: "pointer" },
            dropdownOptionText: { cursor: "pointer" },
            field: { cursor: "pointer" }
        },
        disabled: true,
        label: field.DisplayName
    }


    return (
        <span>
            {shouldEdit && editDialog}
            <div className={styles.EditField} onClick={() => setShouldEdit(true)}>

                {FieldType.Label === field.Type && <Label styles={{ root: { cursor: "pointer" } }} disabled>{field.DisplayName}</Label>}
                {FieldType.Header === field.Type && <Text variant='xLarge'>{field.DisplayName}</Text>}
                {FieldType.Text === field.Type && <TextField {...genericProps} />}
                {FieldType.MultilineText === field.Type && <TextField {...genericProps} rows={5} multiline />}
                {FieldType.Number === field.Type && <SpinButton {...genericProps} inputMode='numeric' labelPosition={Position.top} />}
                {FieldType.Boolean === field.Type && <Checkbox {...genericProps} styles={{ root: { marginTop: "2.5em" } }} />}
                {FieldType.Choice === field.Type && <Dropdown {...genericProps} options={[]} />}
                {FieldType.MultiChoice === field.Type && <Dropdown {...genericProps} options={[]} multiSelect />}
                {FieldType.PlaceHolder === field.Type && <MessageBar messageBarType={MessageBarType.info} styles={{ root: { marginTop: "2.1em" } }}>Press here to setup the field!</MessageBar>}

            </div>
        </span>
    );
};