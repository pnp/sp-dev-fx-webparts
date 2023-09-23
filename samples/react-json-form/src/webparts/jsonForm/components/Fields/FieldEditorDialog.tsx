/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import { FieldType, GroupDirection, IChoiceField, IConditionalField, IField, IGroupField } from '../../../../Models/FormField';
import { ActionButton, ChoiceGroup, DefaultButton, Dialog, DialogFooter, Dropdown, Label, Position, PrimaryButton, SpinButton, Stack, TextField } from '@fluentui/react';
import useObject from '../../../../Hooks/UseObject';
import { NewField } from '../../../../Util/Util';

export interface IFieldEditorDialogProps {
    field: IField;
    update: (updates: Partial<IField | IChoiceField | IGroupField | IConditionalField>) => void;
    cancel: () => void;
    delete: () => void;
    readonly allFieldsFlat: IField[];
}


export const FieldEditorDialog: React.FunctionComponent<IFieldEditorDialogProps> = (props: React.PropsWithChildren<IFieldEditorDialogProps>) => {
    const { value: field, updateValue } = useObject<IField | IChoiceField | IGroupField | IConditionalField>(props.field);

    return (
        <Dialog
            minWidth={500}
            dialogContentProps={{ title: "Edit field" }}
            hidden={false}
        >
            <Stack tokens={{ childrenGap: 5 }}>
                <Dropdown
                    label='Field type'
                    options={[
                        { key: FieldType.Header, text: "Header" },
                        { key: FieldType.Text, text: "Single line of text" },
                        { key: FieldType.MultilineText, text: "Multiple lines of text" },
                        { key: FieldType.Number, text: "Number" },
                        { key: FieldType.Boolean, text: "Checkbox (yes/no)" },
                        { key: FieldType.Choice, text: "Choice" },
                        { key: FieldType.MultiChoice, text: "Multi choice" },
                        { key: FieldType.Label, text: "Label" },
                        { key: FieldType.FieldGroup, text: "Group of fields" },
                        { key: FieldType.Conditional, text: "Conditional field" },
                    ]}
                    selectedKey={field.Type}
                    onChange={(_, val) => {
                        const t = val.key as FieldType;
                        const updates: Partial<IField | IChoiceField | IGroupField | IConditionalField> = { Type: t }

                        if (t === FieldType.Choice || t === FieldType.MultiChoice)
                            if ((field as IChoiceField).Options === null)
                                (updates as Partial<IChoiceField>).Options = [];

                        if (t === FieldType.Conditional)
                            if ((field as IConditionalField).Field === null)
                                (updates as Partial<IConditionalField>).Field = NewField();

                        if (t === FieldType.FieldGroup)
                            if ((field as IGroupField).Fields === null) {
                                (updates as Partial<IGroupField>).Fields = [];
                                (updates as Partial<IGroupField>).Direction = GroupDirection.Horizontal;
                            }

                        updateValue(updates);
                    }}
                />

                {FieldType.Conditional !== field.Type && <TextField label='Title' value={field.DisplayName} onChange={(_, val) => updateValue({ DisplayName: val })} />}


                {[FieldType.Choice, FieldType.MultiChoice].some(x => x === field.Type) && <ChoiceFieldOptions field={field as IChoiceField} updateValue={updateValue} />}
                {FieldType.Conditional === field.Type && <ConditionalFieldOptions field={field as IConditionalField} updateValue={updateValue} allFieldsFlat={props.allFieldsFlat} />}
                {FieldType.FieldGroup === field.Type && <GroupFieldOptions field={field as IGroupField} updateValue={updateValue} />}

                <DialogFooter>
                    <PrimaryButton text='Delete' iconProps={{ iconName: 'delete' }} onClick={() => props.delete()} styles={{ root: { backgroundColor: "#FF0000" }, rootHovered: { backgroundColor: "#D10000" }, rootChecked: { backgroundColor: "#A30000" } }} />
                    <PrimaryButton text='Save' iconProps={{ iconName: 'Save' }} onClick={() => props.update(field)} />
                    <DefaultButton text='Cancel' onClick={() => props.cancel()} />
                </DialogFooter>
            </Stack>
        </Dialog>
    );
};

