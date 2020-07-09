import * as MicrosoftGroup from '@microsoft/microsoft-graph-types';

export interface IReactMyGroupsState {
  groups: MicrosoftGroup.Group[];
  isLoading: boolean;
}
