import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme, ISemanticColors } from '@microsoft/sp-component-base';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


export default class BasicPlainSectionBackgroundExampleWebPart extends BaseClientSideWebPart<void> {
  private readonly _textContent: string = 'This web part has support for section backgrounds and will inherit its background from the section';
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  public render(): void {
    // See https://github.com/OfficeDev/office-ui-fabric-react/wiki/Theming
    const semanticColors: Readonly<ISemanticColors> | undefined = this._themeVariant && this._themeVariant.semanticColors;

    const style: string = ` style="background-color:${semanticColors.bodyBackground}"`;
    this.domElement.innerHTML = `<p${'' || (this._themeProvider && style)}>${this._textContent}</p>`;
  }

  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return super.onInit();
  }

  /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }
}
