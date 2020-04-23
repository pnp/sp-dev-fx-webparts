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

    // Create a style element
    const styleElem: JSX.Element = <style type="text/css">{css}</style>;

    // If we're not in Edit mode, hide this web part
    if (displayMode !== DisplayMode.Edit) {
      return styleElem;
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
        {styleElem}
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
