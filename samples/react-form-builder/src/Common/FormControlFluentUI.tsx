import { Dropdown, Option, Checkbox, Input, Label, Radio, RadioGroup, RadioGroupOnChangeData, Textarea, InputOnChangeData, Field, InfoLabel, ComboboxProps, Combobox, OptionOnSelectData, SelectionEvents } from '@fluentui/react-components';
import * as React from 'react';
import { FieldTypes } from './FieldTypes';
import { SPHttpClient } from '@microsoft/sp-http';
import { ChangedFormEvent, ChoiceValue, ISPListField, ISPListFields } from "./ISPListFields";
import styles from './FormControlFluentUI.module.scss';
import { ValidationFactory } from './ValidationFactory';
import { LinkFieldValue } from './LinkFieldValue';
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { ErrorCircle24Filled, NumberSymbolSquare24Regular, TextNumberFormat24Filled, CurrencyDollarEuro24Filled } from '@fluentui/react-icons';
import { ChangeEvent } from 'react';
import { RestLookupFieldValue } from './RestLookupFieldValue';
import * as strings from 'DynamicFormularGeneratorWebPartStrings';

// https://fettblog.eu/typescript-react/hooks/#useeffect
// https://hackwild.com/article/event-handling-techniques/
// https://wanago.io/2020/03/09/functional-react-components-with-generic-props-in-typescript/
//https://linguinecode.com/post/onblur-vs-onchange-react-text-inputs

