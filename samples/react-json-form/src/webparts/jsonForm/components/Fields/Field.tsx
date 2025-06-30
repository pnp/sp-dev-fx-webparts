import * as React from 'react';
import { FieldType, GroupDirection, IChoiceField, IConditionalField, IField, IGroupField } from '../../../../Models/FormField';
import { Position, SpinButton, TextField, Checkbox, Dropdown, MessageBar, MessageBarType, Text } from '@fluentui/react';
import { Label } from 'office-ui-fabric-react';


export interface IFieldProps {
    onChange: (updates: object) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form: any;
    field: IField;
    readonly: boolean;
}

export const Field: React.FunctionComponent<IFieldProps> = (props: React.PropsWithChildren<IFieldProps>) => {
    const { field, onChange, form, readonly } = props;
    switch (field.Type) {
        case FieldType.Label: return <Label>{field.DisplayName}</Label>;

        case FieldType.Header: return <Text variant='xLarge'>{field.DisplayName}</Text>;

        case FieldType.Text: return <TextField
            value={form[field.Id] ?? ""}
            label={field.DisplayName}
            readOnly={readonly}
            onChange={(_, val) => onChange({ [field.Id]: val })}
        />;

        case FieldType.MultilineText: return <TextField
            value={form[field.Id] ?? ""}
            label={field.DisplayName}
            rows={5}
            multiline
            readOnly={readonly}
            onChange={(_, val) => onChange({ [field.Id]: val })}
        />;

        case FieldType.Number: return <SpinButton
            inputMode='numeric'
            labelPosition={Position.top}
            value={form[field.Id] ?? ""}
            label={field.DisplayName}
            onChange={readonly ? null : (_, val) => onChange({ [field.Id]: Number(val) })}
        />;

        case FieldType.Boolean: return <Checkbox
            label={field.DisplayName}
            checked={form[field.Id] ?? false}
            onChange={readonly ? () => null : (_, val) => onChange({ [field.Id]: val })}
            styles={{ root: { alignItems: 'center', marginTop: "1.75em" } }}
        />;

        case FieldType.Choice: return <Dropdown
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            options={(field as any as IChoiceField).Options.map(x => ({ key: x, text: x }))}
            selectedKey={form[field.Id] ?? ""}
            label={field.DisplayName}
            onChange={readonly ? null : (_, option) => onChange({ [field.Id]: option.key })}
        />

        case FieldType.MultiChoice: return <Dropdown
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            options={(field as any as IChoiceField).Options.map(x => ({ key: x, text: x }))}
            selectedKeys={form[field.Id] ?? []}
            label={field.DisplayName}
            multiSelect
            onChange={readonly ? null : (_, val) => {
                let selected: string[] = form[field.Id] ?? [];
                selected = val.selected ? [...selected, val.key as string] : selected.filter(x => x !== val.key);
                onChange({ [field.Id]: selected })
            }}
        />

        case FieldType.FieldGroup: return <div>
            {(field.DisplayName !== null || field.DisplayName !== "") && <Label>{field.DisplayName}</Label>}
            <div
                style={{
                    display: "grid",
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    gridTemplateColumns: (field as IGroupField).Direction === GroupDirection.Horizontal ? `repeat(auto-fill,minmax(calc(${100 / (field as any as IGroupField).Fields.length}% - 10px),1fr))` : '',
                    gap: 10
                }}>
                {(field as IGroupField).Fields.map((f, index) => <Field {...props} field={f} key={index} />)}
            </div>
        </div>;

        case FieldType.Conditional: {
            const f = (field as IConditionalField);
            const visible = form[f.LookupFieldId] === f.MatchValue
            if (!visible) return <></>
            return <Field readonly={readonly} field={f.Field} form={form} onChange={onChange} />
        }
    }


    return <MessageBar messageBarType={MessageBarType.error} styles={{ root: { marginTop: "1.75em" } }}>Field not configured</MessageBar>
};