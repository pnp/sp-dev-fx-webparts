import * as React from 'react';
import styles from './FlowButton.module.scss';
import {
  ActionButton,
  FontIcon,
  MessageBar,
  MessageBarType,
  Text
} from 'office-ui-fabric-react';
import { WebPartTitle } from '@pnp/spfx-controls-react';
import * as strings from 'FlowButtonWebPartStrings';

import { IFlowButtonProps } from './IFlowButtonProps';
import { IFlowButtonState } from './IFlowButtonState';

export const FlowButton = ({
  flowService,
  graphService,
  displayMode,
  environments,
  title,
  setTitle
}: IFlowButtonProps) => {

  const [states, setStates] = React.useState<IFlowButtonState[]>([]);

  const onButtonClick = React.useCallback((state: IFlowButtonState) => {
    window.open(`https://flow.microsoft.com/manage/environments/${state.environment}/flows/${state.id}/run`, '_blank');
  }, []);

  React.useEffect(() => {
    if (!flowService) return;
    if (!graphService) return;
    if (!environments.length) return;
    (async () => {
      for (const environment of environments) {
        const flows = await flowService.getFlows(environment);
        await Promise.all(flows.map(async (item) => {
          const flow = await flowService.getFlow(item.id);
          const author = await graphService.getUser(flow.properties.creator.objectId);
          if (flow.properties.flowTriggerUri) {
            setStates((values) => [
              ...values,
              {
                environment: flow.properties.environment.name,
                id: flow.name,
                title: flow.properties.displayName,
                author: author.displayName
              }]);
          }
        }));
      }
    })();
  }, [
    flowService,
    graphService,
    environments
  ]);

  return (
    <div className={styles.root}>
      {
        environments.length
          ? (
            <React.Fragment>
              <WebPartTitle
                displayMode={displayMode}
                title={title}
                updateProperty={setTitle} />
              <div className={styles.buttons}>
                {
                  states.map((state) => (
                    <ActionButton
                      className={styles.button}
                      onClick={() => onButtonClick(state)}>
                      <div className={styles.content}>
                        <FontIcon
                          className={styles.icon}
                          iconName='Touch' />
                        <Text className={styles.title}>{state.title}</Text>
                        <Text className={styles.author}>{state.author}</Text>
                      </div>
                    </ActionButton>
                  ))
                }
              </div>
            </React.Fragment>
          )
          : (
            <MessageBar messageBarType={MessageBarType.error}>
              {strings.EnvironmentEmptyError}
            </MessageBar>
          )
      }
    </div>
  );

};

export default FlowButton;
