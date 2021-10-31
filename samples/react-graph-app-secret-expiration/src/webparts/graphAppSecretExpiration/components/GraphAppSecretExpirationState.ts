import { IGrouping } from '@pnp/spfx-controls-react/lib/ListView';
import { IApplications, IApplication,IPasswordCredential,IKeyCredential,IFormattedApplication } from '../../../models/IApplication';

export interface IGraphAppSecretExpirationState {
    applications: IFormattedApplication[];
    filteredApplications: IFormattedApplication[];
    filterValue: string;
    searchFilter: string;
    groupByFields: IGrouping[];
    page: number;
    error: string;
    loading: boolean;
  }