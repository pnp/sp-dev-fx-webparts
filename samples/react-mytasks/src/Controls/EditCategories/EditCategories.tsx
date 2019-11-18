import * as React from 'react';
import { IEditCategoriesProps } from './IEditCategoriesProps';
import { IEditCategoriesState } from './IEditCategoriesState';
import { IPlannerPlanExtended } from '../../services/IPlannerPlanExtended';
import { IPlannerPlanDetails } from '../../services/IPlannerPlanDetails';
import {
  Stack,
  Checkbox,
  MessageBar,
  MessageBarType,
  IconButton
} from 'office-ui-fabric-react';
import { IAppliedCategories } from '../../services/IAppliedCategories';
import { getTheme } from '@uifabric/styling';
import { textFieldSearchStyles } from '../UploadFile/UploadStyles';
import * as tsStyles from './EditCategoriesStyles';

const categoriesColors = {
  category1: '#e000f1',
  category2: '#f44b1d',
  category3: '#e39e27',
  category4: '#aee01e',
  category5: '#46A08E',
  category6: '#62cef0'
};

export class EditCategories extends React.Component<IEditCategoriesProps, IEditCategoriesState> {
  private _plannerPlanDetails: IPlannerPlanDetails;
  private _appliedCategoryKeys: IAppliedCategories = {};

  constructor(props: IEditCategoriesProps) {
    super(props);

    this.state = {
      task: this.props.task,
      appliedCategories: [] as JSX.Element[],
      hasError: false,
      errorMessage: '',
      category1Value: this.props.task.appliedCategories["category1"],
      category2Value: this.props.task.appliedCategories["category2"],
      category3Value: this.props.task.appliedCategories["category3"],
      category4Value: this.props.task.appliedCategories["category4"],
      category5Value: this.props.task.appliedCategories["category5"],
      category6Value: this.props.task.appliedCategories["category6"],
      plannerDetails : {} as IPlannerPlanDetails,
    };
  }

  public async componentWillMount(): Promise<void> {

    this._appliedCategoryKeys = this.props.task.appliedCategories;
    this._plannerPlanDetails = await this.props.spservice.getPlanDetails(this.props.task.planId);
  //  const allCategoriesKeys = Object.keys(categoriesColors);
  //  const appliedCategories: JSX.Element[] = [];
    let categoriesCheched: {[key:string]: boolean} = {};

  this.setState({ plannerDetails: this._plannerPlanDetails});
  }


  public  async componentDidUpdate(prevProps: IEditCategoriesProps, prevState: IEditCategoriesState): Promise<void> {
    if (!this._plannerPlanDetails){
      this._plannerPlanDetails = await this.props.spservice.getPlanDetails(this.props.task.planId);
    }
  }
  /**
   * Determines whether check box category changed on
   */
  private _onCheckBoxCategory1Changed = async (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    ev.preventDefault();


    try {
      this._appliedCategoryKeys["category1"] = checked;
      const updatedTask  = await this.props.spservice.updateTaskProperty(
        this.state.task.id,
        'appliedCategories',
        this._appliedCategoryKeys,
        this.state.task['@odata.etag']
      );
      this.setState({task: updatedTask , category1Value: checked});
  } catch (error) {
    this.setState({ hasError: true, errorMessage: error.message });
  }
  };

  private _onCheckBoxCategory2Changed = async (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    ev.preventDefault();
    try {
      this._appliedCategoryKeys["category2"] = checked;
      const updatedTask  = await this.props.spservice.updateTaskProperty(
        this.state.task.id,
        'appliedCategories',
        this._appliedCategoryKeys,
        this.state.task['@odata.etag']
      );
      this.setState({task: updatedTask , category2Value: checked});
  } catch (error) {
    this.setState({ hasError: true, errorMessage: error.message });
  }
  };

  private _onCheckBoxCategory3Changed = async (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    ev.preventDefault();


    try {
      this._appliedCategoryKeys["category3"] = checked;
      const updatedTask  = await this.props.spservice.updateTaskProperty(
        this.state.task.id,
        'appliedCategories',
        this._appliedCategoryKeys,
        this.state.task['@odata.etag']
      );
      this.setState({task: updatedTask , category3Value: checked});
  } catch (error) {
    this.setState({ hasError: true, errorMessage: error.message });
  }
  };

  private _onCheckBoxCategory5Changed = async (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    ev.preventDefault();
    try {
        this._appliedCategoryKeys["category5"] = checked;
        const updatedTask  = await this.props.spservice.updateTaskProperty(
          this.state.task.id,
          'appliedCategories',
          this._appliedCategoryKeys,
          this.state.task['@odata.etag']
        );
        this.setState({task: updatedTask , category5Value: checked});
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    }
  };

  private _onCheckBoxCategory6Changed = async (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    ev.preventDefault();
    try {
        this._appliedCategoryKeys["category6"] = checked;
        const updatedTask  = await this.props.spservice.updateTaskProperty(
          this.state.task.id,
          'appliedCategories',
          this._appliedCategoryKeys,
          this.state.task['@odata.etag']
        );
        this.setState({task: updatedTask , category6Value: checked});
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    }
  };

