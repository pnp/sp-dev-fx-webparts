import * as React from 'react';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { IPlanBucketSelectorProps } from './IPlanBucketSelectorProps';
import { IPlanBucketSelectorState } from './IPlanBucketSelectorState';
import { PropertyPaneStyles } from './PropertyPaneStyles';

import { 
  PlannerBucket,  
  PlannerPlan,
} from '@microsoft/microsoft-graph-types';
import * as strings from 'M365PlannerTimelineWebPartStrings';

export default class PlanBucketSelector extends React.Component<IPlanBucketSelectorProps, IPlanBucketSelectorState> {
  public constructor(props: IPlanBucketSelectorProps, state: IPlanBucketSelectorState) {
    super(props);

    this.state = {
      isLoading: true,
      graphClient: this.props.graphClient,
      groupId: this.props.groupId,
      planOptions: [],
      planId: this.props.planId,
      bucketId: this.props.bucketId,
      bucketOptions: [{ key: "All", text: strings.AllBucketsText, selected: true }],
      selectedPlanKey: this.props.planId,
      newPlannerName: "",
      newBucketName: "To Do",
      disableAdd: true,
      showAddNewPlan: false
    };
  }

  public componentDidUpdate(prevProps: IPlanBucketSelectorProps): void {
    // if the disabled state property changes, reload options
    if (this.props.disabled !== prevProps.disabled) {
      // refresh the mission list
      this._loadPlans(this.props.groupId)
        .then((planOptions: IDropdownOption[]) => {          
          this.setState((prevState: IPlanBucketSelectorState): IPlanBucketSelectorState => {
            prevState.planOptions = planOptions;
            prevState.showAddNewPlan = planOptions.length === 0;
            prevState.isLoading = false;
            return prevState;
          });
        })
        .catch(() => {
          return;
        });
    }
  }

  public async componentDidMount(): Promise<void> {
    const planOptions: IDropdownOption[] = await this._loadPlans(this.props.groupId);
      if (this.props.planId !== "") {
        const bucketOptions: IDropdownOption[] = await this._loadBuckets(this.props.planId);

        this.setState((prevState: IPlanBucketSelectorState): IPlanBucketSelectorState => {
          prevState.planOptions = planOptions;
          prevState.bucketOptions = bucketOptions;          
          prevState.isLoading = false;
          return prevState;    
        });
      } else {
        this.setState((prevState: IPlanBucketSelectorState): IPlanBucketSelectorState => {
          prevState.planOptions = planOptions;
          prevState.showAddNewPlan = planOptions.length === 0;
          prevState.isLoading = false;
          return prevState;    
        });
      }
  }

  private async _loadPlans(groupId: string): Promise<IDropdownOption[]> {
    // Get the plans for the M365 group
    const plans: PlannerPlan[] = await this._getPlans(groupId);
    // Create options for the plan dropdown
    const planOptions: IDropdownOption[] = plans.map(plan => ({ key: plan.id || '', text: plan.title || '', selected: plan.id === this.state.planId }));
    
    return planOptions;
  }

  private async _getPlans(groupId: string): Promise<PlannerPlan[]> {
    try {
      // Call Microsoft Graph API to get the plans for the M365 group
      const response = await this.props.graphClient.api(`/groups/${groupId}/planner/plans`).get();
      const plans: PlannerPlan[] = response.value.sort((a: PlannerPlan, b: PlannerPlan) => (a.title ?? "").localeCompare(b.title ?? ""));
      // Return array of plans
      return plans;
    } catch (error) {
      console.error(error);
      // on error return empty array
      return [];
    }
  }

  private async _addPlan(groupId: string, title: string): Promise<PlannerPlan | undefined> {
    let plan: PlannerPlan | undefined = undefined;

    try {
      const newPlan = {
        owner: groupId,
        title: title,
      };

      plan = await this.state.graphClient
        .api("/planner/plans")
        .post(newPlan);
      
    } catch (error: unknown) {
      console.error(error);
    }

    return plan;
  }

