import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IFieldConfiguration } from './IFieldConfiguration';
import { IListFormProps } from './IListFormProps';
import { IListFormState } from './IListFormState';
import { ControlMode } from '../../../common/datatypes/ControlMode';

import { IListFormService } from '../../../common/services/IListFormService';
import { ListFormService } from '../../../common/services/ListFormService';
import { ISPPeopleSearchService } from '../../../common/services/ISPPeopleSearchService';
import { SPPeopleSearchService } from '../../../common/services/SPPeopleSearchService';
import { GroupService } from '../../../common/services/GroupService';
import { SPHelper } from '../../../common/SPHelper';

import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { css } from 'office-ui-fabric-react/lib/Utilities';

import SPFormField from './formFields/SPFormField';

import DraggableComponent from './DraggableComponent';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as strings from 'ListFormStrings';

import styles from './ListForm.module.scss';
import { Validate } from '@microsoft/sp-core-library';
import { Icon } from 'office-ui-fabric-react';

/*************************************************************************************
 * React Component to render a SharePoint list form on any page.
 * The list form can be configured to be either a new form for adding a new list item,
 * an edit form for changing an existing list item or a display form for showing the
 * fields of an existing list item.
 * In design mode the fields to render can be moved, added and deleted.
 *************************************************************************************/
class ListForm extends React.Component<IListFormProps, IListFormState> {

  private listFormService: IListFormService;
  private spPeopleService: ISPPeopleSearchService;
  private groupService: GroupService;

  constructor(props: IListFormProps) {
    super(props);

    // set initial state
    this.state = {
      isLoadingSchema: false,
      isLoadingData: false,
      isSaving: false,
      data: {},
      originalData: {},
      errors: [],
      notifications: [],
      fieldErrors: {},
      hasError: false,
      errorInfo: ''
    };
    this.listFormService = new ListFormService(props.spHttpClient);
    this.spPeopleService = new SPPeopleSearchService();
    this.groupService = new GroupService(props.spHttpClient);
  }

  public render() {
    let menuProps;
    if (this.state.hasError) {
      // render any custom fallback UI
      return <h1>{this.state.errorInfo}</h1>;
    }
    if (this.state.fieldsSchema) {
      menuProps = {
        shouldFocusOnMount: true,
        directionalHint: DirectionalHint.topCenter,
        items: this.state.fieldsSchema.map(
          (fld) => ({ key: fld.InternalName, name: fld.Title, onClick: (ev, item) => this.appendField(fld.InternalName) })
        )
      };
    }
    return (
      <div className={styles.listForm}>
        <div className={css(styles.title, 'ms-font-xl')}>{this.props.title}</div>
        {(this.props.description) && <div className={styles.description}>{this.props.description}</div>}
        {this.renderNotifications()}
        {this.renderErrors()}
        {(!this.props.listUrl)
          ? <MessageBar messageBarType={MessageBarType.warning}>Please configure a list for this component first.</MessageBar>
          : ''}
        {(this.state.isLoadingSchema)
          ? (<Spinner size={SpinnerSize.large} label={strings.LoadingFormIndicator} />)
          : ((this.state.fieldsSchema) &&
            <div>
              <div className={css(styles.formFieldsContainer, this.state.isLoadingData ? styles.isDataLoading : null)}>
                {this.renderFields()}
                {this.props.inDesignMode &&
                  <DefaultButton aria-haspopup='true' aria-label={strings.AddNewFieldAction} className={styles.addFieldToolbox}
                    title={strings.AddNewFieldAction} menuProps={menuProps} data-is-focusable='false' >
                    <div className={styles.addFieldToolboxPlusButton}>
                      <Icon iconName='CircleAdditionSolid' />
                    </div>
                  </DefaultButton>
                }
              </div>
              <div className={styles.formButtonsContainer}>
                {(this.props.formType !== ControlMode.Display) &&
                  <PrimaryButton
                    disabled={false}
                    text={strings.SaveButtonText}
                    onClick={() => this.saveItem()}
                  />
                }
                <DefaultButton
                  disabled={false}
                  text={strings.CancelButtonText}
                  onClick={() => this.readData(this.props.listUrl, this.props.formType, this.props.id)}
                />
              </div>
            </div>
          )
        }
      </div>
    );
  }