  private _onCheckBoxCategory4Changed = async (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) => {
    ev.preventDefault();
    try {
        this._appliedCategoryKeys["category4"] = checked;
        const updatedTask  = await this.props.spservice.updateTaskProperty(
          this.state.task.id,
          'appliedCategories',
          this._appliedCategoryKeys,
          this.state.task['@odata.etag']
        );
        this.setState({task: updatedTask , category4Value: checked});
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    }
  };
  /**
   * Renders edit categories
   * @returns render
   */
  public render(): React.ReactElement<IEditCategoriesProps> {
    return (
      <div>
        <Stack horizontal horizontalAlign='start' gap={10}>
          {this.state.hasError ? (
            <MessageBar messageBarType={MessageBarType.error}>{this.state.errorMessage}</MessageBar>
          ) : (

               <>
                <div  title={
                  this.state.plannerDetails && this.state.plannerDetails.categoryDescriptions
                    ? this.state.plannerDetails.categoryDescriptions["category1"]
                    : ''
                }>
                <Checkbox

                onChange={this._onCheckBoxCategory1Changed}
                checked={ this.state.category1Value}
                styles={{
                  ...tsStyles.checkboxStyles,
                  label: {  selectors: { [':hover .ms-Checkbox-checkbox']: { background: categoriesColors["category1"] } } },
                  checkbox: {
                    selectors: { [':hover']: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } },
                    width: 90,
                    height: 25,
                    borderStyle: 'none',
                    marginRight: 0,
                    background: categoriesColors["category1"]
                  }
                }}>
                </Checkbox>
                </div>
              <div  title={
                this.state.plannerDetails && this.state.plannerDetails.categoryDescriptions
                ? this.state.plannerDetails.categoryDescriptions["category2"]
                : ''
              }>
              <Checkbox

              onChange={this._onCheckBoxCategory2Changed}
              checked={ this.state.category2Value}
              styles={{
                ...tsStyles.checkboxStyles,
                label: {  selectors: { [':hover .ms-Checkbox-checkbox']: { background: categoriesColors["category2"] } } },
                checkbox: {
                  selectors: { [':hover']: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } },
                  width: 90,
                  height: 25,
                  borderStyle: 'none',
                  marginRight: 0,
                  background: categoriesColors["category2"]
                }
              }}>
              </Checkbox>
              </div>
                <div title={
                  this.state.plannerDetails && this.state.plannerDetails.categoryDescriptions
                  ? this.state.plannerDetails.categoryDescriptions["category3"]
                  : ''
                }>
                <Checkbox

                onChange={this._onCheckBoxCategory3Changed}
                checked={ this.state.category3Value}
                styles={{
                  ...tsStyles.checkboxStyles,
                  label: {  selectors: { [':hover .ms-Checkbox-checkbox']: { background: categoriesColors["category3"] } } },
                  checkbox: {
                    selectors: { [':hover']: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } },
                    width: 90,
                    height: 25,
                    borderStyle: 'none',
                    marginRight: 0,

                    background: categoriesColors["category3"]
                  }
                }}>
                </Checkbox>
                </div>
                <div    title={
                  this.state.plannerDetails && this.state.plannerDetails.categoryDescriptions
                  ? this.state.plannerDetails.categoryDescriptions["category4"]
                  : ''
                }>
                <Checkbox

                onChange={this._onCheckBoxCategory4Changed}
                checked={ this.state.category4Value}
                styles={{
                  ...tsStyles.checkboxStyles,
                  label: {  selectors: { [':hover .ms-Checkbox-checkbox']: { background: categoriesColors["category4"] } } },
                  checkbox: {
                    selectors: { [':hover']: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } },
                    width: 90,
                    height: 25,
                    borderStyle: 'none',
                    marginRight: 0,
                    background: categoriesColors["category4"]
                  }
                }}>
                </Checkbox>
                </div>
                <div  title={
                  this.state.plannerDetails && this.state.plannerDetails.categoryDescriptions
                  ? this.state.plannerDetails.categoryDescriptions["category5"]
                  : ''
                }>

                 <Checkbox

                  onChange={this._onCheckBoxCategory5Changed}
                  checked={ this.state.category5Value}
                  styles={{
                    ...tsStyles.checkboxStyles,
                    label: {  selectors: { [':hover .ms-Checkbox-checkbox']: { background: categoriesColors["category5"] } } },
                    checkbox: {
                      selectors: { [':hover']: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } },
                      width: 90,
                      height: 25,
                      borderStyle: 'none',
                      marginRight: 0,
                      background: categoriesColors["category5"]
                    }
                  }}>
                  </Checkbox>
                 </div >
                  <div title={
                    this.state.plannerDetails && this.state.plannerDetails.categoryDescriptions
                    ? this.state.plannerDetails.categoryDescriptions["category6"]
                    : ''
                  }>
                  <Checkbox

                  onChange={this._onCheckBoxCategory6Changed}
                  checked={ this.state.category6Value}
                  styles={{
                    ...tsStyles.checkboxStyles,
                    label: {  selectors: { [':hover .ms-Checkbox-checkbox']: { background: categoriesColors["category6"] } } },
                    checkbox: {
                      selectors: { [':hover']: { backgroundColor: 'rgba(0, 0, 0, 0.2)' } },
                      width: 90,
                      height: 25,
                      borderStyle: 'none',
                      marginRight: 0,
                      background: categoriesColors["category6"]
                    }
                  }}>
                  </Checkbox>
                  </div>
                </>

          )}
        </Stack>

      </div>
    );
  }
}
