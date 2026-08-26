import { IEnvironment } from '../PowerPlatformEnvironmentsWebPart';

export interface IPowerPlatformEnvironmentsProps {
  environments: IEnvironment[];
  deleteEnvironment: ( environmentId: string ) => Promise<void>;
}