  private async _addBucket(planId: string, title: string): Promise<PlannerBucket | undefined> {
    let bucket: PlannerBucket | undefined = undefined;

    try {
      const newBucket = {
        name: title,
        planId: planId,
        orderHint:  " !",
      };

      bucket = await this.state.graphClient
        .api("/planner/buckets")
        .post(newBucket);
      
    } catch (error: unknown) {
      console.error(error);
    }

    return bucket;
  }

  private _setPlanName(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string): void {
    if ((newValue.length > 0) && (this.state.newBucketName.length > 0)) {
      this.setState({ 
        newPlannerName: newValue,
        disableAdd: false 
      });
    } else {  
      this.setState({ 
        newPlannerName: newValue,
        disableAdd: true 
      });
    }
  }
  
  private _setBucketName(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string): void {
    if ((newValue.length > 0) && (this.state.newPlannerName.length > 0)) {
      this.setState({ 
        newBucketName: newValue,
        disableAdd: false 
      });
    } else {  
      this.setState({ 
        newBucketName: newValue,
        disableAdd: true 
      });
    }
  }
  
  private async _addNewPlaner(groupId: string): Promise<void> {
    let newPlan: PlannerPlan | undefined = undefined;
    if (groupId !== "") {
      try {
        newPlan = await this._addPlan(groupId, this.state.newPlannerName);

        if (newPlan?.id) {
          const bucketName: string = this.state.newBucketName;
          const newBucket: PlannerBucket | undefined = await this._addBucket(newPlan.id, this.state.newBucketName);
          if (newBucket?.id) {
            const bucketId = newBucket.id;
            this.props.onChanged({
              planId: newPlan.id,
              bucketId: bucketId,
            });

            this._loadPlans(this.props.groupId)
              .then((planOptions: IDropdownOption[]) => {          
                this.setState((prevState: IPlanBucketSelectorState): IPlanBucketSelectorState => {
                  prevState.planOptions = planOptions;
                  prevState.planId = newPlan?.id ?? '';
                  prevState.showAddNewPlan = planOptions.length === 0;
                  prevState.isLoading = false;
                  prevState.newPlannerName = "";
                  prevState.newBucketName = "";
                  prevState.disableAdd = false;                  
                  prevState.bucketOptions = [
                    { key: "All", text: strings.AllBucketsText },
                    { key: bucketId, text: bucketName, selected: true }
                  ];
                  prevState.bucketId = bucketId;
                  prevState.selectedPlanKey = newPlan?.id ?? '';
                  return prevState;
                });
              })
              .catch(() => {
                return;
              });            
          }
        }
      } catch (error: unknown) {
        console.error(error);
      }
    }    
  }

