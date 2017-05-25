import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { IWeatherWebPartProps } from './IWeatherWebPartProps';
export default class WeatherWebPart extends BaseClientSideWebPart<IWeatherWebPartProps> {
    private container;
    constructor();
    render(): void;
    private renderContents();
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    protected readonly disableReactivePropertyChanges: boolean;
}
