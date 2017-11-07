import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import styles from './ListForm.module.scss';
import { IFieldConfiguration } from './IFieldConfiguration';
import { IListFormProps } from './IListFormProps';
import { IListFormState } from './IListFormState';
import { ControlMode } from '../../../common/datatypes/ControlMode';

import { IListFormService } from '../../../common/services/IListFormService';
import { ListFormService } from '../../../common/services/ListFormService';

import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/ContextualMenu';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { css } from 'office-ui-fabric-react/lib/Utilities';

import SPFormField from './formFields/SPFormField';

import DraggableComponent from './DraggableComponent';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


class ListForm extends React.Component<IListFormProps, IListFormState> {


  private listFormService: IListFormService;


  constructor( props: IListFormProps ) {
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
      fieldErrors: {}
    };

    this.listFormService = new ListFormService(props.spContext.spHttpClient);
  }


  public render() {
    let menuProps;
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
        { (this.props.description) && <div className={styles.description}>{this.props.description}</div> }
        { this.renderNotifications() }
        { this.renderErrors() }
        { (!this.props.listUrl) ? <MessageBar messageBarType={MessageBarType.warning}>Please configure a list for this component first.</MessageBar> : '' }
        { (this.state.isLoadingSchema)
          ? (<Spinner size={ SpinnerSize.large } label='Loading the form...' />)
          : ((this.state.fieldsSchema) &&
                <div>
                  <div className={css(styles.formFieldsContainer, this.state.isLoadingData ? styles.isDataLoading : null)}>
                    {this.renderFields()}
                    {this.props.inDesignMode &&
                    <DefaultButton aria-haspopup='true' aria-label='Add a new field to form' className={styles.addFieldToolbox}
                          title='Add a new field to form' menuProps={menuProps} data-is-focusable='false' >
                      <div className={styles.addFieldToolboxPlusButton}>
                        <i aria-hidden='true' className='ms-Icon ms-Icon--CircleAdditionSolid' />
                      </div>
                    </DefaultButton>}
                  </div>
                  <div className={styles.formButtonsContainer}>
                    <PrimaryButton
                        disabled={ false }
                        text='Save'
                        onClick={ () => this.saveItem() }
                      />
                    <DefaultButton
                        disabled={ false }
                        text='Cancel'
                        onClick={ () => this.readData(this.props.listUrl, this.props.formType, this.props.id) }
                      />
                  </div>
              </div>
            )
          }
      </div>
    );
  }

  private renderNotifications() {
    if (this.state.notifications.length === 0) {
      return null;
    }
    setTimeout( () => { this.setState({...this.state, notifications: []}); }, 4000 );
    return <div>
      {
        this.state.notifications.map( (item, idx) =>
          <MessageBar messageBarType={ MessageBarType.success }>{item}</MessageBar>
        )
      }
    </div>;
  }


  private renderErrors() {
   return this.state.errors.length > 0
     ?
     <div>
       {
         this.state.errors.map( (item, idx) =>
          <MessageBar
            messageBarType={ MessageBarType.error }
            isMultiline={ true }
            onDismiss={ (ev) => this.clearError(idx) }
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
                  const errorMessage = fieldErrors[field.fieldName];
                  const fieldComponent = <SPFormField
                            fieldSchema={fieldSchema}
                            controlMode={this.props.formType}
                            value={value}
                            valueChanged={(val) => this.valueChanged(field.fieldName, val)}
                            errorMessage={errorMessage} />;
                  if (this.props.inDesignMode) {
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
    : <div style={{ color: 'red' }} >No fields available!</div>;
  }


  public componentDidMount(): void {
    this.readSchema(this.props.listUrl, this.props.formType);
    this.readData(this.props.listUrl, this.props.formType, this.props.id);
  }


  public componentWillReceiveProps(nextProps: IListFormProps): void {
    if ((this.props.listUrl !== nextProps.listUrl) || (this.props.formType !== nextProps.formType)) {
      this.readSchema(nextProps.listUrl, nextProps.formType);
    }
    if ((this.props.id !== nextProps.id) || (this.props.formType !== nextProps.formType)) {
      this.readData(nextProps.listUrl, nextProps.formType, nextProps.id);
    }
  }


  @autobind
  private async readSchema(listUrl: string, formType: ControlMode): Promise<void> {
   try {
     if (!listUrl) {
       this.setState( (nextState, props) => {
         nextState.isLoadingSchema = false;
         nextState.fieldsSchema = null;
         nextState.errors = ['Please configure a list in the web part\'s editor first.'];
         Promise.resolve();
         return nextState;
       });
       return;
     }
     this.setState({ ...this.state, isLoadingSchema: true });
     const fieldsSchema = await this.listFormService.getFieldSchemasForForm(
                                                       this.props.spContext.pageContext.web.absoluteUrl,
                                                       listUrl,
                                                       formType,
                                                     );
     this.setState({ ...this.state, isLoadingSchema: false, fieldsSchema });
   } catch (error) {
     const errorText = `Error loading schema for list ${listUrl}: ${error}`;
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
        this.setState({ ...this.state, data: {}, originalData: {}, isLoadingData: false});
        return;
      }
      this.setState({ ...this.state, data: {}, originalData: {}, isLoadingData: true});
      const dataObj = await this.listFormService.getDataForForm( this.props.spContext.pageContext.web.absoluteUrl, listUrl, id, formType );
      // We shallow clone here, so that changing values on dataObj object fields won't be changing in originalData too
      const dataObjOriginal = { ...dataObj };
      this.setState({...this.state, data: dataObj, originalData: dataObjOriginal, isLoadingData: false});
    } catch (error) {
      const errorText = `Error loading data for item with ID ${id}: ${error}`;
      this.setState({ ...this.state, data: {}, isLoadingData: false, errors: [...this.state.errors, errorText] });
    }
  }


  @autobind
  private valueChanged(fieldName: string, newValue: any) {
    this.setState((prevState, props) => {
        prevState.data[fieldName] = newValue;
        // validation
        prevState.fieldErrors[fieldName] = '';
        if (this.state.fieldsSchema.filter((item) => item.InternalName === fieldName)[0].Required) {
          if (!newValue) { prevState.fieldErrors[fieldName] = 'Please enter a value!'; }
        }
        return prevState;

      },
    );
  }


  private async saveItem(): Promise<void> {
    this.setState({ ...this.state, isSaving: true, errors: []});
    try {
      let updatedValues;
      if (this.props.id) {
        updatedValues = await this.listFormService.updateItem(
          this.props.spContext.pageContext.web.absoluteUrl,
          this.props.listUrl,
          this.props.id,
          this.state.fieldsSchema,
          this.state.data,
          this.state.originalData);
      } else {
        updatedValues = await this.listFormService.createItem(
          this.props.spContext.pageContext.web.absoluteUrl,
          this.props.listUrl,
          this.state.fieldsSchema,
          this.state.data);
      }
      let dataReloadNeeded = false;
      const newState: IListFormState = {...this.state, fieldErrors: {}};
      let hadErrors = false;
      updatedValues.filter( (fieldVal) => fieldVal.HasException ).forEach( (element) => {
        newState.fieldErrors[element.FieldName] = element.ErrorMessage;
        hadErrors = true;
      });
      if (hadErrors) {
        if (this.props.onSubmitFailed) {
          this.props.onSubmitFailed(newState.fieldErrors);
        } else {
          newState.errors = [...newState.errors, 'The item could not be saved. Please check detailed error messages on the fields below.'];
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
          id = updatedValues.filter( (val) => val.FieldName === 'Id' )[0].FieldValue;
        }
        if (this.props.onSubmitSucceeded) { this.props.onSubmitSucceeded( id ); }
        newState.notifications = [...newState.notifications, 'Item saved successfully.'];
        dataReloadNeeded = true;
      }
      newState.isSaving = false;
      this.setState(newState);

      if (dataReloadNeeded) { this.readData(this.props.listUrl, this.props.formType, this.props.id); }
    } catch (error) {
      const errorText = `Error trying to save list item: ${error}`;
      this.setState({ ...this.state, errors: [...this.state.errors, errorText] });
    }
  }


  private clearError(idx: number) {
    this.setState( (prevState, props) => {
      prevState.errors.splice( idx, 1 );
      return prevState;
    } );
  }


  private getFields(): IFieldConfiguration[] {
    let fields = this.props.fields;
    if ((!fields) && this.state.fieldsSchema) {
      fields = this.state.fieldsSchema.map( (field) => ({key: field.InternalName, fieldName: field.InternalName}) );
    }
    return fields;
  }


  private appendField(fieldName: string) {
    const newFields = this.getFields();
    let fieldKey = fieldName;
    let indexer = 0;
    while (newFields.some( (fld) => fld.key === fieldKey )) {
      indexer++;
      fieldKey = fieldName + '_' + indexer;
    }
    newFields.push({key: fieldKey, fieldName: fieldName});
    this.props.onUpdateFields(newFields);
  }


  private moveField(fieldKey, toIndex) {
      const fields = this.getFields();
      const dragField = fields.filter( (fld) => fld.key === fieldKey )[0];
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
