import { PageCollection } from './PageCollection';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import { IComponentFieldsConfiguration } from '../services/TemplateService/TemplateService';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { ServiceScope } from '@microsoft/sp-core-library';

interface ITemplateContext {
    items: PageCollection<MicrosoftGraph.User>;
    showResultsCount: boolean;
    showBlank: boolean;
    showPagination: boolean;
    peopleFields?: IComponentFieldsConfiguration[];
    themeVariant?: IReadonlyTheme;
    serviceScope: ServiceScope;
    [key:string]: any;
}

export default ITemplateContext;