import * as React from 'react';
import styles from './DynamicFormularGenerator.module.scss';
import { IDynamicFormularGeneratorProps } from './IDynamicFormularGeneratorProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import { ChoiceValue, ISPListField, ISPListFields } from '../../../Common/ISPListFields'; //await this.qryListFields(this.props.listID);    
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { FormControlFluentUI } from '../../../Common/FormControlFluentUI';
import { FieldTypes } from '../../../Common/FieldTypes';
import { Helper } from '../../../Common/Helper';
import { Button, Spinner } from '@fluentui/react-components';
import { ISPListItem } from '../../../Common/ISPListItem';
import { ISPFormLists } from '../../../Common/ISPFormLists';
import * as strings from 'DynamicFormularGeneratorWebPartStrings';
import { FlashSettings24Regular } from '@fluentui/react-icons';
import { LinkFieldValue } from '../../../Common/LinkFieldValue';
import { RestLookupFieldValue } from '../../../Common/RestLookupFieldValue';

type FormState = {
  errorMessage: string[];
  isFormValid: boolean;
  isProcessing: boolean;
  isAlreadySent: boolean;
  formFields: string[];
}

export default class DynamicFormularGenerator extends React.Component<IDynamicFormularGeneratorProps, FormState> {
  private availableFields: ISPListFields = null;
  private currentViewXML: string = "";
  private currentListID: string = "";
  private parser: DOMParser = null;
  private attachmentCtl: React.ReactNode[] = null;
  private uploadFileList: { [key: string]: File } = {};

  constructor(props: IDynamicFormularGeneratorProps) {
    super(props);
    this.state = {
      errorMessage: new Array<string>(),
      isFormValid: false,
      isProcessing: false,
      isAlreadySent: false,
      formFields: []
    }
    this.parser = new DOMParser();
  }

  private getFieldSchemata(schemaXML: string): Element {
    const xmlDoc = this.parser.parseFromString(schemaXML, "text/xml");
    return xmlDoc.getElementsByTagName("Field")[0];
  }
  private getAttributeValue(dom: Element, attributeToRead: string): string {
    if (typeof dom !== "undefined" && dom !== null)
      return dom.getAttribute(attributeToRead);
    return "";
  }

  private async qryFormFields(): Promise<void> {
    if (this.validateConfiguration() && (this.props.viewXml !== this.currentViewXML || this.currentListID !== this.props.listID)) {
      this.currentViewXML = this.props.viewXml;
      this.currentListID = this.props.listID;
      this.availableFields = await this.qryListFields(this.props.listID);
      const temp: string = this.props.viewXml.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(temp, "text/xml");
      const tempFields: string[] = [];    // TODO: replace with helper method       
      xmlDoc.getElementsByTagName("ViewFields")[0].childNodes.forEach((node: HTMLElement, index) => {
        const fieldInfo: ISPListField = this.availableFields.value.filter(f => f.StaticName === node.getAttribute("Name"))[0];
        fieldInfo.IsValid = !fieldInfo.Required;
        tempFields.push(node.getAttribute("Name"));
      });
      this.setState({ formFields: tempFields });
    }
  }

  private validateConfiguration(): boolean {
    return (typeof this.props.viewXml !== "undefined" && typeof this.props.listID !== "undefined");
  }

  private qryListFields(listID: string): Promise<ISPListFields> {
    const endpoint = `${this.props.siteURL}/_api/web/lists/getbyid('${listID}')/Fields`;
    return this.props.httpClient.get(
      endpoint,
      SPHttpClient.configurations.v1
    )
      .then((response: { json: () => any; }) => {
        return response.json();
      });
  }

