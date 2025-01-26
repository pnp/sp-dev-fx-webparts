import * as React from 'react';
import styles from './ReactUseReducerHookBasic.module.scss';
import { IReactUseReducerHookBasicProps } from './IReactUseReducerHookBasicProps';
import {
  Spinner,
  SpinnerSize,
  Text,
  Stack,
  List,
  MessageBar,
  MessageBarType,
} from '@fluentui/react';
import { spfi, SPFx } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { initialState, listReducer } from '../reducers/listReducer';
import { ActionTypes } from '../reducers/actionTypes';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { Logger, LogLevel } from '@pnp/logging';
import * as strings from 'ReactUseReducerHookBasicWebPartStrings';

// Define the type for a SharePoint list item
interface IListItem {
  Id: number;
  Title: string;
}

const ReactUseReducerHookBasic: React.FC<IReactUseReducerHookBasicProps> = (props) => {
  const { context, hasTeamsContext, siteUrl, listName, isConfigured, onConfigure } = props;
  const [state, dispatch] = React.useReducer(listReducer, initialState);

  React.useEffect(() => {
    console.log('ReactUseReducerHookBasic: useEffect');
    
    if (!isConfigured) return;

    const loadItems = async () => {
      dispatch({ type: ActionTypes.FETCH_START });

      try {
        const sp = spfi(siteUrl).using(SPFx(context));
        const items: IListItem[] = await sp.web.lists
          .getByTitle(listName)
          .items.select('Id', 'Title')();
        dispatch({ type: ActionTypes.FETCH_SUCCESS, payload: items });
      } catch (error: any) {
        Logger.write(`Error fetching items: ${error.message}`, LogLevel.Error);
        dispatch({ type: ActionTypes.FETCH_ERROR, payload: strings.FetchListItemsErrorMessage });
      }
    };

    loadItems();
  }, [isConfigured, context, siteUrl, listName]);

  // Memoize the onRenderCell function to prevent unnecessary re-renders
  const onRenderCell = React.useCallback(
    (item: IListItem): JSX.Element => (
      <div key={item.Id} className={styles.listItem}>
        <Text variant="medium">{item.Title}</Text>
      </div>
    ),
    []
  );

  // Render content based on the current state
  const renderContent = () => {
    if (state.loading) {
      return <div className={styles.loading}>
        <Spinner label="Loading..." size={SpinnerSize.medium} />
      </div>;
    }

    if (state.error) {
      return (
        <MessageBar messageBarType={MessageBarType.error} isMultiline={false}>
          {state.error}
        </MessageBar>
      );
    }

    if (state.items && state.items.length > 0) {
      return (
        <List
          items={state.items}
          onRenderCell={onRenderCell}
        />
      );
    }

    return <MessageBar messageBarType={MessageBarType.info}>No items found.</MessageBar>;
  };

  // If not configured, show the placeholder
  if (!isConfigured) {
    return (
      <Placeholder
        iconName="Edit"
        iconText="List view web part configuration"
        description="Please configure the web part before you can show the list view."
        buttonLabel="Configure"
        onConfigure={onConfigure}
      />
    );
  }

  return (
    <section className={`${styles.reactUseReducerHookBasic} ${hasTeamsContext ? styles.teams : ''}`}>
      <Stack tokens={{ childrenGap: 20 }} className={styles.welcome}>
        <Text variant="xLarge">React useReducer hooks</Text>
        <Text variant="medium">
          {strings.WebPartDescription}
        </Text>
        {renderContent()}
      </Stack>
    </section>
  );
}

export default ReactUseReducerHookBasic;
