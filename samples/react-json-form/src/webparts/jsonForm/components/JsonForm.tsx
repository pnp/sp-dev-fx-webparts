import * as React from 'react';
import useObject from '../../../Hooks/UseObject';
import { PrimaryButton, Stack, DialogFooter } from '@fluentui/react'
import { Field } from './Fields/Field';
import { DisplayMode } from '@microsoft/sp-core-library';
import { Placeholder, WebPartTitle } from '@pnp/spfx-controls-react';
import { FormFieldCustomizer } from './Fields/FormFieldCustomizer';
import { GetLookupFields, NewField } from '../../../Util/Util';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { FILLED_FORM_QUERY_KEY, SPFxContext } from '../JsonFormWebPart';
import { IForm } from '../../../Models/Form';

export interface IJsonFormProps {
  Form: IForm;
  SaveForm: (updated: IForm) => void;
  Mode: DisplayMode;
  ServerRelativeUrl?: string;
  ListId: string;
}

export const JsonForm: React.FunctionComponent<IJsonFormProps> = (props: React.PropsWithChildren<IJsonFormProps>) => {
  const { Mode, ServerRelativeUrl } = props;
  const { value: Form, updateValue: UpdateForm, overwriteData: __SETFORM } = useObject<IForm>(props.ServerRelativeUrl ? { Fields: [], Title: "" } : props.Form);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { value: filledForm, updateValue, overwriteData: __SETFILLEDFORM } = useObject<any>();
  const { provider } = React.useContext(SPFxContext);

  React.useEffect(() => {
    if (ServerRelativeUrl !== null) {
      const fetch = async (): Promise<void> => {
        const result = await provider.GetSubmission(ServerRelativeUrl);
        __SETFILLEDFORM(result.response);
        __SETFORM(result.form);
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetch();
    }
  }, [])

  const saveForm = async (): Promise<void> => {
    const serverRelativeUrl = await provider.SaveSubmission({ form: Form, response: filledForm });
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(FILLED_FORM_QUERY_KEY, serverRelativeUrl);
    window.location.search = searchParams.toString();
  }

  if (props.ListId === null || props.ListId === "")
    return <Placeholder description={'Open the property pane and select a list to store responses'} iconName={'Edit'} iconText={'Please configure web part'} />

  return (
    <>
      <WebPartTitle displayMode={Mode} title={Form.Title} updateProperty={(val) => UpdateForm({ Title: val })} />

      {Mode === DisplayMode.Read &&
        <>
          <Stack tokens={{ childrenGap: 5 }}>
            {Form.Fields.map((field, index) => {
              return <Field readonly={props.ServerRelativeUrl !== null} field={field} onChange={updateValue} form={filledForm} key={index} />
            })}
          </Stack>
          {props.ServerRelativeUrl === null &&
            <DialogFooter>
              <PrimaryButton text='Submit' iconProps={{ iconName: "Accept" }} onClick={() => saveForm()} />
            </DialogFooter>
          }
        </>
      }

      {Mode === DisplayMode.Edit &&
        <>
          <Stack tokens={{ childrenGap: 5 }}>
            {Form.Fields.map((Field, index) => {
              return <FormFieldCustomizer
              key={index}
                allFieldsFlat={GetLookupFields(Form.Fields)}
                field={Field}
                delete={() => {
                  const fields = cloneDeep(Form.Fields).filter((x, i) => index !== i);
                  UpdateForm({ Fields: fields });
                }}
                update={(val) => {
                  const fields = cloneDeep(Form.Fields)
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