/**
 * TODO
 * PREVENT LOADING: https://de.reactjs.org/docs/react-component.html#shouldcomponentupdate
 * Lifecycle: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
 * 
 * Github UI 9
 * https://github.com/microsoft/fluentui
 * RoadMap: https://github.com/microsoft/fluentui/wiki/Fluent-UI-React-v9-Component-Roadmap
 * 
 * 
 * https://learn.microsoft.com/de-de/previous-versions/office/sharepoint-csom/ee540543(v=office.15)
 * 7 "<Field Type="Lookup" DisplayName="Kontakt:E-Mail" List="cc58cd01-2208-4150-8479-2b2a43252a6a" WebId="20e378fa-6c95-4c13-97cf-475388cdd8c6" ShowField="E_x002d_Mail" FieldRef="11c6ae9e-f621-47fb-970c-7e84d1b178f9" ReadOnly="TRUE" UnlimitedLengthInDocumentLibrary="FALSE" ID="{5e469cc7-37c4-4d01-90ae-92a93c0ea865}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Kontakt_x003a_E_x002d_Mail" Name="Kontakt_x003a_E_x002d_Mail" Version="1" />"
 * 3 "<Field Type="Note" DisplayName="MulipleText" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" NumLines="6" RichText="TRUE" RichTextMode="FullHtml" IsolateStyles="TRUE" Sortable="FALSE" ID="{c7956ee9-2cc1-415d-8d27-bafc2b458680}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="MulipleText" Name="MulipleText" ColName="ntext3" RowOrdinal="0" />"
 * 6 "<Field Type="Choice" DisplayName="Choice (OPTIONS)" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="RadioButtons" FillInChoice="FALSE" ID="{2eef270f-f37f-494b-9459-b85352dc6b5a}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Choice_x0020__x0028_OPTIONS_x002" Name="Choice_x0020__x0028_OPTIONS_x002" ColName="nvarchar11" RowOrdinal="0" Version="1"><Default>Option 1</Default><CHOICES><CHOICE>Option 1</CHOICE><CHOICE>Option 2</CHOICE><CHOICE>Option 3</CHOICE><CHOICE>Option 4</CHOICE></CHOICES></Field>"
 * 15 "<Field Type="MultiChoice" DisplayName="Choice (Multiple)" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" FillInChoice="FALSE" ID="{3412a836-13fa-47ea-92e8-543953c48654}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Choice_x0020__x0028_Multiple_x00" Name="Choice_x0020__x0028_Multiple_x00" ColName="ntext4" RowOrdinal="0" Version="1"><Default>Option 1</Default><CHOICES><CHOICE>Option 1</CHOICE><CHOICE>Option 2</CHOICE><CHOICE>Option 3</CHOICE><CHOICE>Option 4</CHOICE></CHOICES></Field>"
 * 9 "<Field Type="Number" DisplayName="Number" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" ID="{ddba5cae-b839-4ca2-b98d-d7775a338175}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Number" Name="Number" ColName="float1" RowOrdinal="0" />"
 * 10 "<Field Type="Currency" DisplayName="Currency" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" LCID="1031" ID="{341d8419-9aa9-4a6c-acf8-ccbd0b730812}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Currency" Name="Currency" ColName="float2" RowOrdinal="0" />"
 * 4 "<Field Type="DateTime" DisplayName="DateOnly" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="DateOnly" FriendlyDisplayFormat="Disabled" ID="{0f7688d3-cca8-4b41-87f4-e8819ab1d932}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="DateOnly" Name="DateOnly" ColName="datetime1" RowOrdinal="0" />"
 * 4 "<Field Type="DateTime" DisplayName="DateAndTime" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="DateTime" FriendlyDisplayFormat="Disabled" ID="{5c24f347-83bf-4098-ae1b-ee6116cd3aea}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="DateAndTime" Name="DateAndTime" ColName="datetime2" RowOrdinal="0" />"
 * 8 "<Field Type="Boolean" DisplayName="YesNo" EnforceUniqueValues="FALSE" Indexed="FALSE" ID="{e865f35f-0c28-451c-b750-be1604e916ed}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="YesNo" Name="YesNo" ColName="bit1" RowOrdinal="0"><Default>1</Default></Field>"
 * 12 "<Field ID="{82642ec8-ef9b-478f-acf9-31f7d45fbc31}" ReadOnly="TRUE" Type="Computed" Name="LinkTitle" DisplayName="Title" DisplayNameSrcField="Title" ClassInfo="Menu" AuthoringInfo="(linked to item with edit menu)" ListItemMenuAllowed="Required" LinkToItemAllowed="Prohibited" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkTitle" FromBaseType="TRUE"><FieldRefs><FieldRef Name="Title" /><FieldRef Name="LinkTitleNoMenu" /><FieldRef Name="_EditMenuTableStart2" /><FieldRef Name="_EditMenuTableEnd" /></FieldRefs><DisplayPattern><FieldSwitch><Expr><GetVar Name="FreeForm" /></Expr><Case Value="TRUE"><Field Name="LinkTitleNoMenu" /></Case><Default><HTML><![CDATA[<div class="ms-vb itx" onmouseover="OnItem(this)" CTXName="ctx]]></HTML><Field Name="_EditMenuTableStart2" /><HTML><![CDATA[">]]></HTML><Field Name="LinkTitleNoMenu" /><HTML><![CDATA[</div>]]></HTML><HTML><![CDATA[<div class="s4-ctx" onmouseover="OnChildItem(this.parentNode); return false;">]]></HTML><HTML><![CDATA[<span>&nbsp;</span>]]></HTML><HTML><![CDATA[<a onfocus="OnChildItem(this.parentNode.parentNode); return false;" onclick="PopMenuFromChevron(event); return false;" href="javascript:;" title="Open Menu"></a>]]></HTML><HTML><![CDATA[<span>&nbsp;</span>]]></HTML><HTML><![CDATA[</div>]]></HTML></Default></FieldSwitch></DisplayPattern></Field>"
 * 20 "<Field Type="User" DisplayName="Person" List="UserInfo" Required="FALSE" EnforceUniqueValues="FALSE" ShowField="ImnName" UserSelectionMode="PeopleOnly" UserSelectionScope="0" ID="{737f5379-7404-4a0b-9e42-a1beee85f68a}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Person" Name="Person" ColName="int2" RowOrdinal="0" />" 
 * 11 "<Field Type="URL" DisplayName="LinkOrImage" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="Hyperlink" ID="{1e0ea48f-f39c-4cfe-92fa-978dd0f6c784}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="LinkOrImage" Name="LinkOrImage" ColName="nvarchar12" RowOrdinal="0" ColName2="nvarchar13" RowOrdinal2="0" />"
 * 33 "<Field DisplayName="Details" Format="Dropdown" IsModern="TRUE" Name="Details" Title="Details" Type="Location" ID="{d256e1c8-02b5-4ee1-b2b7-664c634f700f}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Details" ColName="ntext2" RowOrdinal="0" />"
 * 34 "<Field Type="Thumbnail" DisplayName="OnlyImage" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" ID="{423329b0-41e7-4452-bca6-2ccac301f6df}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="OnlyImage" Name="OnlyImage" ColName="ntext5" RowOrdinal="0" />"
*/
type FormFieldState = {
  errorMessage: string;
  currentFormValue: LinkFieldValue | string | string[] | boolean | ChoiceValue | Date | RestLookupFieldValue;
  lookupChoices?: ChoiceValue[];
}