  private getFieldMetaData(fieldInfo: ISPListField): ISPListField {
    const fieldSchemata = this.getFieldSchemata(fieldInfo.SchemaXml);
    fieldInfo.Decimals = 0;
    if (fieldInfo.FieldTypeKind === FieldTypes.NUMBER) {
      fieldInfo.Decimals = parseInt(this.getAttributeValue(fieldSchemata, "Decimals"), 10);
      if (fieldInfo.DefaultValue === null)
        fieldInfo.DefaultValue = "0";
    }
    if (fieldInfo.FieldTypeKind === FieldTypes.CURRENCY) {
      fieldInfo.Decimals = 2;
      fieldInfo.CurrencyLocaleId = parseInt(this.getAttributeValue(fieldSchemata, "CurrencyLocaleId"), 10);
      fieldInfo.CommaSeparator = this.getAttributeValue(fieldSchemata, "CommaSeparator") === "true";
      if (fieldInfo.DefaultValue === null)
        fieldInfo.DefaultValue = "0";
    }
    if (fieldInfo.FieldTypeKind === FieldTypes.CHOICE || fieldInfo.FieldTypeKind === FieldTypes.MULTICHOICE) {
      if (typeof fieldInfo.Choices !== "undefined" && fieldInfo.Choices.length > 0) {
        fieldInfo.ChoiceUI = this.getAttributeValue(fieldSchemata, "Format");
      }
    }
    if (fieldInfo.FieldTypeKind === FieldTypes.NOTE) {
      fieldInfo.IsRichTextAllowed = this.getAttributeValue(fieldSchemata, "RichText") === "True";
    }
    if (fieldInfo.FieldTypeKind === FieldTypes.URLORIMAGE) {
      fieldInfo.LinkUI = this.getAttributeValue(fieldSchemata, "Format");
    }
    if (fieldInfo.FieldTypeKind === FieldTypes.LOOKUP) {
      fieldInfo.LookupField = {
        DisplayName: this.getAttributeValue(fieldSchemata, "DisplayName"),
        FieldRef: this.getAttributeValue(fieldSchemata, "FieldRef"),
        ID: this.getAttributeValue(fieldSchemata, "ID"),
        List: this.getAttributeValue(fieldSchemata, "List"),
        Name: this.getAttributeValue(fieldSchemata, "Name"),
        ReadOnly: this.getAttributeValue(fieldSchemata, "ReadOnly") === "TRUE",
        ShowField: this.getAttributeValue(fieldSchemata, "ShowField"),
        StaticName: this.getAttributeValue(fieldSchemata, "StaticName"),
        WebId: this.getAttributeValue(fieldSchemata, "WebId"),
        LookupChoices: new Array<ChoiceValue>()
      };
    }
    return fieldInfo;
  }

  private formComponentFactory(fieldStaticName: string): React.ReactNode {
    if (this.availableFields !== null) {
      let fieldInfo: ISPListField = this.availableFields.value.filter(f => f.StaticName === fieldStaticName)[0];
      if (fieldInfo === undefined)
        return null;

      if (fieldInfo.IsDependentLookup)
        return;

      if (!fieldInfo.IsUsedInForm) // only once
      {
        if (fieldInfo.FieldTypeKind === FieldTypes.LOOKUP
          && !fieldInfo.IsDependentLookup
          && fieldInfo.DependentLookupInternalNames !== null
          && fieldInfo.DependentLookupInternalNames.length > 0) {
          const lookupFieldInfo: string[] = [];
          fieldInfo.DependentLookupInternalNames.forEach((entry, index) => {
            const normalizeFieldName: string[] = entry.split("_x003a_");
            lookupFieldInfo.push(
              normalizeFieldName[normalizeFieldName.length - 1]
            );
          });
          fieldInfo.DependentLookupInternalNames = lookupFieldInfo;
        }
        fieldInfo.IsUsedInForm = true;
        fieldInfo = this.getFieldMetaData(fieldInfo);
        fieldInfo.httpClient = this.props.httpClient;
        fieldInfo.SiteUrl = this.props.siteURL;
        if (fieldInfo.DefaultValue !== null && fieldInfo.DefaultValue.length > 0) {
          fieldInfo.FormValue = fieldInfo.DefaultValue;
        }
        if (fieldInfo.FieldTypeKind === FieldTypes.BOOLEAN) {
          if (fieldInfo.FormValue === "1")
            fieldInfo.FormValue = true;
          else
            fieldInfo.FormValue = false
        }

        if (typeof this.props.RESTLookupDefinition !== "undefined" && this.props.RESTLookupDefinition !== null) {
          fieldInfo.RESTLookup = this.props.RESTLookupDefinition.filter(x => x.SourceColumnInternalName === fieldInfo.StaticName)[0];
        }

        if (typeof this.props.addionalFieldRules !== "undefined" && this.props.addionalFieldRules !== null) {
          fieldInfo.AddionalRule = this.props.addionalFieldRules[fieldInfo.StaticName];
        }
        // new: ceck for specific default value - override in properties
        if (fieldInfo.AddionalRule !== undefined && fieldInfo.AddionalRule.DefaultValue.length > 0) {
          fieldInfo.DefaultValue = fieldInfo.AddionalRule.DefaultValue;
          fieldInfo.FormValue = fieldInfo.DefaultValue;
        }
      }
      return (
        <>{fieldInfo &&
          React.createElement(
            FormControlFluentUI,
            {
              ...fieldInfo,
              IsDisabled: this.state.isProcessing || this.state.isAlreadySent,
              ChangedHandler: (field: ISPListField, value: string | string[] | ChoiceValue | boolean | LinkFieldValue, validationError: string) => {
                const fieldInfo: ISPListField = this.availableFields.value.filter(f => f.StaticName === fieldStaticName)[0];
                fieldInfo.FormValue = value;
                fieldInfo.IsValid = validationError.length === 0;
                this.ValidateCompleteForm();
              },
              key: fieldInfo.StaticName
            }
          )
        }
        </>
      );
    }
    return (<p>ERROR</p>);
  }

