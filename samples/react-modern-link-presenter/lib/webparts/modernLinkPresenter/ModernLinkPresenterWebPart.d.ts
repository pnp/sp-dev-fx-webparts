import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface IModernLinkPresenterWebPartProps {
    description: string;
    links: any[];
    outputFormat: 'links' | 'linksWithIcon' | 'linkDescriptionIcon' | 'tile';
    tileWidth?: number;
    tileHeight?: number;
    tileHoverEffect?: 'none' | 'lift' | 'shadow' | 'scale';
    direction?: 'vertical' | 'horizontal';
    tileButtonText?: string;
    showTileButton?: boolean;
    showSearchField?: boolean;
}
export default class ModernLinkPresenterWebPart extends BaseClientSideWebPart<IModernLinkPresenterWebPartProps> {
    private _isDarkTheme;
    private _environmentMessage;
    render(): void;
    protected onInit(): Promise<void>;
    private _getEnvironmentMessage;
    protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ModernLinkPresenterWebPart.d.ts.map