import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import styles from './ListForm.module.scss';
import { IListFormProps } from './IListFormProps';
import { IListFormState } from './IListFormState';
import { escape } from '@microsoft/sp-lodash-subset';
import { ControlMode } from '../../../common/datatypes/ControlMode';

import { IListFormService } from '../../../common/services/IListFormService';
import { ListFormService } from '../../../common/services/ListFormService';

import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';

import SPFormField from './formFields/SPFormField';


export default class ListForm extends React.Component<IListFormProps, IListFormState> {

  private listFormService: IListFormService;

  constructor( props: IListFormProps ) {
    super(props);

    // set initial state
    this.state = {
      isLoadingSchema: true,
      isLoadingData: true,
      isSaving: false,
      data: {},
      originalData: {},
      errors: [],
      fieldErrors: {},
    };

    // normally we don't need to bind the functions as we use arrow functions and do automatically the bing
    // http://bit.ly/reactArrowFunction
    // but using Async function we can't convert it into arrow function, so we do the binding here
    this._readSchema.bind(this);
    this._readData.bind(this);
    this.valueChanged.bind(this);
/*    this.moveField.bind(this);
    this.removeField.bind(this);*/

    this.listFormService = new ListFormService(props.spContext.spHttpClient);
  }

  public render(): React.ReactElement<IListFormProps> {
    return (
      <div className={styles.listForm}>
        <div>
          {this._getErrors()}
        </div>
        { (this.props.listUrl) ?
          <p className='ms-font-l'>{escape(this.props.description)} for {escape(this.props.listUrl)}</p>
          : <p className='ms-font-l' style={{ color: 'orangeRed' }}>Please configure a list in the web part's editor first.</p> }
        { (this.state.isLoadingSchema || this.state.isLoadingData) ? (<Spinner size={ SpinnerSize.large } label='Loading the form...' />)
        : ((this.state.fieldsSchema) &&
              <div>
                <div className={styles.formFieldsContainer}>
                  {this.renderFields()}
                </div>
                <div className={styles.formButtonsContainer}>
                  <PrimaryButton
                      disabled={ false }
                      text='Save'
                      onClick={ () => this._SaveItem() }
                    />
                  <DefaultButton
                      disabled={ false }
                      text='Cancel'
                      onClick={ () => this._readData(this.props.listUrl, this.props.formType, this.props.id) }
                    />
                </div>
            </div>
          )
        }
    </div>
    );
  }

  public componentDidMount(): void {
    this._readSchema(this.props.listUrl, this.props.formType);
    this._readData(this.props.listUrl, this.props.formType, this.props.id);
  }

  public componentWillReceiveProps(nextProps: IListFormProps): void {
    if ((this.props.listUrl !== nextProps.listUrl) || (this.props.formType !== nextProps.formType)) {
      this._readSchema(nextProps.listUrl, nextProps.formType);
    }
    if ((this.props.id !== nextProps.id) || (this.props.formType !== nextProps.formType)) {
      this._readData(nextProps.listUrl, nextProps.formType, nextProps.id);
    }
  }

  private async _readData(listUrl: string, formType: ControlMode, id?: number): Promise<void> {
    try {
       if (!id) {
         this.setState({ ...this.state, data: {}, originalData: {}, isLoadingData: false});
         return;
       }
       this.setState({ ...this.state, data: {}, originalData: {}, isLoadingData: true});
       const dataObj = await this.listFormService.getDataForForm(
           this.props.spContext.pageContext.web.absoluteUrl, listUrl, id, formType);
       // We shallow clone here, so that changing values on dataObj object fields won't be changing in originalData too
       const dataObjOriginal = { ...dataObj };
       this.setState({...this.state, data: dataObj, originalData: dataObjOriginal, isLoadingData: false});
    } catch (error) {
       this.setState({ ...this.state, data: {}, isLoadingData: false, errors: [...this.state.errors, error.message] });
    }
  }

  private async _readSchema(listUrl: string, formType: ControlMode): Promise<void> {
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
     this.setState({
       ...this.state,
       isLoadingSchema: false,
       fieldsSchema: null,
       errors: [...this.state.errors, error.message],
     });
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

  private async _SaveItem(): Promise<void> {
     this.setState({ ...this.state, isSaving: true});
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
       this.setState((prevState, props) => {
         let hadErrors = false;
         updatedValues.filter( (fieldVal) => fieldVal.HasException ).forEach( (element) => {
           prevState.fieldErrors[element.FieldName] = element.ErrorMessage;
           hadErrors = true;
         });
         if (hadErrors) {
           if (props.onSubmitFailed) { props.onSubmitFailed(prevState.fieldErrors); }
         } else {
           updatedValues.reduce(
             (val, merged) => {
               merged[val.FieldName] = merged[val.FieldValue]; return merged;
             },
             prevState.data,
           );
           // we shallow clone here, so that changing values on state.data won't be changing in state.originalData too
           prevState.originalData = { ...prevState.data };
           let id = (props.id) ? props.id : 0;
           if (id === 0) {
             id = updatedValues.filter( (val) => val.FieldName === 'Id' )[0].FieldValue;
           }
           if (props.onSubmitSucceeded) { props.onSubmitSucceeded( id ); }
         }
         prevState.isSaving = false;
         return prevState;
       });
     } catch (error) {
         this.setState({ ...this.state, errors: [...this.state.errors, error] });
     }
  }


  private _getErrors() {
   return this.state.errors.length > 0
     ?
     <div style={{ color: 'orangeRed' }} >
       <div>Errors:</div>
       {
         this.state.errors.map((item, idx) => {
           return (<div key={idx} >{JSON.stringify(item)}</div>);
         })
       }
     </div>
     : null;
 }


 private getFields(): string[] {
   let fields = this.props.fields;
   if ((!fields || fields.length === 0) && this.state.fieldsSchema) {
     fields = this.state.fieldsSchema.map( (field) => field.InternalName );
   }
   return fields;
 }


 private renderFields() {

   const { fieldsSchema, data, fieldErrors } = this.state;
   const fields = this.getFields();
   return (fields && (fields.length > 0))
   ?
   <div className='ard-formFieldsContainer' >
       {
           fields.map((field, idx) => {
               const fieldSchemas = fieldsSchema.filter((f) => f.InternalName === field);
               if (fieldSchemas.length > 0) {
                 const fieldSchema = fieldSchemas[0];
                 const value = data[field];
                 const errorMessage = fieldErrors[field];
                 return (
                    <SPFormField
                        fieldSchema={fieldSchema}
                        controlMode={this.props.formType}
                        value={value}
                        valueChanged={(val) => this.valueChanged(field, val)}
                        errorMessage={errorMessage} />
                  );
               }
           })
       }
   </div>
   : <div style={{ color: 'red' }} >No fields available!</div>;
 }


}