  private handleAttachment = (eventData: React.ChangeEvent<HTMLInputElement>): void => {
    const fileInfo: File = eventData.target.files[0];
    if (this.ValidateFileInput(fileInfo)) {
      alert(strings.ErrorInvalidFileType.replace("@FileType", this.props.allowedUploadFileTypes));
      eventData.target.value = "";
    }
    else {
      this.uploadFileList[eventData.target.id] = fileInfo;
    }
  }

  private ValidateFileInput(fileInfo: File): boolean {
    const parts: string[] = fileInfo.name.split(".");
    const extension = parts[parts.length - 1];
    return (this.props.allowedUploadFileTypes.indexOf(extension) === -1);
  }

  private ValidateCompleteForm(): void {
    if (typeof this.props.allowedUploadFileTypes !== "undefined" && this.props.allowedUploadFileTypes.length > 0) {
      let key: keyof { [key: string]: File };
      for (key in this.uploadFileList) {
        if (this.ValidateFileInput(this.uploadFileList[key])) {
          this.setState({ isFormValid: false });
          return;
        }
      }
    }
    this.setState({
      isFormValid: this.availableFields.value.filter(f => f.IsUsedInForm && !f.IsValid).length === 0
    });
  }

  //https://medium.com/@ian.mundy/async-event-handlers-in-react-a1590ed24399
  private getFileBuffer(file: File): Promise<ArrayBuffer | string> {
    const reader = new FileReader();
    return new Promise(
      (resolve, reject) => {
        reader.onload = function (e) {
          resolve(e.target.result);
        };
        reader.onerror = function (e) {
          reject(e.target.error);
        }
        reader.readAsArrayBuffer(file);
      }
    );
  }

