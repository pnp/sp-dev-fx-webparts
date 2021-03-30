import * as React from 'react';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IPropertyFieldViewPickerHostProps, IPropertyFieldViewPickerHostState } from './IPropertyFieldViewPickerHost';
import { SPViewPickerService } from '../../services/SPViewPickerService';
import FieldErrorMessage from '@pnp/spfx-property-controls/lib/propertyFields/errorMessage/FieldErrorMessage';
import { ISPView } from '.';
import { ISPViews } from './ISPViews';

// Empty view value
const EMPTY_VIEW_KEY = 'NO_VIEW_SELECTED';

/**
 * Renders the controls for PropertyFieldViewPicker component
 */
export default class PropertyFieldViewPickerHost extends React.Component<IPropertyFieldViewPickerHostProps, IPropertyFieldViewPickerHostState> {
  private options: IDropdownOption[] = [];
  private selectedKey: string;
  private latestValidateValue: string;
  private async: Async;
  private delayedValidate: (value: string) => void;

  /**
   * Constructor method
   */
  constructor(props: IPropertyFieldViewPickerHostProps) {
    super(props);

    this.state = {
      results: this.options,
      errorMessage: ''
    };

    this.async = new Async(this);
    this.validate = this.validate.bind(this);
    this.onChanged = this.onChanged.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, this.props.deferredValidationTime);
  }

  public componentDidMount(): void {
    // Start retrieving the list views
    this.loadViews();
  }

  public componentDidUpdate(prevProps: IPropertyFieldViewPickerHostProps, _prevState: IPropertyFieldViewPickerHostState): void {
    if (this.props.listId !== prevProps.listId || this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl) {
      this.loadViews();
    }
  }

  /**
   * Loads the views from a SharePoint list
   */
  private loadViews(): void {
    const viewService: SPViewPickerService = new SPViewPickerService(this.props, this.props.context);
    const viewsToExclude: string[] = this.props.viewsToExclude || [];
    this.options = [];
    viewService.getViews().then((response: ISPViews) => {
      // Start mapping the views that are selected
      response.value.forEach((view: ISPView) => {
        if (this.props.selectedView === view.Id) {
          this.selectedKey = view.Id;
        }

         // Make sure that the current view is NOT in the 'viewsToExclude' array
         if (viewsToExclude.indexOf(view.Title) === -1 && viewsToExclude.indexOf(view.Id) === -1) {
          this.options.push({
            key: view.Id,
            text: view.Title
          });
        }
      });

      // Option to unselect the view
      this.options.unshift({
        key: EMPTY_VIEW_KEY,
        text: ''
      });

      // Update the current component state
      this.setState({
        results: this.options,
        selectedKey: this.selectedKey
      });
    });
  }

  /**
   * Raises when a view has been selected
   */
  private onChanged(option: IDropdownOption, _index?: number): void {
    const newValue: string = option.key as string;
    this.delayedValidate(newValue);
  }

  /**
   * Validates the new custom field value
   */
  private validate(value: string): void {
    if (this.props.onGetErrorMessage === null || this.props.onGetErrorMessage === undefined) {
      this.notifyAfterValidate(this.props.selectedView, value);
      return;
    }

    if (this.latestValidateValue === value) {
      return;
    }

    this.latestValidateValue = value;

    const errResult: string | PromiseLike<string> = this.props.onGetErrorMessage(value || '');
    if (typeof errResult !== 'undefined') {
      if (typeof errResult === 'string') {
        if (errResult === '') {
          this.notifyAfterValidate(this.props.selectedView, value);
        }
        this.setState({
          errorMessage: errResult
        });
      } else {
        errResult.then((errorMessage: string) => {
          if (!errorMessage) {
            this.notifyAfterValidate(this.props.selectedView, value);
          }
          this.setState({
            errorMessage: errorMessage
          });
        });
      }
    } else {
      this.notifyAfterValidate(this.props.selectedView, value);
    }
  }

  /**
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate(oldValue: string, newValue: string) {
    // Check if the user wanted to unselect the view
    const propValue = newValue === EMPTY_VIEW_KEY ? '' : newValue;

    // Deselect all options
    this.options = this.state.results.map(option => {
      if (option.selected) {
        option.selected = false;
      }
      return option;
    });
    // Set the current selected key
    this.selectedKey = newValue;
    // Update the state
    this.setState({
      selectedKey: this.selectedKey,
      results: this.options
    });

    if (this.props.onPropertyChange && propValue !== null) {
      // Store the new property value
      this.props.properties[this.props.targetProperty] = propValue;

      // Trigger the default onPropertyChange event
      this.props.onPropertyChange(this.props.targetProperty, oldValue, propValue);

      // Trigger the apply button
      if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null) {
        this.props.onChange(this.props.targetProperty, propValue);
      }
    }
  }

  /**
   * Called when the component will unmount
   */
  public componentWillUnmount() {
    if (typeof this.async !== 'undefined') {
      this.async.dispose();
    }
  }

  /**
   * Renders the SPViewPicker controls with Office UI Fabric
   */
  public render(): JSX.Element {
    // Renders content
    return (
      <div>
        {this.props.label && <Label>{this.props.label}</Label>}
        <Dropdown
          disabled={this.props.disabled}
          label=''
          onChanged={this.onChanged}
          options={this.state.results}
          selectedKey={this.state.selectedKey}
        />

        <FieldErrorMessage errorMessage={this.state.errorMessage} />
      </div>
    );
  }
}