type DropDownSelection = {
  optionText: string;
  optionValue: string;
  selectedOptions: string[];
}

const ValidationMarker: React.FunctionComponent<FormFieldState> = (props: FormFieldState) => {
  if (props.errorMessage.length > 0) {
    return (
      <div className={styles.errorPanel}>
        <ErrorCircle24Filled />
        <span>{props.errorMessage}</span>
      </div>);
  }
  return null;
};

export class FormControlFluentUI extends React.Component<ISPListField, FormFieldState> {
  public onFormdataChanged?: ChangedFormEvent;
  private UI_LABELSIZE: 'small' | 'medium' | 'large' = "small";

  constructor(fieldData: ISPListField) {
    super(fieldData);
    this.state = {
      currentFormValue: null,
      errorMessage: ""
    };
    this.onFormdataChanged = this.props.ChangedHandler;
  }

  private _onDateTimeChanged = (ev: ChangeEvent<HTMLInputElement>, data: InputOnChangeData): void => {
    const formTag: HTMLInputElement = ev.target;
    this.manageFormFieldChanges(formTag.type === "checkbox" ? formTag.checked : formTag.value, formTag.id, formTag);
  }

  private _onBlurHandlerDatePicker = (ev: React.FocusEvent<HTMLInputElement>): void => {
    const formTag: HTMLInputElement = ev.target;
    this.manageFormFieldChanges(new Date(formTag.value), formTag.id, formTag);
  }

  private _onBlurHandler = (ev: React.FocusEvent<HTMLInputElement>): void => {
    const formTag: HTMLInputElement = ev.target;
    this.manageFormFieldChanges(formTag.type === "checkbox" ? formTag.checked : formTag.value, formTag.id, formTag);
  }

  private _onBlurHandlerTextArea = (ev: React.FocusEvent<HTMLTextAreaElement>): void => {
    const formTag: HTMLTextAreaElement = ev.target;
    this.manageFormFieldChanges(formTag.value, formTag.id, formTag);
  }

  private _onChangedRadioGroupList = (ev: React.FocusEvent<HTMLDivElement>, data: RadioGroupOnChangeData): void => {
    this.manageFormFieldChanges(data.value, this.props.InternalName, null);
  }

  private _onDropdDownSelectionChanged = (event: any, data: DropDownSelection): void => {
    if (this.props.FieldTypeKind === FieldTypes.MULTICHOICE) {
      this.manageFormFieldChanges(data.selectedOptions, this.props.InternalName, null);
    }
    else {
      this.manageFormFieldChanges(data.optionValue, this.props.InternalName, null);
    }
  }

  private manageFormFieldChanges(newValue: LinkFieldValue | string | string[] | boolean | ChoiceValue | Date | RestLookupFieldValue, formID: string, sourceElement: HTMLInputElement | HTMLTextAreaElement): void {
    let fieldValueToSet: string | string[] | LinkFieldValue | boolean | ChoiceValue | Date | RestLookupFieldValue = newValue;
    let rawNewValue: string = fieldValueToSet.toString();
    console.log(this.state.currentFormValue);
    if (this.props.FieldTypeKind === FieldTypes.URLORIMAGE) {
      if (formID.indexOf("Alternate") !== -1) {
        const linkValue = this.state.currentFormValue === null || this.state.currentFormValue === "" ? "" : (this.state.currentFormValue as LinkFieldValue).Url;
        fieldValueToSet = {
          Url: linkValue,
          Description: newValue as string
        }
      }
      else {
        const labelValue = this.state.currentFormValue === null || this.state.currentFormValue === "" ? "" : (this.state.currentFormValue as LinkFieldValue).Description;
        fieldValueToSet = {
          Url: newValue as string,
          Description: labelValue
        }
        rawNewValue = fieldValueToSet.Url;
      }
    }
    if (this.props.FieldTypeKind === FieldTypes.LOOKUP) {
      fieldValueToSet = this.state.lookupChoices.filter(x => x.Value === newValue)[0];
      rawNewValue = fieldValueToSet.Title;
    }

    const validationResult: string = ValidationFactory.ValidateFormData(sourceElement, this.props, rawNewValue);

    this.setState({ errorMessage: validationResult, currentFormValue: fieldValueToSet });

    if (!this.onFormdataChanged) return
    this.onFormdataChanged(this.props, fieldValueToSet, validationResult);
  }