  public saveFormData = (): void => {
    this.setState({ isProcessing: true });
    type DynamicFormatData = { [key: string]: any }
    const fieldToSave: DynamicFormatData = {};
    this.availableFields.value.filter(f => f.IsUsedInForm && typeof f.FormValue !== "undefined" && f.FormValue !== "").forEach((formEntry, index) => {

      if (formEntry.FieldTypeKind === FieldTypes.LOOKUP) {
        fieldToSave[formEntry.InternalName + "Id"] = (formEntry.FormValue as ChoiceValue).Value;
      }
      else
        fieldToSave[formEntry.InternalName] = formEntry.FormValue;

      if (formEntry.RESTLookup !== undefined && formEntry.RESTLookup !== null) {
        const lookupValue: RestLookupFieldValue = formEntry.FormValue as RestLookupFieldValue;
        fieldToSave[formEntry.InternalName] = lookupValue.Display;
        // check if addional value field exists
        if (formEntry.RESTLookup.TargetValueListField.length > 0) {
          const lookupValueField = this.availableFields.value.filter(f => f.InternalName === formEntry.RESTLookup.TargetValueListField)[0];
          if (lookupValueField !== undefined && lookupValueField !== null) {
            fieldToSave[formEntry.RESTLookup.TargetValueListField] = lookupValue.Value;
          }
        }
      }

      // override specific
      /*if (formEntry.FieldTypeKind === FieldTypes.BOOLEAN) {
        fieldToSave[formEntry.InternalName]=formEntry.FormValue;
      }
      if (formEntry.FieldTypeKind === FieldTypes.CHOICE) {
        fieldToSave[formEntry.InternalName]=formEntry.FormValue;
      }
      if (formEntry.FieldTypeKind === FieldTypes.MULTICHOICE) {
        fieldToSave[formEntry.InternalName]=formEntry.FormValue;
      }*/
      if (formEntry.FieldTypeKind === FieldTypes.NUMBER) {
        if (formEntry.Decimals === 0)
          fieldToSave[formEntry.InternalName] = parseInt(formEntry.FormValue.toString(), 10);
        else
          fieldToSave[formEntry.InternalName] = parseFloat(formEntry.FormValue.toString());
      }
      if (formEntry.FieldTypeKind === FieldTypes.URLORIMAGE) {
        fieldToSave[formEntry.InternalName] = formEntry.FormValue;
      }
      if (formEntry.FieldTypeKind === FieldTypes.DATETIME) {
        try {
          fieldToSave[formEntry.InternalName] = (formEntry.FormValue as Date).toISOString();
        } catch (error) {
          console.error(error);
        }
      }
    });
    // Datetime: http://blog.plataformatec.com.br/2014/11/how-to-serialize-date-and-datetime-without-losing-information/
    // https://learn.microsoft.com/en-us/previous-versions/office/sharepoint-visio/jj246742(v=office.15)
    // Content-Type: https://sharepoint.stackexchange.com/questions/187963/rest-add-list-item-of-custom-content-type
    if (this.props.contentTypeID && this.props.contentTypeID.length > 0 && this.props.contentTypeID !== "0") {
      fieldToSave["ContentTypeId"] = this.props.contentTypeID;
    }
    this.props.httpClient.post(`${this.props.siteURL}/_api/web/lists/getbyid('${this.props.listID}')/items`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'Content-type': 'application/json;odata=nometadata',
          'odata-version': ''
        },
        body: JSON.stringify(fieldToSave)
      })
      .then((x: SPHttpClientResponse) => {
        const test = x.json();
        return test;
      })
      .then(async (item: ISPListItem): Promise<void> => {
        this.sendConfirmationMail(item);
        this.setState({ isProcessing: false, isAlreadySent: true, isFormValid: false });
        await this.uploadAttachments(item);
        alert(typeof this.props.successMessage !== "undefined" ? this.props.successMessage : strings.MSGConfirmationSubmitData);
      });
  }

  public async sendConfirmationMail(item: ISPListItem): Promise<void> {
    if (this.props.sendConfirmationEMail) {
      const listFormInfo = await this.props.httpClient.get(`${this.props.siteURL}/_api/web/lists/getbyid('${this.props.listID}')/Forms?$select=ServerRelativeUrl`, SPHttpClient.configurations.v1);
      const resultInfo: ISPFormLists = await listFormInfo.json();
      const displayFormInfo = resultInfo.value.filter(x => x.ServerRelativeUrl.indexOf('DispForm') !== -1);
      let editLink = "";
      if (this.props.addDataLinkInEMail && displayFormInfo.length > 0) {
        editLink = `<br /><br /><a href="${window.location.origin}/${displayFormInfo[0].ServerRelativeUrl}?ID=${item.Id}">${strings.MAILLinkTodata}</a><br />`;
      }
      const body: string = `<p><strong>${this.props.emailLeadText}</strong></p><table>` + this.availableFields.value.filter(f => f.IsUsedInForm && typeof f.FormValue !== "undefined").map(entry => {
        return `<tr><td>${entry.Title}</td><td><strong>${Helper.GetFieldValueAsString(entry)}</strong></td></tr>`;
      }).join("") + "</table>" + editLink;
      Helper.sendEMail(this.props.currentUserEMail, this.props.emailNotifyBCC, this.props.emailSubject, body, this.props.siteURL, this.props.wpContext);
    }
  }

  public printFormData = (): void => {
    const body: string = `<p><strong>${strings.HEADPrintForm}</strong></p><table>` + this.availableFields.value.filter(f => f.IsUsedInForm && typeof f.FormValue !== "undefined").map(entry => {
      return `<tr><td>${entry.Title}</td><td><strong>${Helper.GetFieldValueAsString(entry)}</strong></td></tr>`;
    }).join("") + "</table>";

    const wndPrint = window.open("about:blank", "_blank");
    wndPrint.document.write(body);
    wndPrint.document.close();
    wndPrint.focus();
    wndPrint.print();
  }

  public resetForm = (): void => {
    /*if (this.state.isProcessing)
      this.setState({
        "isProcessing": false
      });
    else
      this.setState({
        "isProcessing": true
      });*/
    this.currentListID = null;
    this.setState({ formFields: [], isProcessing: false, isFormValid: false, isAlreadySent: false });
  }

  private async uploadAttachments(item: ISPListItem): Promise<void> {
    for (const key in this.uploadFileList) {
      const fileObject: File = this.uploadFileList[key];
      const rawFileContent = await this.getFileBuffer(fileObject);
      await this.props.httpClient.post(`${this.props.siteURL}/_api/web/lists/getbyid('${this.props.listID}')/items(${item.Id})/AttachmentFiles/add(FileName='${fileObject.name}')`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: rawFileContent
        });
    }
  }

  public componentDidMount(): void {
    this.attachmentCtl = [];
    for (let i = 0; i < this.props.uploads; i++) {
      this.attachmentCtl.push(
        <div>
          <label htmlFor={`FormAttachment${i}`}>{`${i + 1}. ${strings.AttachmentIndexLabel}`}</label>
          <input type="file" onChange={this.handleAttachment} id={`FormAttachment${i}`} name={`FormAttachment${i}`} title={strings.AttachmentLabel} />
        </div>
      );
    }
  }

  private _onConfigure = (): void => {
    this.props.wpContext.propertyPane.open();
  }

  public render(): React.ReactElement<IDynamicFormularGeneratorProps> {
    if (!this.validateConfiguration()) {
      return (
        <div className={`${styles.row} ${styles.configWrapper}`}>
          <div className={styles.colSM4}>
            <img src={require('../../../assets/superherobuilder@200.png')} alt="Super hero form builder" />
          </div>
          <div className={`${styles.colSM8} ${styles.cfgDetails}`}>
            <FlashSettings24Regular />
            <h2>{strings.CFGHeader}</h2>
            <ul>
              <li>{strings.CFGChooseList}</li>
              <li>{strings.CFGChooseView}</li>
              <li>{strings.ErrorMissingSiteText}</li>
            </ul>
            <Button onClick={this._onConfigure}>{strings.CFGBTNConfigure}</Button>
          </div>
        </div>
      );
    }
    else {
      const currentDate = new Date();

      let rawFrom: Date = null;
      let rawTo: Date = null;

      if (this.props.validFrom !== undefined) rawFrom = this.props.validFrom.value instanceof Date ? this.props.validFrom.value : new Date(this.props.validFrom.value as any);
      if (this.props.validTo !== undefined) rawTo = this.props.validTo.value instanceof Date ? this.props.validTo.value : new Date(this.props.validTo.value as any);

      if (rawFrom !== null && rawFrom >= currentDate) {
        let msgNotPublished = this.props.msgFormNotPublished;
        if (msgNotPublished !== undefined && msgNotPublished === null && msgNotPublished.length > 0) {
          msgNotPublished = msgNotPublished.replace("@Date", rawFrom.toLocaleDateString()).replace("@Time", rawFrom.toLocaleTimeString());
        }
        return (<div>
          {msgNotPublished && <h1>{msgNotPublished}</h1>}
          <img src={require('../../../assets/form-closed@800x600.png')} alt={msgNotPublished} />
        </div>);
      }
      if (rawTo !== null && rawTo < currentDate) {
        let msgNotPublished = this.props.msgFormExpired
        if (msgNotPublished !== undefined && msgNotPublished === null && msgNotPublished.length > 0) {
          msgNotPublished = msgNotPublished.replace("@Date", rawTo.toLocaleDateString()).replace("@Time", rawTo.toLocaleTimeString());
        }
        return (<div>
          {msgNotPublished && <h1>{msgNotPublished}</h1>}
          <img src={require('../../../assets/form-closed@800x600.png')} alt={msgNotPublished} />
        </div>);
      }

      this.qryFormFields();
      //ref={(el) => this.mainForm = el}
      return (
        <form className={`${styles.dynamicFormularGenerator}`}>
          {this.state.isAlreadySent && <h3>{strings.MSGDataSendAlready}</h3>}
          {this.props.description.length > 0 && <p>{this.props.description}</p>}
          {this.state && this.state.formFields && this.state.formFields.map((val) => {
            return this.formComponentFactory(val);
          })}
          <div className={styles.uploadArea}>
            {this.props.uploads > 0 && this.attachmentCtl && this.attachmentCtl.map((fileCtl) => {
              return fileCtl;
            })
            }
          </div>
          <div className={styles.cmdWrapper}>
            {this.state.isProcessing ? <Spinner size="extra-small" label={strings.MSGWaiting} /> : <></>}
            <Button id="btnSaveFormData" name="btnSaveFormData"
              className={styles.btnSave}
              disabled={!this.state.isFormValid || this.state.isProcessing}
              onClick={this.saveFormData}>{strings.BTNSendFormData}</Button>
            {this.props.enablePrint && <Button id="btnPrintData"
              name="btnPrintData"
              className={styles.btnPrint}
              disabled={!this.state.isAlreadySent}
              onClick={this.printFormData}>{strings.BTNPrintFormData}</Button>}
            <Button id="btnFormReset" name="btnFormReset" type="reset" onClick={this.resetForm}>{strings.BTNResetFormData}</Button>
          </div>
        </form>
      );
    }
  }
}
