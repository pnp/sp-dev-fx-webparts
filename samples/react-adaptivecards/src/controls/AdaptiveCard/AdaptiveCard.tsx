import * as React from 'react';
import { IAdaptiveCardProps } from './IAdaptiveCardProps';

import * as AC from "adaptivecards";
import * as ACData from "adaptivecards-templating";
import * as ACFluentUI from "adaptivecards-fluentui";

// Support for theme and section color
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IValidationError } from './IValidationError';
import { IAdaptiveCardActionResult } from './IAdaptiveCardActionResult';

// Support for markdown
import * as markdownit from "markdown-it";


import { IAdaptiveCardState } from '.';

// Localization
import * as strings from 'AdaptiveCardHostWebPartStrings';

/**
 * Displays an Adaptive Card
 * Supports templating and markdown syntax
 * Also adapts to changing environment colors
 */
export class AdaptiveCard extends React.Component<IAdaptiveCardProps, IAdaptiveCardState> {
  // The rendering container
  private _acContainer: HTMLDivElement;

  constructor(props: IAdaptiveCardProps) {
    super(props);

    this.state = {
      errors: []
    };
  }
  public componentDidMount(): void {
    this._renderAdaptiveCard();
  }

  public componentDidUpdate(_prevProps: IAdaptiveCardProps, _prevState: {}): void {
    if (_prevProps != this.props) {
      // Pretty much any changes will result in a redraw.
      this._renderAdaptiveCard();
    }
  }

  public render(): React.ReactElement<IAdaptiveCardProps> {
    const hasErrorHander: boolean = (this.state.errors && this.state.errors.length > 0 && this.props.errorTemplate) ? true : false;
    return <>
      { hasErrorHander && typeof this.props.errorTemplate === "function" && this.props.errorTemplate(this.state.errors) }
      { hasErrorHander && this.props.errorTemplate && typeof this.props.errorTemplate !== "function" && this.props.errorTemplate }
      <div className={this.props.className} ref={(elm) => { this._acContainer = elm; }}></div>
    </>;
  }

  private _renderAdaptiveCard() {
    // There is nothing to render if we don't have a template (or nothing to render to)
    if (!this.props.template || !this._acContainer) {
      return;
    }

    let errors: Array<IValidationError> = [];
    let card: any;

    if (this.props.data && this.props.useTemplating) {
      // Define a template payload
      var templatePayload = {};
      try {
        templatePayload = JSON.parse(this.props.template);
      } catch (error) {
        console.error("Something went wrong with the template", error);
        this._errorHandler([strings.TemplatingJsonError + error]);
        return;
      }

      // Create a Template instance from the template payload
      var template = new ACData.Template(templatePayload);

      var context: any = {
        "$root": {}
      };

      try {
        context.$root = JSON.parse(this.props.data);
      } catch (error) {
        console.error("Error parsing the data JSON", error);
        this._errorHandler([strings.DataJsonError + error]);
        return;
      }

      try {
        // Expand the card by combining the template and data
        card = template.expand(context);
      } catch (error) {
        console.error("Error combining template and data", error);
        this._errorHandler([strings.DataJsonError + error]);
        return;
      }
    } else {
      try {
        card = JSON.parse(this.props.template);
      } catch (error) {
        console.error("Error parsing template", error);
        this._errorHandler([strings.TemplateJsonError + error]);
        return;
      }
    }

    // Create an AdaptiveCard instance
    const adaptiveCard: AC.AdaptiveCard = new AC.AdaptiveCard();

    // Use Fabric controls when rendering Adaptive Cards
    ACFluentUI.useFluentUI();

    // Get the semantic colors to adapt to changing section colors
    this._adjustThemeColors(adaptiveCard);

    // Handle parsing markdown from HTML
    AC.AdaptiveCard.onProcessMarkdown = this._processMarkdownHandler;

    // Set the adaptive card's event handlers. onExecuteAction is invoked
    // whenever an action is clicked in the card
    adaptiveCard.onExecuteAction = this._executeActionHandler;

    let serializationContext = new AC.SerializationContext();

    serializationContext.onParseElement = (element: AC.CardElement, _source: any, _sercontext: AC.SerializationContext) => {
      let violations: Array<string> = [];

      if (_sercontext.eventCount > 0) {

        for (let errorIndex = 0; errorIndex < _sercontext.eventCount; errorIndex++) {
          const errorItem: AC.IValidationEvent = _sercontext.getEventAt(errorIndex);
          violations.push(errorItem.message);
        }

        if (this.props.onParseError) {
          this.props.onParseError(violations);
        }
      }

      this.setState({
        errors: violations
      });
    };

    // Parse the card payload
    adaptiveCard.parse(card, serializationContext);

    // Empty the div so we can replace it
    while (this._acContainer.firstChild) {
      this._acContainer.removeChild(this._acContainer.lastChild);
    }

    // Render the card to an HTML element:
    adaptiveCard.render(this._acContainer);
  }

  private _executeActionHandler = (action) => {
    const actionType: string = action.getJsonTypeName();
    let url: string = action.getHref();

    // Some Adaptive Cards templates wrap their Action.OpenUrl url parameter between parentheses.
    // strip them.
    // Maybe it means to open in a new window or something, but I can't find any reference to that in the specs.
    if (url) {
      // Only strip if the whole URL is wrapped with parentheses.
      if (url.charAt(0) === '(' && url.charAt(url.length - 1) === ')') {
        url = url.substr(1);
        url = url.substr(0, url.length - 1);
      }
    }

    const actionResult: IAdaptiveCardActionResult = {
      type: actionType,
      title: action.title,
      url: url,
      data: action.data
    };

    this.props.onExecuteAction(actionResult);
  }

  private _processMarkdownHandler = (md: string, result: any) => {
    // Don't stop parsing if there is invalid Markdown -- there's a lot of that in sample Adaptive Cards templates
    try {
      result.outputHtml = new markdownit().render(md);
      result.didProcess = true;
    } catch (error) {
      console.error('Error parsing Markdown', error);
      result.didProcess = false;
    }

  }

  /**
   * Adjust Adaptive Card colors based on theme colors
   * @param adaptiveCard the Adaptive Cards for which you want to adjust the theme colors
   */
  private _adjustThemeColors(adaptiveCard: AC.AdaptiveCard) {
    // Get the theme colors from the props -- if any
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

    // If there are theme colors, change the configuration to use these colors
    if (semanticColors) {
      // Set the hostConfig property unless you want to use the default Host Config
      // Host Config defines the style and behavior of a card

      // I mapped as many theme colors as I could. Feel free to adjust the colours
      adaptiveCard.hostConfig = new AC.HostConfig({
        "separator": {
          "lineThickness": 1,
          "lineColor": semanticColors.bodyFrameDivider
        },
        "containerStyles": {
          "default": {
            "backgroundColor": semanticColors.bodyBackground,
            "foregroundColors": {
              "default": {
                "default": semanticColors.bodyText,
                "subtle": semanticColors.bodyTextChecked
              },
              "attention": {
                "default": semanticColors.errorText
              },
              "good": {
                "default": semanticColors['successText'] // for some reason, successText doesn't show up
              },
              "warning": {
                "default": semanticColors.warningText
              },
              "accent": {
                "default": semanticColors.accentButtonBackground
              }
            }
          }
        }
      });
    }
  }

  private _errorHandler(errors: string[]) {
    if (this.props.onParseError && errors.length > 0) {
      this.props.onParseError(errors);
    }
    this.setState({
      errors: errors
    });
  }
}
