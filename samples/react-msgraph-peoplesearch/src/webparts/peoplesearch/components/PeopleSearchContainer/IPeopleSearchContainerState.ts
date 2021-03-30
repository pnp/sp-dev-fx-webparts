import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { PageCollection } from '../../../../models/PageCollection';

export interface IPeopleSearchContainerState {
  results: PageCollection<MicrosoftGraph.User>;
  areResultsLoading: boolean;
  errorMessage: string;
  hasError: boolean;
}
