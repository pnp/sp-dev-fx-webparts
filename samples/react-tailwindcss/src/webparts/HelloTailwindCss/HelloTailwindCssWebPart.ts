import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'HelloTailwindCssWebPartStrings';
import HelloTailwindCss from './components/HelloTailwindCss';
import { IHelloTailwindCssProps } from './components/IHelloTailwindCssProps';
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';


export interface IHelloTailwindCssWebPartProps {
  description: string;
}

export default class HelloTailwindCssWebPart extends BaseClientSideWebPart<IHelloTailwindCssWebPartProps> {

  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    // Apply theme variant as CSS Variables at current DOM node
    this._applyThemeVariant();

    return super.onInit();
  }

  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this._applyThemeVariant();
    this.render();
  }

  private _applyThemeVariant() {
    let style = this.domElement.style;

    style.setProperty('--tw-fui-themeDarker', this._themeVariant.palette.themeDarker);
    style.setProperty('--tw-fui-themeDark', this._themeVariant.palette.themeDark);
    style.setProperty('--tw-fui-themeDarkAlt', this._themeVariant.palette.themeDarkAlt);
    style.setProperty('--tw-fui-themePrimary', this._themeVariant.palette.themePrimary);
    style.setProperty('--tw-fui-themeSecondary', this._themeVariant.palette.themeSecondary);
    style.setProperty('--tw-fui-themeTertiary', this._themeVariant.palette.themeTertiary);
    style.setProperty('--tw-fui-themeLight', this._themeVariant.palette.themeLight);
    style.setProperty('--tw-fui-themeLighter', this._themeVariant.palette.themeLighter);
    style.setProperty('--tw-fui-themeLighterAlt', this._themeVariant.palette.themeLighterAlt);
    style.setProperty('--tw-fui-black', this._themeVariant.palette.black);
    style.setProperty('--tw-fui-blackTranslucent40', this._themeVariant.palette.blackTranslucent40);
    style.setProperty('--tw-fui-neutralDark', this._themeVariant.palette.neutralDark);
    style.setProperty('--tw-fui-neutralPrimary', this._themeVariant.palette.neutralPrimary);
    style.setProperty('--tw-fui-neutralPrimaryAlt', this._themeVariant.palette.neutralPrimaryAlt);
    style.setProperty('--tw-fui-neutralSecondary', this._themeVariant.palette.neutralSecondary);
    style.setProperty('--tw-fui-neutralSecondaryAlt', this._themeVariant.palette.neutralSecondaryAlt);
    style.setProperty('--tw-fui-neutralTertiary', this._themeVariant.palette.neutralTertiary);
    style.setProperty('--tw-fui-neutralTertiaryAlt', this._themeVariant.palette.neutralTertiaryAlt);
    style.setProperty('--tw-fui-neutralQuaternary', this._themeVariant.palette.neutralQuaternary);
    style.setProperty('--tw-fui-neutralQuaternaryAlt', this._themeVariant.palette.neutralQuaternaryAlt);
    style.setProperty('--tw-fui-neutralLight', this._themeVariant.palette.neutralLight);
    style.setProperty('--tw-fui-neutralLighter', this._themeVariant.palette.neutralLighter);
    style.setProperty('--tw-fui-neutralLighterAlt', this._themeVariant.palette.neutralLighterAlt);
    style.setProperty('--tw-fui-accent', this._themeVariant.palette.accent);
    style.setProperty('--tw-fui-white', this._themeVariant.palette.white);
    style.setProperty('--tw-fui-whiteTranslucent40', this._themeVariant.palette.whiteTranslucent40);
    style.setProperty('--tw-fui-yellow', this._themeVariant.palette.yellow);
    style.setProperty('--tw-fui-yellowLight', this._themeVariant.palette.yellowLight);
    style.setProperty('--tw-fui-orange', this._themeVariant.palette.orange);
    style.setProperty('--tw-fui-orangeLight', this._themeVariant.palette.orangeLight);
    style.setProperty('--tw-fui-orangeLighter', this._themeVariant.palette.orangeLighter);
    style.setProperty('--tw-fui-redDark', this._themeVariant.palette.redDark);
    style.setProperty('--tw-fui-red', this._themeVariant.palette.red);
    style.setProperty('--tw-fui-magentaDark', this._themeVariant.palette.magentaDark);
    style.setProperty('--tw-fui-magenta', this._themeVariant.palette.magenta);
    style.setProperty('--tw-fui-magentaLight', this._themeVariant.palette.magentaLight);
    style.setProperty('--tw-fui-purpleDark', this._themeVariant.palette.purpleDark);
    style.setProperty('--tw-fui-purple', this._themeVariant.palette.purple);
    style.setProperty('--tw-fui-purpleLight', this._themeVariant.palette.purpleLight);
    style.setProperty('--tw-fui-blueDark', this._themeVariant.palette.blueDark);
    style.setProperty('--tw-fui-blueMid', this._themeVariant.palette.blueMid);
    style.setProperty('--tw-fui-blue', this._themeVariant.palette.blue);
    style.setProperty('--tw-fui-blueLight', this._themeVariant.palette.blueLight);
    style.setProperty('--tw-fui-tealDark', this._themeVariant.palette.tealDark);
    style.setProperty('--tw-fui-teal', this._themeVariant.palette.teal);
    style.setProperty('--tw-fui-tealLight', this._themeVariant.palette.tealLight);
    style.setProperty('--tw-fui-greenDark', this._themeVariant.palette.greenDark);
    style.setProperty('--tw-fui-green', this._themeVariant.palette.green);
    style.setProperty('--tw-fui-greenLight', this._themeVariant.palette.greenLight);

    style.setProperty('--tw-fui-bodyBackground', this._themeVariant.semanticColors.bodyBackground);
    style.setProperty('--tw-fui-bodyStandoutBackground', this._themeVariant.semanticColors.bodyStandoutBackground);
    style.setProperty('--tw-fui-bodyFrameBackground', this._themeVariant.semanticColors.bodyFrameBackground);
    style.setProperty('--tw-fui-bodyFrameDivider', this._themeVariant.semanticColors.bodyFrameDivider);
    style.setProperty('--tw-fui-bodyText', this._themeVariant.semanticColors.bodyText);
    style.setProperty('--tw-fui-bodyTextChecked', this._themeVariant.semanticColors.bodyTextChecked);
    style.setProperty('--tw-fui-bodySubtext', this._themeVariant.semanticColors.bodySubtext);
    style.setProperty('--tw-fui-bodyDivider', this._themeVariant.semanticColors.bodyDivider);
    style.setProperty('--tw-fui-disabledBackground', this._themeVariant.semanticColors.disabledBackground);
    style.setProperty('--tw-fui-disabledText', this._themeVariant.semanticColors.disabledText);
    style.setProperty('--tw-fui-disabledSubtext', this._themeVariant.semanticColors.disabledSubtext);
    style.setProperty('--tw-fui-disabledBodyText', this._themeVariant.semanticColors.disabledBodyText);
    style.setProperty('--tw-fui-disabledBodySubtext', this._themeVariant.semanticColors.disabledBodySubtext);
    style.setProperty('--tw-fui-focusBorder', this._themeVariant.semanticColors.focusBorder);
    style.setProperty('--tw-fui-variantBorder', this._themeVariant.semanticColors.variantBorder);
    style.setProperty('--tw-fui-variantBorderHovered', this._themeVariant.semanticColors.variantBorderHovered);
    style.setProperty('--tw-fui-defaultStateBackground', this._themeVariant.semanticColors.defaultStateBackground);
    style.setProperty('--tw-fui-errorText', this._themeVariant.semanticColors.errorText);
    style.setProperty('--tw-fui-warningText', this._themeVariant.semanticColors.warningText);
    style.setProperty('--tw-fui-errorBackground', this._themeVariant.semanticColors.errorBackground);
    style.setProperty('--tw-fui-blockingBackground', this._themeVariant.semanticColors.blockingBackground);
    style.setProperty('--tw-fui-warningBackground', this._themeVariant.semanticColors.warningBackground);
    style.setProperty('--tw-fui-warningHighlight', this._themeVariant.semanticColors.warningHighlight);
    style.setProperty('--tw-fui-successBackground', this._themeVariant.semanticColors.successBackground);
    style.setProperty('--tw-fui-inputBorder', this._themeVariant.semanticColors.inputBorder);
    style.setProperty('--tw-fui-inputBorderHovered', this._themeVariant.semanticColors.inputBorderHovered);
    style.setProperty('--tw-fui-inputBackground', this._themeVariant.semanticColors.inputBackground);
    style.setProperty('--tw-fui-inputBackgroundChecked', this._themeVariant.semanticColors.inputBackgroundChecked);
    style.setProperty('--tw-fui-inputBackgroundCheckedHovered', this._themeVariant.semanticColors.inputBackgroundCheckedHovered);
    style.setProperty('--tw-fui-inputForegroundChecked', this._themeVariant.semanticColors.inputForegroundChecked);
    style.setProperty('--tw-fui-inputFocusBorderAlt', this._themeVariant.semanticColors.inputFocusBorderAlt);
    style.setProperty('--tw-fui-smallInputBorder', this._themeVariant.semanticColors.smallInputBorder);
    style.setProperty('--tw-fui-inputText', this._themeVariant.semanticColors.inputText);
    style.setProperty('--tw-fui-inputTextHovered', this._themeVariant.semanticColors.inputTextHovered);
    style.setProperty('--tw-fui-inputPlaceholderText', this._themeVariant.semanticColors.inputPlaceholderText);
    style.setProperty('--tw-fui-buttonBackground', this._themeVariant.semanticColors.buttonBackground);
    style.setProperty('--tw-fui-buttonBackgroundChecked', this._themeVariant.semanticColors.buttonBackgroundChecked);
    style.setProperty('--tw-fui-buttonBackgroundHovered', this._themeVariant.semanticColors.buttonBackgroundHovered);
    style.setProperty('--tw-fui-buttonBackgroundCheckedHovered', this._themeVariant.semanticColors.buttonBackgroundCheckedHovered);
    style.setProperty('--tw-fui-buttonBackgroundPressed', this._themeVariant.semanticColors.buttonBackgroundPressed);
    style.setProperty('--tw-fui-buttonBackgroundDisabled', this._themeVariant.semanticColors.buttonBackgroundDisabled);
    style.setProperty('--tw-fui-buttonBorder', this._themeVariant.semanticColors.buttonBorder);
    style.setProperty('--tw-fui-buttonText', this._themeVariant.semanticColors.buttonText);
    style.setProperty('--tw-fui-buttonTextHovered', this._themeVariant.semanticColors.buttonTextHovered);
    style.setProperty('--tw-fui-buttonTextChecked', this._themeVariant.semanticColors.buttonTextChecked);
    style.setProperty('--tw-fui-buttonTextCheckedHovered', this._themeVariant.semanticColors.buttonTextCheckedHovered);
    style.setProperty('--tw-fui-buttonTextPressed', this._themeVariant.semanticColors.buttonTextPressed);
    style.setProperty('--tw-fui-buttonTextDisabled', this._themeVariant.semanticColors.buttonTextDisabled);
    style.setProperty('--tw-fui-buttonBorderDisabled', this._themeVariant.semanticColors.buttonBorderDisabled);
    style.setProperty('--tw-fui-primaryButtonBackground', this._themeVariant.semanticColors.primaryButtonBackground);
    style.setProperty('--tw-fui-primaryButtonBackgroundHovered', this._themeVariant.semanticColors.primaryButtonBackgroundHovered);
    style.setProperty('--tw-fui-primaryButtonBackgroundPressed', this._themeVariant.semanticColors.primaryButtonBackgroundPressed);
    style.setProperty('--tw-fui-primaryButtonBackgroundDisabled', this._themeVariant.semanticColors.primaryButtonBackgroundDisabled);
    style.setProperty('--tw-fui-primaryButtonBorder', this._themeVariant.semanticColors.primaryButtonBorder);
    style.setProperty('--tw-fui-primaryButtonText', this._themeVariant.semanticColors.primaryButtonText);
    style.setProperty('--tw-fui-primaryButtonTextHovered', this._themeVariant.semanticColors.primaryButtonTextHovered);
    style.setProperty('--tw-fui-primaryButtonTextPressed', this._themeVariant.semanticColors.primaryButtonTextPressed);
    style.setProperty('--tw-fui-primaryButtonTextDisabled', this._themeVariant.semanticColors.primaryButtonTextDisabled);
    style.setProperty('--tw-fui-accentButtonBackground', this._themeVariant.semanticColors.accentButtonBackground);
    style.setProperty('--tw-fui-accentButtonText', this._themeVariant.semanticColors.accentButtonText);
    style.setProperty('--tw-fui-menuBackground', this._themeVariant.semanticColors.menuBackground);
    style.setProperty('--tw-fui-menuDivider', this._themeVariant.semanticColors.menuDivider);
    style.setProperty('--tw-fui-menuIcon', this._themeVariant.semanticColors.menuIcon);
    style.setProperty('--tw-fui-menuHeader', this._themeVariant.semanticColors.menuHeader);
    style.setProperty('--tw-fui-menuItemBackgroundHovered', this._themeVariant.semanticColors.menuItemBackgroundHovered);
    style.setProperty('--tw-fui-menuItemBackgroundPressed', this._themeVariant.semanticColors.menuItemBackgroundPressed);
    style.setProperty('--tw-fui-menuItemText', this._themeVariant.semanticColors.menuItemText);
    style.setProperty('--tw-fui-menuItemTextHovered', this._themeVariant.semanticColors.menuItemTextHovered);
    style.setProperty('--tw-fui-listBackground', this._themeVariant.semanticColors.listBackground);
    style.setProperty('--tw-fui-listText', this._themeVariant.semanticColors.listText);
    style.setProperty('--tw-fui-listItemBackgroundHovered', this._themeVariant.semanticColors.listItemBackgroundHovered);
    style.setProperty('--tw-fui-listItemBackgroundChecked', this._themeVariant.semanticColors.listItemBackgroundChecked);
    style.setProperty('--tw-fui-listItemBackgroundCheckedHovered', this._themeVariant.semanticColors.listItemBackgroundCheckedHovered);
    style.setProperty('--tw-fui-listHeaderBackgroundHovered', this._themeVariant.semanticColors.listHeaderBackgroundHovered);
    style.setProperty('--tw-fui-listHeaderBackgroundPressed', this._themeVariant.semanticColors.listHeaderBackgroundPressed);
    style.setProperty('--tw-fui-actionLink', this._themeVariant.semanticColors.actionLink);
    style.setProperty('--tw-fui-actionLinkHovered', this._themeVariant.semanticColors.actionLinkHovered);
    style.setProperty('--tw-fui-link', this._themeVariant.semanticColors.link);
    style.setProperty('--tw-fui-linkHovered', this._themeVariant.semanticColors.linkHovered);
    style.setProperty('--tw-fui-listTextColor', this._themeVariant.semanticColors.listTextColor);
    style.setProperty('--tw-fui-menuItemBackgroundChecked', this._themeVariant.semanticColors.menuItemBackgroundChecked);

  }

  public render(): void {
    const element: React.ReactElement<IHelloTailwindCssProps> = React.createElement(
      HelloTailwindCss,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
