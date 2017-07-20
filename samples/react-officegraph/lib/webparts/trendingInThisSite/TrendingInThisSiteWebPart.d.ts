import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartContext } from '@microsoft/sp-webpart-base';
import { ITrendingInThisSiteWebPartProps } from './ITrendingInThisSiteWebPartProps';
export default class TrendingInThisSiteWebPart extends BaseClientSideWebPart<ITrendingInThisSiteWebPartProps> {
    constructor(context: IWebPartContext);
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
