import * as React from 'react';
import { IForm } from '../model/FormField';
import useObject from '../../../Hooks/UseObject';
import { PrimaryButton, Stack, DialogFooter } from '@fluentui/react'
import { Field } from './Fields/Field';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Placeholder, WebPartTitle } from '@pnp/spfx-controls-react';
import { FormFieldCustomizer } from './Fields/FormFieldCustomizer';
import { GetLookupFields, NewField } from '../../../Util/Util';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { SPFxContext } from '../JsonFormWebPart';

export interface IJsonFormProps {
  Form: IForm;
  SaveForm: (updated: IForm) => void;
  Mode: DisplayMode;
}

export const JsonForm: React.FunctionComponent<IJsonFormProps> = (props: React.PropsWithChildren<IJsonFormProps>) => {
  const { Mode } = props;
  const { value: Form, updateValue: UpdateForm } = useObject<IForm>(props.Form);
  const { value: filledForm, updateValue } = useObject<any>();
  const { ListId } = React.useContext(SPFxContext);

  console.log(ListId);
  if (ListId == null || ListId == "")
    return <Placeholder description={'Open the property pane and select a list to store responses'} iconName={'Edit'} iconText={'Please configure web part'} />

  return (
    <>
      <WebPartTitle displayMode={Mode} title={Form.Title} updateProperty={(val) => UpdateForm({ Title: val })} />

      {Mode == DisplayMode.Read &&
        <>
          <Stack tokens={{ childrenGap: 5 }}>
            {Form.Fields.map(field => {
              return <Field field={field} onChange={updateValue} form={filledForm} />
            })}
          </Stack>
          <DialogFooter>
            <PrimaryButton text='Submit' iconProps={{ iconName: "Accept" }} onClick={() => alert(JSON.stringify(filledForm, null, 2))} />
          </DialogFooter>
        </>
      }

      {Mode == DisplayMode.Edit &&
        <>
          <Stack tokens={{ childrenGap: 5 }}>
            {Form.Fields.map((Field, index) => {
              return <FormFieldCustomizer
                allFieldsFlat={GetLookupFields(Form.Fields)}
                field={Field}
                delete={() => {
                  let fields = cloneDeep(Form.Fields).filter((x, i) => index != i);
                  UpdateForm({ Fields: fields });
                }}
                update={(val) => {
                  let fields = cloneDeep(Form.Fields)
                  fields[index] = { ...fields[index], ...val };
                  UpdateForm({ Fields: fields });
                }}
              />
            })}
            <PrimaryButton iconProps={{ iconName: "Add" }} text='Add field' onClick={() => UpdateForm({ Fields: [...Form.Fields, NewField()] })} />
          </Stack>

          <DialogFooter>
            <PrimaryButton text='Save form' iconProps={{ iconName: "save" }} onClick={() => props.SaveForm(Form)} />
          </DialogFooter>
        </>
      }
    </>
  );
};