  public componentDidMount(): void {
    if (this.props.FieldTypeKind === FieldTypes.LOOKUP) {
      this.qryLookupListData();
    }
    /*window.addEventListener('dynamic-form-reset', () => {
      const ctl : HTMLFormElement = document.getElementById(this.props.InternalName) as HTMLFormElement;
    });*/
  }

  private async qryLookupListData(): Promise<void> {
    const filterFields = this.props.DependentLookupInternalNames.map(fieldName => {
      return `StaticName%20eq%20%27${fieldName.replace("_x0020_", "")}%27%20or%20StaticName%20eq%20%27${fieldName}%27%20or%20Title%20eq%20%27${fieldName}%27`;
    }).join("%20or%20");

    const endpointFields = `${this.props.SiteUrl}/_api/web/lists/getbyid('${this.props.LookupField.List}')/Fields?$filter=${filterFields}`;
    const response = await this.props.httpClient.get(endpointFields, SPHttpClient.configurations.v1);
    const lookupFieldInfo: ISPListFields = await response.json();

    const endpoint = `${this.props.SiteUrl}/_api/web/lists/getbyid('${this.props.LookupField.List}')/Items`; //?$select=Id,Title`
    const responseData = await this.props.httpClient.get(endpoint, SPHttpClient.configurations.v1);
    const data: ISPListFields = await responseData.json();
    const choices = new Array<ChoiceValue>();
    let details: string = "";
    data.value.forEach((item: any) => {
      details = "";
      if (this.props.DependentLookupInternalNames !== null && this.props.DependentLookupInternalNames.length > 0) {
        details = this.props.DependentLookupInternalNames.map(fieldName => {
          const field = lookupFieldInfo.value.filter(f => f.StaticName === fieldName || f.Title === fieldName || f.StaticName === fieldName.replace("_x0020_", ""))[0];
          return this.formatFieldValue(item[field.StaticName], field);
        }).filter(x => x.length > 0).join(" | ");
      }
      choices.push({
        Title: item[this.props.LookupField.ShowField],
        Value: item.ID,
        Details: details
      });
    });
    this.setState({
      lookupChoices: choices
    });
  }

  private formatFieldValue(rawValue: string, field: ISPListField): string {
    if (field !== undefined && field !== null && rawValue !== null) {
      if (field.FieldTypeKind === FieldTypes.DATETIME) {
        const dateObj: Date = new Date(rawValue);
        return dateObj.toLocaleDateString();
      }
    }
    return typeof rawValue === "undefined" || rawValue === null ? "" : rawValue;
  }

  public render(): React.ReactElement<ISPListField> {
    return (
      <div className={styles.formFieldContainer}>
        {(this.props.FieldTypeKind !== FieldTypes.BOOLEAN || (this.props.Description.length > 0)) &&
          <div className={this.props.FieldTypeKind === FieldTypes.BOOLEAN ? styles.inline : null}>
            {this.props.FieldTypeKind !== FieldTypes.BOOLEAN &&
              <Label size={this.UI_LABELSIZE} htmlFor={this.props.InternalName}
                required={this.props.Required} id={`${this.props.StaticName}Label`}>
                {this.props.Title}
              </Label>
            }
            {this.props.FieldTypeKind !== FieldTypes.BOOLEAN && this.props.Description.length > 0 &&
              <InfoLabel id={`${this.props.StaticName}Info`}
                size="medium"
                aria-labelledby={`${this.props.StaticName}Label ${this.props.StaticName}Info`}
                info={this.props.Description} />
            }
            {this.props.FieldTypeKind === FieldTypes.BOOLEAN && this.props.Description.length > 0 &&
              <InfoLabel id={`${this.props.StaticName}Info`}
                size="large"
                info={this.props.Description} />
            }
          </div>
        }
        {this.renderFormControl()}
        <ValidationMarker errorMessage={this.state.errorMessage} currentFormValue={this.state.currentFormValue} />
      </div>
    );
  }

