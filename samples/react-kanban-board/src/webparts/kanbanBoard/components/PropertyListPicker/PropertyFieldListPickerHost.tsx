import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Async } from '@fluentui/react/lib/Utilities';
import { Label } from '@fluentui/react/lib/Label';
import { IPropertyFieldListPickerHostProps, IPropertyFieldListPickerHostState, ISPList } from './IPropertyFieldListPickerHost';

import { IPropertyFieldList } from './IPropertyFieldListPicker';
import SPListPickerService from './SPListPickerService';
import { setPropertyValue } from '../PropertyOrderField/helper';
import FieldErrorMessage from './FieldErrorMessage';

// Empty list value, to be checked for single list selection
const EMPTY_LIST_KEY = 'NO_LIST_SELECTED';

/**
 * Renders the controls for PropertyFieldListPicker component
 */
export default class PropertyFieldListPickerHost extends React.Component<IPropertyFieldListPickerHostProps, IPropertyFieldListPickerHostState> {

  private latestValidateValue: string;
  private async: Async;
  private delayedValidate: (value: string) => void;

  /**
   * Constructor method
   */
  constructor(props: IPropertyFieldListPickerHostProps) {
    super(props);


    this.state = {
      loadedLists: {
        value: []
      },
      results: [],
      errorMessage: ''
    };

    this.async = new Async(this);
    this.validate = this.validate.bind(this);
    this.onChanged = this.onChanged.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
  }

  public componentDidMount(): void {
    // Start retrieving the SharePoint lists
    this.loadLists().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
  }

  public componentDidUpdate(prevProps: IPropertyFieldListPickerHostProps, prevState: IPropertyFieldListPickerHostState): void {
    if (this.props.baseTemplate !== prevProps.baseTemplate ||
      this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl) {
      this.loadLists().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
    }
  }

  /**
   * Loads the list from SharePoint current web site, or target site if specified by webRelativeUrl
   */
  private async loadLists(): Promise<void> {

    const {
      context,
      selectedList
    } = this.props;

    const listService: SPListPickerService = new SPListPickerService(this.props, context);
    const listsToExclude: string[] = this.props.listsToExclude || [];
    const options = [];
    let selectedListKey: string = '';
    if (selectedList) {
      selectedListKey = typeof selectedList === 'string' ? selectedList : selectedList.id;
    }
    let selectedKey: string | undefined;
    const response = await listService.getLibs();
    // Start mapping the list that are selected
    response.value.forEach((list: ISPList) => {
      if (selectedListKey === list.Id) {
        selectedKey = list.Id;
      }

      // Make sure that the current list is NOT in the 'listsToExclude' array
      if (listsToExclude.indexOf(list.Title) === -1 && listsToExclude.indexOf(list.Id) === -1) {
        options.push({
          key: list.Id,
          text: list.Title
        });
      }
    });

    // Option to unselect the list
    options.unshift({
      key: EMPTY_LIST_KEY,
      text: ''
    });

    // Update the current component state
    this.setState({
      loadedLists: response,
      results: options,
      selectedKey: selectedKey
    });
  }

  /**
   * Raises when a list has been selected
   */
  private onChanged(option: IDropdownOption, index?: number): void {
    const newValue: string = option.key as string;
    this.delayedValidate(newValue);
  }

  /**
   * Validates the new custom field value
   */
  private validate(value: string): void {
    if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
      this.notifyAfterValidate(value);
      return;
    }

    if (this.latestValidateValue === value) {
      return;
    }

    this.latestValidateValue = value;

    const errResult: string | Promise<string> = this.props.onGetErrorMessage(value || '');
    if (typeof errResult !== 'undefined') {
      if (typeof errResult === 'string') {
        if (errResult === '') {
          this.notifyAfterValidate(value);
        }
        this.setState({
          errorMessage: errResult
        });
      } else {
        errResult.then((errorMessage: string) => {
          if (!errorMessage) {
            this.notifyAfterValidate(value);
          }
          this.setState({
            errorMessage: errorMessage
          });
        }).catch(() => { /* no-op; */ });
      }
    } else {
      this.notifyAfterValidate(value);
    }
  }

  /**
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate(newValue: string): void {
    const {
      onPropertyChange,
      targetProperty,
      selectedList,
      includeListTitleAndUrl,
      properties,
      onChange
    } = this.props;

    const {
      loadedLists
    } = this.state;

    // Check if the user wanted to unselect the list
    let propValue: string | IPropertyFieldList | undefined;

    if (includeListTitleAndUrl) {
      if (newValue === EMPTY_LIST_KEY) {
        propValue = undefined;
      }
      else {
        const spList = loadedLists.value.filter(l => l.Id === newValue)[0];
        propValue = {
          id: newValue,
          title: spList.Title,
          url: spList.RootFolder.ServerRelativeUrl
        };
      }
    }
    else {
      propValue = newValue === EMPTY_LIST_KEY ? '' : newValue;
    }


    // Deselect all options
    const options = this.state.results.map(option => {
      if (option.selected) {
        option.selected = false;
      }
      return option;
    });
    // Set the current selected key
    const selectedKey = newValue;
    // Update the state
    this.setState({
      selectedKey: selectedKey,
      results: options
    });

    if (onPropertyChange && propValue !== null) {
      // Store the new property value
      setPropertyValue(properties, targetProperty, propValue);
      // Trigger the default onPrpertyChange event
      onPropertyChange(targetProperty, selectedList, propValue);
      // Trigger the apply button
      if (typeof onChange !== 'undefined' && onChange !== null) {
        onChange(targetProperty, propValue);
      }
    }
  }

  /**
   * Called when the component will unmount
   */
  public componentWillUnmount(): void {
    if (typeof this.async !== 'undefined') {
      this.async.dispose();
    }
  }

  /**
   * Renders the SPListpicker controls with Office UI Fabric
   */
  public render(): JSX.Element {
    // Renders content
    return (
      <div>
        {this.props.label && <Label>{this.props.label}</Label>}
        <Dropdown
          disabled={this.props.disabled}
          label=''
          
          onChange={(ev,options) => {
            this.onChanged(options as IDropdownOption);
          }
        }
          options={this.state.results}
          selectedKey={this.state.selectedKey}
        />

        <FieldErrorMessage errorMessage={""+this.state.errorMessage} />
      </div>
    );
  }
}