export interface IGroupFieldOptionsProps {
    field: IGroupField;
    updateValue: (updates: Partial<IGroupField>) => void;
}

export const GroupFieldOptions: React.FunctionComponent<IGroupFieldOptionsProps> = (props: React.PropsWithChildren<IGroupFieldOptionsProps>) => {
    const { field, updateValue } = props;
    return (
        <>
            <ChoiceGroup
                label='Direction'
                selectedKey={field.Direction}
                options={[
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    { key: GroupDirection.Horizontal as any as string, text: "Horizontal", iconProps: { iconName: "AlignVerticalCenter" } },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    { key: GroupDirection.Vertical as any as string, text: "Vertical", iconProps: { iconName: "AlignHorizontalCenter" } }
                ]}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(_, val) => updateValue({ Direction: val.key as any as GroupDirection })}
            />
        </>
    );
};


interface IChoiceFieldOptionsProps {
    field: IChoiceField;
    updateValue: (updates: Partial<IChoiceField>) => void;
}

const ChoiceFieldOptions: React.FunctionComponent<IChoiceFieldOptionsProps> = (props: React.PropsWithChildren<IChoiceFieldOptionsProps>) => {
    const { field, updateValue } = props;
    return (<>
        <Label>Options</Label>
        {(field as IChoiceField).Options.map((val, index) => {
            return <div style={{ display: "flex" }} key={index}>
                <TextField
                    styles={{ root: { flexGrow: 1 } }}
                    value={val} onChange={(_, val) => {
                        const options = [...(field as IChoiceField).Options]
                        options[index] = val
                        updateValue({ Options: options });
                    }} />
                <ActionButton iconProps={{ iconName: "Delete" }} onClick={() => updateValue({ Options: (field as IChoiceField).Options.filter((_, i) => i !== index) })} />
            </div>
        })}
        <PrimaryButton iconProps={{ iconName: "Add" }} text='Add option' onClick={() => {
            updateValue({ Options: [...(field as IChoiceField).Options, ""] });
        }} />
    </>);
};


interface IConditionalFieldOptionsProps {
    field: IConditionalField;
    updateValue: (updates: Partial<IConditionalField>) => void;
    allFieldsFlat: IField[]
}

const ConditionalFieldOptions: React.FunctionComponent<IConditionalFieldOptionsProps> = (props: React.PropsWithChildren<IConditionalFieldOptionsProps>) => {
    const { allFieldsFlat, field, updateValue } = props
    const targetField = allFieldsFlat.filter(x => x.Id === (field as IConditionalField).LookupFieldId)[0]

    return (
        <>
            <Dropdown
                label='Field to look at:'
                options={props.allFieldsFlat.map(x => ({ text: x.DisplayName, key: x.Id }))}
                selectedKey={((field as IConditionalField).LookupFieldId)}
                onChange={(_, val) => updateValue({ LookupFieldId: val.key as string })}
            />

            {targetField !== null &&
                <>
                    {FieldType.Choice === targetField.Type && <Dropdown
                        label='Show if is equal to'
                        options={(targetField as IChoiceField).Options.map(x => ({ key: x, text: x }))}
                        selectedKey={(field as IConditionalField).MatchValue as string}
                        onChange={(_, val) => updateValue({ MatchValue: val.text })}
                    />}

                    {FieldType.Boolean === targetField.Type && <Dropdown
                        label='Show if is equal to'
                        options={[{ key: true.toString(), text: "Yes" }, { key: false.toString(), text: "No" }]}
                        selectedKey={(field as IConditionalField).MatchValue?.toString()}
                        onChange={(_, val) => updateValue({ MatchValue: val.key === true.toString() })}
                    />}

                    {FieldType.Number === targetField.Type && <SpinButton
                        label='Show if is equal to'
                        inputMode='numeric'
                        labelPosition={Position.top}
                        value={(field as IConditionalField).MatchValue as string}
                        onChange={(_, val) => updateValue({ MatchValue: Number(val) })}
                    />
                    }

                    {[FieldType.Text, FieldType.MultilineText].some(x => x === targetField.Type) && <TextField
                        value={(field as IConditionalField).MatchValue as string}
                        label={"Value to look for"}
                        onChange={(_, val) => updateValue({ MatchValue: val })}
                    />
                    }
                </>
            }
        </>
    );
};