  public componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      errorInfo: error.toString()
    });
  }
  private renderNotifications() {
    if (this.state.notifications.length === 0) {
      return null;
    }
    setTimeout(() => { this.setState({ ...this.state, notifications: [] }); }, 4000);
    return <div>
      {
        this.state.notifications.map((item, idx) =>
          <MessageBar messageBarType={MessageBarType.success}>{item}</MessageBar>
        )
      }
    </div>;
  }

  private renderErrors() {
    return this.state.errors.length > 0
      ?
      <div>
        {
          this.state.errors.map((item, idx) =>
            <MessageBar
              messageBarType={MessageBarType.error}
              isMultiline={true}
              onDismiss={(ev) => this.clearError(idx)}
            >
              {item}
            </MessageBar>
          )
        }
      </div>
      : null;
  }

  private renderFields() {
    const { fieldsSchema, data, fieldErrors } = this.state;
    const fields = this.getFields();

    return (fields && (fields.length > 0))
      ?
      <div className='ard-formFieldsContainer' >
        {
          fields.map((field, idx) => {
            const fieldSchemas = fieldsSchema.filter((f) => f.InternalName === field.fieldName);
            if (fieldSchemas.length > 0) {
              const fieldSchema = fieldSchemas[0];
              const value = data[field.fieldName];
              let extraData;
              if (data.hasOwnProperty(field.fieldName + '.')) {
                extraData = data[field.fieldName + '.'];
              } else {
                extraData = Object.keys(data)
                  .filter((propName) => propName.indexOf(field.fieldName + '.') === 0)
                  .reduce((newData, pn) => { newData[pn.substring(field.fieldName.length + 1)] = data[pn]; return newData; }, {});
              }
              const errorMessage = fieldErrors[field.fieldName];
              const fieldComponent = SPFormField({
                fieldSchema: fieldSchema,
                controlMode: this.props.formType,
                value: value,
                extraData: extraData,
                errorMessage: errorMessage,
                hideIfFieldUnsupported: !this.props.showUnsupportedFields,
                valueChanged: (val) => this.valueChanged(field.fieldName, val),
                context: this.props.context,
              });
              if (fieldComponent && this.props.inDesignMode) {
                return (
                  <DraggableComponent
                    key={field.key}
                    index={idx}
                    itemKey={field.key}
                    moveField={(dragIdx, hoverIdx) => this.moveField(dragIdx, hoverIdx)}
                    removeField={(index) => this.removeField(index)} >
                    {fieldComponent}
                  </DraggableComponent>);
              } else {
                return fieldComponent;
              }
            }
          })
        }
      </div>
      : <MessageBar messageBarType={MessageBarType.warning}>No fields available!</MessageBar>;
  }


  public componentDidMount(): void {
    this.readSchema(this.props.listUrl, this.props.formType).then(
      () => this.readData(this.props.listUrl, this.props.formType, this.props.id)
    );
  }


  public componentWillReceiveProps(nextProps: IListFormProps): void {
    if ((this.props.listUrl !== nextProps.listUrl) || (this.props.formType !== nextProps.formType)) {
      this.readSchema(nextProps.listUrl, nextProps.formType).then(
        () => this.readData(nextProps.listUrl, nextProps.formType, nextProps.id)
      );
    } else if ((this.props.id !== nextProps.id) || (this.props.formType !== nextProps.formType)) {
      this.readData(nextProps.listUrl, nextProps.formType, nextProps.id);
    }
  }

  @autobind
  private async readSchema(listUrl: string, formType: ControlMode): Promise<void> {
    try {
      if (!listUrl) {
        this.setState({ ...this.state, isLoadingSchema: false, fieldsSchema: null, errors: [strings.ConfigureListMessage] });
        return;
      }
      this.setState({ ...this.state, isLoadingSchema: true });
      const fieldsSchema = await this.listFormService.getFieldSchemasForForm(
        this.props.webUrl,
        listUrl,
        formType,
      );
      let lookupCount = 0;
      for (let i = 0; i < fieldsSchema.length; i++) {
        if (fieldsSchema[i].FieldType === "Lookup" || fieldsSchema[i].FieldType === "LookupMulti") {
          fieldsSchema[i].Choices = await this.listFormService.getLookupfieldOptions(fieldsSchema[i], this.props.webUrl);
          lookupCount += 1;
          if (lookupCount > 1) {
            let lookups = await this.listFormService.getLookupfieldsOnList(fieldsSchema[i]["LookupListUrl"], this.props.webUrl, formType);
            for (let j = 0; j < lookups.length; j++) {
              let parent = fieldsSchema.filter((x) => {
                return x.LookupListId === lookups[j].LookupListId;
              });

              for (let k = 0; k < parent.length; k++) {
                if (parent[k]["Dependent"] == null) {
                  parent[k]["Dependent"] = { Field: fieldsSchema[i], ValueField: lookups[j].InternalName };
                  break;
                }
              }
            }
          }
        }
      }

      let userfields = fieldsSchema.filter((x) => {
        return x.FieldType === "User" || x.FieldType === "UserMulti";
      });

      for (let i = 0; i < userfields.length; i++) {
        if (userfields[i].SharePointGroupID > 0) {
          //Get the groupname from sharepoint for the group id
          let group = await this.groupService.getGroupFromWeb(this.props.webUrl, userfields[i].SharePointGroupID);
          userfields[i]['SharePointGroupName'] = group.Title;
        }
      }

      this.setState({ ...this.state, isLoadingSchema: false, fieldsSchema });
    } catch (error) {
      const errorText = `${strings.ErrorLoadingSchema}${listUrl}: ${error}`;
      this.setState({
        ...this.state,
        isLoadingSchema: false,
        fieldsSchema: null,
        errors: [...this.state.errors, errorText],
      });
    }
  }

  @autobind
  private async readData(listUrl: string, formType: ControlMode, id?: number): Promise<void> {
    try {
      if ((formType === ControlMode.New) || !id) {
        const data = this.state.fieldsSchema
          .reduce((newData, fld) => {
            if (fld.DefaultValue && fld.FieldType.indexOf("TaxonomyField") > -1) {
              newData[fld.InternalName] = fld.DefaultValue.replace(new RegExp("([#][0-9]+;#|^[0-9]+;#)", "g"), "")
            } else {
              newData[fld.InternalName] = fld.DefaultValue;
            }
            return newData;
          },
            {});
        this.setState({ ...this.state, data: data, originalData: { ...data }, fieldErrors: {}, isLoadingData: false });
        return;
      }
      this.setState({ ...this.state, data: {}, originalData: {}, fieldErrors: {}, isLoadingData: true });
      let dataObj = await this.listFormService.getDataForForm(this.props.webUrl, listUrl, id, formType);
      const schema = this.state.fieldsSchema;
      dataObj = await this.listFormService.getExtraFieldData(dataObj, schema, this.props.context, this.props.webUrl);
      for (let i = 0; i < schema.length; i++) {
        if (schema[i]["Dependent"] != null) {
          let updateField = schema[i]["Dependent"].Field.InternalName;
          let fieldsSchema = schema;
          let dependee = fieldsSchema.filter((x) => {
            return x.InternalName === updateField;
          });
          dependee[0]["DependerValue"] = { Value: dataObj[schema[i].InternalName], Field: schema[i]["Dependent"].ValueField };
        }
      }
      // We shallow clone here, so that changing values on dataObj object fields won't be changing in originalData too
      const dataObjOriginal = { ...dataObj };
      this.setState({ ...this.state, data: dataObj, fieldsSchema: schema, originalData: dataObjOriginal, isLoadingData: false });
    } catch (error) {
      const errorText = `${strings.ErrorLoadingData}${id}: ${error}`;
      this.setState({ ...this.state, data: {}, isLoadingData: false, errors: [...this.state.errors, errorText] });
    }
  }

  @autobind
  private async valueChanged(fieldName: string, newValue: any) {
    let schema = this.state.fieldsSchema.filter((item) => item.InternalName === fieldName)[0];
    if (schema.Type == "User" || schema.Type === "UserMulti") {
      for (let i = 0; i < newValue.length; i++) {
        // Security Group and Office 365 group need special handling
        if (newValue[i].Key.indexOf("c:0") === 0) {
          let newVal = await this.spPeopleService.resolvePeople(this.props.context, newValue[i].Key, this.props.webUrl);

          if (newVal.EntityData != null && newVal.EntityData.Email != null) {
            newValue[i].Key = newVal.EntityData.Email;
          }
          else {
            newValue[i].Key = newVal.Description;
          }
        }
      }

      this.setState((prevState, props) => {
        return {
          ...prevState,
          data: { ...prevState.data, [fieldName]: newValue },
          fieldErrors: {
            ...prevState.fieldErrors,
            [fieldName]:
              (prevState.fieldsSchema.filter((item) => item.InternalName === fieldName)[0].Required) && !newValue
                ? strings.RequiredValueMessage
                : ''
          }
        };
      },
      );
    }
    else {
      // Check for if any other fields are dependent on this one
      if (schema["Dependent"] != null) {
        let dependee = [];
        let fieldsSchema = this.state.fieldsSchema;
        let updateField = schema["Dependent"].Field.InternalName;
        let valueField = schema["Dependent"].ValueField;
        let dependentValue = newValue;
        do {
          dependee = fieldsSchema.filter((x) => {
            return x.InternalName === updateField;
          });
          dependee[0]["DependerValue"] = { Value: dependentValue, Field: valueField };
          if (dependee.length > 0 && dependee[0]["Dependent"] != null) {
            //Need to remove invalid options from dependent value
            let tempVal = SPHelper.LookupValueFromString(this.state.data[dependee[0].InternalName]);
            let depend = SPHelper.LookupValueFromString(dependentValue);
            let choices = dependee[0].Choices;

            let values = depend.map((item) => item.key);
            choices = choices.filter((x) => {
              let matches = values.filter((itm) => { return x.x[`${valueField}Id`] == itm; });
              return matches.length > 0;
            });

            tempVal = tempVal.filter((x) => {
              return choices.find((y) => { return y.LookupId == x.key; }) != null;
            });

            dependentValue = SPHelper.LookupValueToString(tempVal);
            updateField = dependee[0]["Dependent"].Field.InternalName;
            valueField = dependee[0]["Dependent"].ValueField;
          }
          else {
            updateField = null;
          }
        } while (updateField != null);

        this.setState((prevState, props) => {
          return {
            ...prevState,
            data: { ...prevState.data, [fieldName]: newValue },
            fieldsSchema,
            fieldErrors: {
              ...prevState.fieldErrors,
              [fieldName]:
                (prevState.fieldsSchema.filter((item) => item.InternalName === fieldName)[0].Required) && !newValue
                  ? strings.RequiredValueMessage
                  : ''
            }
          };
        },
        );
      }
      else {
        this.setState((prevState, props) => {
          return {
            ...prevState,
            data: { ...prevState.data, [fieldName]: newValue },
            fieldErrors: {
              ...prevState.fieldErrors,
              [fieldName]:
                (prevState.fieldsSchema.filter((item) => item.InternalName === fieldName)[0].Required) && !newValue
                  ? strings.RequiredValueMessage
                  : ''
            }
          };
        },
        );
      }
    }
  }

  private validator = () => {
    let fieldErrors = this.state.fieldErrors;
    this.state.fieldsSchema.forEach(currentFieldSchema => {
      if (currentFieldSchema.Required && !this.state.data[currentFieldSchema.InternalName]) {
        fieldErrors = {
          ...fieldErrors,
          [currentFieldSchema.InternalName]: strings.RequiredValueMessage
        };
      }
    });
    this.setState({
      fieldErrors: fieldErrors
    });
    for (let key in fieldErrors) {
      if (fieldErrors[key]) {
        return false;
      }
    }
    return true;
  }

  private async saveItem(): Promise<void> {
    let shouldSave = this.validator();
    if (shouldSave) {
      this.setState({ ...this.state, isSaving: true, errors: [] });
      try {
        let updatedValues;
        if (this.props.id) {
          updatedValues = await this.listFormService.updateItem(
            this.props.webUrl,
            this.props.listUrl,
            this.props.id,
            this.state.fieldsSchema,
            this.state.data,
            this.state.originalData);
        } else {
          updatedValues = await this.listFormService.createItem(
            this.props.webUrl,
            this.props.listUrl,
            this.state.fieldsSchema,
            this.state.data);
        }
        let dataReloadNeeded = false;
        const newState: IListFormState = { ...this.state, fieldErrors: {} };
        let hadErrors = false;
        updatedValues.filter((fieldVal) => fieldVal.HasException).forEach((element) => {
          newState.fieldErrors[element.FieldName] = element.ErrorMessage;
          hadErrors = true;
        });
        if (hadErrors) {
          if (this.props.onSubmitFailed) {
            this.props.onSubmitFailed(newState.fieldErrors);
          } else {
            newState.errors = [...newState.errors, strings.FieldsErrorOnSaving];
          }
        } else {
          updatedValues.reduce(
            (val, merged) => {
              merged[val.FieldName] = merged[val.FieldValue]; return merged;
            },
            newState.data,
          );
          // we shallow clone here, so that changing values on state.data won't be changing in state.originalData too
          newState.originalData = { ...newState.data };
          let id = (this.props.id) ? this.props.id : 0;
          if (id === 0) {
            id = updatedValues.filter((val) => val.FieldName === 'Id')[0].FieldValue;
          }
          if (this.props.onSubmitSucceeded) { this.props.onSubmitSucceeded(id); }
          newState.notifications = [...newState.notifications, strings.ItemSavedSuccessfully];
          dataReloadNeeded = true;
        }
        newState.isSaving = false;
        this.setState(newState);

        if (dataReloadNeeded) { this.readData(this.props.listUrl, this.props.formType, this.props.id); }
      } catch (error) {
        const errorText = strings.ErrorOnSavingListItem + error;
        this.setState({ ...this.state, errors: [...this.state.errors, errorText] });
      }
    }
  }

  private clearError(idx: number) {
    this.setState((prevState, props) => {
      return { ...prevState, errors: prevState.errors.splice(idx, 1) };
    });
  }

  private getFields(): IFieldConfiguration[] {
    let fields = this.props.fields;
    if ((!fields) && this.state.fieldsSchema) {
      fields = this.state.fieldsSchema.map((field) => ({ key: field.InternalName, fieldName: field.InternalName }));
    }
    return fields;
  }

  private appendField(fieldName: string) {
    const newFields = this.getFields();
    let fieldKey = fieldName;
    let indexer = 0;
    while (newFields.some((fld) => fld.key === fieldKey)) {
      indexer++;
      fieldKey = fieldName + '_' + indexer;
    }
    newFields.push({ key: fieldKey, fieldName: fieldName });
    this.props.onUpdateFields(newFields);
  }

  private moveField(fieldKey, toIndex) {
    const fields = this.getFields();
    const dragField = fields.filter((fld) => fld.key === fieldKey)[0];
    const dragIndex = fields.indexOf(dragField);
    const newFields = fields.splice(0); // clone
    newFields.splice(dragIndex, 1);
    newFields.splice(toIndex, 0, dragField);
    this.props.onUpdateFields(newFields);
  }

  private removeField(index: number) {
    const newFields = this.getFields().splice(0); // clone
    newFields.splice(index, 1);
    this.props.onUpdateFields(newFields);
  }

}

export default DragDropContext(HTML5Backend)(ListForm);
