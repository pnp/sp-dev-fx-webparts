import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IComponentFieldsConfiguration } from "../../services/TemplateService/TemplateService";
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { ServiceScope } from '@microsoft/sp-core-library';

export interface IPersonaCardProps {
  serviceScope: ServiceScope;
  item?: MicrosoftGraph.User;
  fieldsConfiguration?: IComponentFieldsConfiguration[];
  personaSize?: string;
  themeVariant?: IReadonlyTheme;

  // Individual content properties (i.e web component attributes)
  text?: string;
  secondaryText?: string;
  tertiaryText?: string;
  optionalText?: string;
  upn?: string;
}
