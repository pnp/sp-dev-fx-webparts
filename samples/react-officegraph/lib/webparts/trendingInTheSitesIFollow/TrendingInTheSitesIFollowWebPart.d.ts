import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartContext } from '@microsoft/sp-webpart-base';
import { ITrendingInTheSitesIFollowWebPartProps } from './ITrendingInTheSitesIFollowWebPartProps';
export default class TrendingInTheSitesIFollowWebPart extends BaseClientSideWebPart<ITrendingInTheSitesIFollowWebPartProps> {
    constructor(context: IWebPartContext);
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