  private renderFormControl(): React.ReactElement<ISPListField> {
    if (this.props.FieldTypeKind === FieldTypes.CHOICE || this.props.FieldTypeKind === FieldTypes.MULTICHOICE) {
      if (typeof this.props.Choices !== "undefined" && this.props.Choices.length > 0) {
        if (this.props.ChoiceUI === "RadioButtons") {
          return (
            <div>
              <RadioGroup aria-labelledby={this.props.InternalName} name={this.props.InternalName} id={this.props.InternalName} onChange={this._onChangedRadioGroupList}>
                {this.props.Choices.map(option => (
                  <Radio name={this.props.InternalName} label={option} value={option} key={this.props.InternalName} disabled={this.props.ReadOnlyField || this.props.IsDisabled} />
                ))}
              </RadioGroup>
            </div>);
        }
        return (
          <div>
            <Dropdown
              aria-labelledby={this.props.InternalName}
              name={this.props.InternalName}
              multiselect={this.props.FieldTypeKind === FieldTypes.MULTICHOICE}
              id={this.props.InternalName}
              inlinePopup={true}
              defaultValue={this.props.DefaultValue}
              disabled={this.props.ReadOnlyField || this.props.IsDisabled}
              onOptionSelect={this._onDropdDownSelectionChanged}>
              {this.props.Choices.map(option => (
                <Option key={option}>
                  {option}
                </Option>
              ))}
            </Dropdown>
          </div>);
      }
    }
    if (this.props.FieldTypeKind === FieldTypes.LOOKUP) {
      return (<div>
        <Dropdown disabled={this.props.ReadOnlyField || this.props.IsDisabled}
          name={this.props.InternalName}
          id={this.props.InternalName}
          inlinePopup={true}
          multiselect={false}
          onOptionSelect={this._onDropdDownSelectionChanged}>
          {this.state.lookupChoices && this.state.lookupChoices.map(option => (
            <Option key={option.Value} value={option.Value} text={option.Title}>
              <span>
                {option.Title}
                {option.Details && <span><br />{option.Details}</span>}
              </span>
            </Option>
          ))}
        </Dropdown>
      </div>);
    }
    if (this.props.FieldTypeKind === FieldTypes.BOOLEAN) {
      return (<div className={this.props.Description.length > 0 ? styles.inline : null}>
        <Checkbox label={this.props.Title}
          disabled={this.props.ReadOnlyField || this.props.IsDisabled}
          name={this.props.InternalName}
          id={this.props.InternalName}
          defaultChecked={this.props.DefaultValue === "1"}
          onChange={this._onBlurHandler} />
      </div>);
    }
    if (this.props.FieldTypeKind === FieldTypes.NOTE) {
      if (this.props.IsRichTextAllowed) {
        return (<div><p>Not supported</p></div>);
      }
      else {
        return (<Field size='small'>
          <Textarea disabled={this.props.ReadOnlyField || this.props.IsDisabled}
            name={this.props.InternalName}
            id={this.props.InternalName}
            resize='both'
            onBlur={this._onBlurHandlerTextArea} />
        </Field>);
      }
    }
    if (this.props.FieldTypeKind === FieldTypes.URLORIMAGE) {
      if (this.props.LinkUI === "Hyperlink") {
        return (
          <>
            <div>
              <Input name={this.props.InternalName}
                id={this.props.InternalName}
                placeholder={strings.LblPchEnterUrl}
                type="url"
                className={styles.textInput}
                disabled={this.props.ReadOnlyField || this.props.IsDisabled}
                onBlur={this._onBlurHandler} />
            </div>
            <div>
              <Label size={this.UI_LABELSIZE} htmlFor={`${this.props.InternalName}Alternate`} required={false}>
                {strings.LblPchEnterAlternateText}
              </Label>
              <Input name={this.props.InternalName + 'Alternate'}
                id={this.props.InternalName + 'Alternate'}
                type="text"
                className={styles.textInput}
                placeholder={strings.LblPchEnterAlternateText}
                disabled={this.props.ReadOnlyField || this.props.IsDisabled}
                onBlur={this._onBlurHandler} />
            </div>
          </>
        )
      }
      else {
        return (<div><p>Not supported</p></div>);
      }
    }
    if (this.props.FieldTypeKind === FieldTypes.DATETIME) {
      return (<div>
        <DatePicker name={this.props.InternalName} id={this.props.InternalName}
          allowTextInput
          onBlur={this._onBlurHandlerDatePicker}
          onChange={this._onDateTimeChanged}
          disabled={this.props.ReadOnlyField || this.props.IsDisabled}
        />
      </div>);
    }
    if (this.props.FieldTypeKind === FieldTypes.NUMBER || this.props.FieldTypeKind === FieldTypes.CURRENCY) {
      let placeHolder: string = "";
      if (Math.abs(this.props.MinimumValue) !== Number.MAX_VALUE)
        placeHolder = `${strings.LBLFormMinValue}: ${this.props.MinimumValue}`;
      if (this.props.MaximumValue !== Number.MAX_VALUE)
        placeHolder = `${placeHolder.length > 0 ? placeHolder + " " + strings.LBLFormMaxMinValue + ": " : strings.LBLFormMaxValue}: ${this.props.MaximumValue}`;
      return (<div>
        <Input name={this.props.InternalName} id={this.props.InternalName}
          onBlur={this._onBlurHandler}
          disabled={this.props.ReadOnlyField || this.props.IsDisabled}
          placeholder={placeHolder}
          contentBefore={this.props.FieldTypeKind === FieldTypes.NUMBER ? <NumberSymbolSquare24Regular /> : <CurrencyDollarEuro24Filled />}
          type='number'
        />
      </div>);
    }
    // REST endpoints
    const onOptionSelect: ComboboxProps['onOptionSelect'] = (e: SelectionEvents, data: OptionOnSelectData) => {
      this.manageFormFieldChanges({ Display: data.optionText, Value: data.optionValue } as RestLookupFieldValue, this.props.InternalName, null);
    };
    if (typeof this.props.RESTLookup !== "undefined" && this.props.RESTLookup !== null) {
      return (<div>
        <Combobox
          disabled={this.props.ReadOnlyField || this.props.IsDisabled}
          value={(this.state.currentFormValue !== null ? (this.state.currentFormValue as RestLookupFieldValue).Display : "")}
          id={this.props.InternalName}
          onOptionSelect={onOptionSelect}
          onChange={async (ev: React.ChangeEvent<HTMLInputElement>) => {
            if (ev.target.value.length > 0) {
              const response = await fetch(this.props.RESTLookup.RestEndpointUrl.replace("@@VALUE@@", ev.target.value));
              const body = await response.json();
              const mapped = body[this.props.RESTLookup.CollectionPropertyName].map((n: any) => {
                return { Title: n[this.props.RESTLookup.DisplayPropertyName], Value: n[this.props.RESTLookup.IDPropertyName] } as ChoiceValue;
              });
              this.setState({
                lookupChoices: mapped
              });
            }
            else {
              this.setState({
                currentFormValue: { Display: ev.target.value, Value: ev.target.value } as RestLookupFieldValue
              });
              this.manageFormFieldChanges(ev.target.value, this.props.InternalName, null);
            }
          }}
        >
          {this.state.lookupChoices && this.state.lookupChoices.map((element: ChoiceValue) => (
            <Option key={element.Value} value={element.Value}>
              {element.Title}
            </Option>
          ))}
        </Combobox>
      </div>);
    }
    return (<div>
      <Input name={this.props.InternalName} id={this.props.InternalName}
        defaultValue={this.props.DefaultValue}
        onBlur={this._onBlurHandler}
        disabled={this.props.ReadOnlyField || this.props.IsDisabled}
        className={styles.textInput}
        contentBefore={<TextNumberFormat24Filled />}
        type={this.props.FieldTypeKind === FieldTypes.NUMBER ? 'number' : 'text'}
      />
    </div>);
  }
}