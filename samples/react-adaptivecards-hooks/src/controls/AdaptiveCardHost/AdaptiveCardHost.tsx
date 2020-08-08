import * as React from 'react';

import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { MessageBar, MessageBarType, MessageBarButton } from 'office-ui-fabric-react';

import { IAdaptiveCardHostProps } from './IAdaptiveCardHostProps';
import { AppContext } from '../../services/AppContext';
import { AdaptiveCard } from '../AdaptiveCard/AdaptiveCard';
import { IAdaptiveCardActionResult } from '../AdaptiveCard/IAdaptiveCardActionResult';
import * as strings from 'AdaptiveCardViewerWebPartStrings';

export const AdaptiveCardHost: React.FunctionComponent<IAdaptiveCardHostProps> = (props) => {

  const { spContext } = React.useContext(AppContext);


  /**
   * Demonstrates how we can respond to actions
  */
  const _executeActionHandler = (action: IAdaptiveCardActionResult) => {
    console.log("Action", action);

    // Feel free to handle actions any way you want
    switch (action.type) {
      case "Action.OpenUrl":
        window.open(action.url);
        break;
      case "Action.Submit":
        alert(action.title);
        break;
      default:
        break;
    }
  };

  /** Opens the configuration pane */
  const _configureHandler = () => {
    spContext.propertyPane.open();
  };


  const { themeVariant, template, data, useTemplating } = props;

  // if we didn't specify a template, we need a template!
  const needsTemplate: boolean = !template;

  // If we use Adaptive Card Templating and didn't specify data, we need data!
  const needsData: boolean = useTemplating && !data;

  // If we didn't use Adaptive Card Templating but the template contains $data nodes,
  // if means it is a data-enabled template
  const dataEnabledTemplate: boolean = template && template.indexOf('"$data"') > -1;

  // If we didn't specify the template, show the placeholder
  if (needsTemplate) {
    return (
      <Placeholder iconName='Code'
        iconText={strings.PlaceholderIconText}
        description={strings.PlaceholderDescription}
        buttonLabel='Configure'
        onConfigure={_configureHandler} />
    );
  } else if (needsData) {
    // If we didn't specify data and we need it, display a different placeholder
    return (
      <Placeholder iconName='PageData'
        iconText={strings.DataNeededIconText}
        description={strings.DataNeededDescription}
        buttonLabel={strings.DataNeededButtonLabel}
        onConfigure={_configureHandler} />
    );
  }
  else {
    // Display the Adaptive Card
    return (
      <>
        {dataEnabledTemplate && !useTemplating && <MessageBar
          dismissButtonAriaLabel="Close"
          messageBarType={MessageBarType.warning}
          actions={
            <div>
              <MessageBarButton onClick={_configureHandler}>{strings.ConfigureButtonLabel}</MessageBarButton>
            </div>
          }
        >
          {strings.AdaptiveTemplatingWarningIntro}<a href={strings.AdaptiveCardTemplatingMoreInfoLinkUrl} target='_blank'>{strings.AdaptiveCardTemplating}</a>{strings.AdaptiveCardWarningPartTwo}<strong>{strings.UseAdaptiveTemplatingLabel}</strong>{strings.AdaptiveTemplatingEnd}
        </MessageBar>
        }
        <AdaptiveCard
          template={template}
          data={data}
          useTemplating={useTemplating}
          themeVariant={themeVariant}
          onExecuteAction={_executeActionHandler}
          className="tbd"
      /></>
    );
  }
};
