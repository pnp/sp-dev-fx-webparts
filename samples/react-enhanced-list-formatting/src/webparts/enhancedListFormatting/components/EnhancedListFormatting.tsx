import * as React from 'react';
import styles from './EnhancedListFormatting.module.scss';
import * as strings from 'EnhancedListFormattingWebPartStrings';
import { IEnhancedListFormattingProps } from './IEnhancedListFormattingProps';
import { MessageBarButton, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { DisplayMode } from '@microsoft/sp-core-library';

export default class EnhancedListFormatting extends React.Component<IEnhancedListFormattingProps, {}> {
  public render(): React.ReactElement<IEnhancedListFormattingProps> {
    const { css, displayMode, acceptedDisclaimer } = this.props;

     // If we accepted the disclaimer, let's work as expected

    // Determine if there is a CSS value
    const hasCSS: boolean = css !== undefined && css !== "";

    // Create a unique ID for this web part to prevent styles clobbering each other
    const elemId: string = `styles_${this.props.context.instanceId}`;

    // Find if there is an existing Style element
    let styleElem: HTMLStyleElement = document.getElementById(elemId) as HTMLStyleElement;

    // If there is no style and we need to insert custom CSS, create a style element
    if (!styleElem) {
      if (hasCSS) {
        // Find the page head
        const head: any = document.getElementsByTagName("head")[0] || document.documentElement;

        // Create a style element
        styleElem = document.createElement("style");

        // Give it our unique ID
        styleElem.id = `styles_${this.props.context.instanceId}`;

        // Set the CSS
        styleElem.textContent = css;

        // Make sure we clearly indicate that this is CSS
        styleElem.type = "text/css";

        // Insert it as the last element in the header
        head.insertAdjacentElement("beforeEnd", styleElem);
      }
    } else {
      // We already have a style element

      // Do we have custom CSS?
      if (hasCSS) {
        // Set the CSS
        styleElem.textContent = css;
      } else {
        // Clear our style element. It'll get removed on our next refresh
        styleElem.textContent = "";
      }
    }

    // If we're not in Edit mode, hide this web part
    if (displayMode !== DisplayMode.Edit) {
      return null;
    }

    // if we didn't accept the disclaimer, show a disclaimer and nothing else
    if (acceptedDisclaimer !== true) {
      return (<MessageBar
        onDismiss={()=>this._onAcceptDisclaimer()}
        dismissButtonAriaLabel={strings.DismissDisclaimerAriaLabel}
        messageBarType={MessageBarType.warning}
        actions={
          <div>
            <MessageBarButton onClick={()=>this._onAcceptDisclaimer()}>{strings.AcceptDisclaimerButton}</MessageBarButton>
          </div>
        }
      >
        <div className={styles.disclaimerText} dangerouslySetInnerHTML={{__html: strings.DisclaimerText}}></div>
      </MessageBar>);
    }



    return (
      <div className={styles.enhancedListFormatting}>
        <MessageBar
          messageBarType={hasCSS ? MessageBarType.success : null}
          isMultiline={false}
          actions={
            <div>
              <MessageBarButton onClick={() => this._onConfigure()}>{hasCSS ? strings.PlaceholderButtonTitleHasStyles : strings.PlaceholderButtonTitleNoStyles}</MessageBarButton>
            </div>
          }
        >
          {hasCSS ? strings.PlaceholderDescriptionHasStyles : strings.PlaceholderDescriptionNoStyles}
        </MessageBar>
      </div>
    );
  }

  private _onAcceptDisclaimer() {
    this.props.onAcceptDisclaimer();
  }

  private _onConfigure() {
    this.props.context.propertyPane.open();
  }
}
