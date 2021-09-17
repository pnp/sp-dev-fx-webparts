import { IGrouping } from '@pnp/spfx-controls-react/lib/ListView';
import { IApplications, IApplication,IPasswordCredential,IKeyCredential,IFormattedApplication } from '../../../models/IApplication';

export interface IGraphAppSecretExpirationState {
    applications: IFormattedApplication[];
    groupByFields: IGrouping[];
    error: string;
    loading: boolean;
  }