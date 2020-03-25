import { ServiceScope } from '@microsoft/sp-core-library';

export interface IHelloWorldProps {
  description: string;
  serviceScope: ServiceScope;
}