  public render(): JSX.Element {
    // Show loading spinner while loading plans from Microsoft Graph
    if (this.state.isLoading) {
      return (
        <div>
          <Label>{strings.PropertyLoadingPlans}</Label>
          <Spinner size={SpinnerSize.medium} />
        </div>
      );
    } else {
      return (
        <div>
          <Toggle
            label={strings.PropertyPanePlanToggleLabel}
            onText={strings.PanePlanToggleOnText}
            offText={strings.PanePlanToggleOffText}
            checked={this.state.showAddNewPlan}
            disabled={(this.props.disabled ?? true) || (this.state.planOptions.length === 0)}
            onChange={(event: React.MouseEvent<HTMLElement>, checked: boolean) => this.setState({ showAddNewPlan: checked })}
          />
          { this.state.showAddNewPlan ?          
            <>            
              <TextField 
                label={strings.PaneNewPlanTextLabel}
                onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string) => this._setPlanName(event, newValue)}
                disabled={this.props.disabled ?? true} 
                value={this.state.newPlannerName} />
              <TextField 
                label={strings.PaneInitialBucketTextLabel}
                onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string) => this._setBucketName(event, newValue)}          
                disabled={this.props.disabled ?? true} 
                value={this.state.newBucketName}/>
              <DefaultButton 
                text={strings.PaneNewPlanButtonText}
                className={PropertyPaneStyles.addPlaneButton}
                onClick={() => this._addNewPlaner(this.props.groupId)} 
                allowDisabledFocus disabled={this.state.disableAdd} 
                checked={!this.state.disableAdd} />              
            </>
          :
            <>              
              <Dropdown
                  label={strings.PlanDropdownLabel}
                  disabled={this.props.disabled || this.state.isLoading}
                  options={this.state.planOptions}
                  selectedKey={this.state.selectedPlanKey}
                  onChange={this._onPlanChange} />
                <Dropdown
                  label={strings.BucketDropdownLabel}
                  selectedKey={this.state.bucketId}
                  disabled={this.props.disabled || this.state.isLoading}
                  options={this.state.bucketOptions}
                  onChange={this._onBucketChange} />                
            </>
          }
        </div>
      );
    }
  }

  private async _loadBuckets(planId: string | number): Promise<IDropdownOption[]> {
    // Get the buckets for the selected plan
    let buckets: PlannerBucket[] = [];

    if (planId !== "")
      buckets = await this._getBuckets(planId);

    const bucketOptions: IDropdownOption[] = [];

    // Create options for the bucket dropdown
    bucketOptions.push({ key: "All", text: strings.AllBucketsText, selected: true });
    
    buckets.forEach((bucket: PlannerBucket) => {
      return bucketOptions.push({ key: bucket.id ?? 'unknown', text: bucket.name ?? 'Unnamed Bucket', selected: bucket.id === this.state.bucketId });
    });
    
    return bucketOptions;
  }

  private async _getBuckets(planId: string | number): Promise<PlannerBucket[]> {
    try {
      // Call Microsoft Graph API to get the buckets for the selected plan
      const response = await this.props.graphClient.api(`/planner/plans/${planId}/buckets`).get();
      const buckets: PlannerBucket[] = response.value;
      // Return array of buckets
      return buckets;
    } catch (error) {
      console.error(error);
      // on error return empty array
      return [];
    }
  }

  private _onPlanChange = async (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption, index?: number): Promise<void> => {
    // update the component state
    this.setState((prevState: IPlanBucketSelectorState): IPlanBucketSelectorState => {
      prevState.isLoading = true;
      return prevState;
    });

    // reset previously selected options
    const currentOptions: IDropdownOption[] = this.state.planOptions;
    currentOptions.forEach((currentOption): void => {
      currentOption.selected = (currentOption.key === option.key);
    });

    const bucketOptions: IDropdownOption[] = await this._loadBuckets(option.key);

    // update the parent component
    if (this.props.onChanged)
      this.props.onChanged({ planId: String(option.key), bucketId: "All" });

    // update the component state
    this.setState((prevState: IPlanBucketSelectorState): IPlanBucketSelectorState => {
      prevState.planOptions = currentOptions;
      prevState.bucketOptions = bucketOptions;
      prevState.selectedPlanKey = option.key;
      prevState.isLoading = false;
      return prevState;
    });
  }

  private _onBucketChange = async (event: React.FormEvent<HTMLDivElement>, option: IDropdownOption, index?: number): Promise<void> => {
    // reset previously selected options
    const currentOptions: IDropdownOption[] = this.state.bucketOptions;
    // update the component state
    this.setState((prevState: IPlanBucketSelectorState): IPlanBucketSelectorState => {
      prevState.bucketOptions.forEach((currentOption): void => {
        currentOption.selected = (currentOption.key === option.key);
      });
      return prevState;
    });

    // update the parent component
    if (this.props.onChanged)
      this.props.onChanged({ planId: String(this.state.selectedPlanKey), bucketId: String(option.key) });

    // update the component state
    this.setState((prevState: IPlanBucketSelectorState): IPlanBucketSelectorState => {
      prevState.bucketOptions = currentOptions;
      return prevState;
    });
  }
}
