import * as React from 'react';
import { IAdaptiveCardHostDemoProps } from './IAdaptiveCardHostDemoProps';
import { AllSamples } from '../../../samples';
import { AdaptiveCardHost, IAdaptiveCardHostActionResult, AdaptiveCardHostThemeType } from "@pnp/spfx-controls-react/lib/AdaptiveCardHost";
import { Action, CardElement, CardObjectRegistry, HostCapabilities } from 'adaptivecards';

export default class AdaptiveCardHostDemo extends React.Component<IAdaptiveCardHostDemoProps, {}> {
  public render(): React.ReactElement<IAdaptiveCardHostDemoProps> {
    let sample = AllSamples().filter(x => x.title === this.props.sample)[0];
    let sampleData = { "$root": sample.data };

    let themeType: AdaptiveCardHostThemeType;
    switch (this.props.themeName) {
      case "sp": themeType = AdaptiveCardHostThemeType.SharePoint;
        break;
      case "default": themeType = AdaptiveCardHostThemeType.Teams;
        break;
      case "dark": themeType = AdaptiveCardHostThemeType.TeamsDark;
        break;
      case "contrast": themeType = AdaptiveCardHostThemeType.TeamsHighContrast;
        break;
    }

    return (
      <AdaptiveCardHost
        card={sample.template}
        data={sampleData}
        style={null}
        className={null}
        theme={this.props.theme}
        themeType={themeType}
        hostConfig={null}
        onInvokeAction={(action: IAdaptiveCardHostActionResult) => alert(JSON.stringify(action))}
        onError={(error) => alert(error.message)}
        onSetCustomElements={(registry: CardObjectRegistry<CardElement>) => { }}
        onSetCustomActions={(registry: CardObjectRegistry<Action>) => { }}
        onUpdateHostCapabilities={(hostCapabilities: HostCapabilities) => {
          hostCapabilities.setCustomProperty("__customProperty", Date.now);
        }}
        isUniqueControlInPage={true}
      />
    );
  }
}
