import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import BasicSectionBackgroundExample, { IBasicSectionBackgroundExampleProps } from './components/BasicSectionBackgroundExample';

export default class OUIFRSectionBackgroundExampleWebPart extends BaseClientSideWebPart<void> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  public render(): void {
    const element: React.ReactElement<IBasicSectionBackgroundExampleProps > = React.createElement(
      BasicSectionBackgroundExample,
      {
        themeVariant: this._themeVariant
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
