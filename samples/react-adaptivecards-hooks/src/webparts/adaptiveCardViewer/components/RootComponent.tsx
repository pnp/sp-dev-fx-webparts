import * as React from 'react';

import { ThemeProvider, ThemeChangedEventArgs } from '@microsoft/sp-component-base';

import { AppContext, IAppContextProps } from '../../../services/AppContext';
import { useCardService } from '../../../services/CardService/CardService';
import { useSPListDataService } from '../../../services/SPListDataService/SPListDataService';

import { IAdaptiveCardViewerProps } from './IAdaptiveCardViewerProps';
import { AdaptiveCardViewer } from './AdaptiveCardViewer';
import * as AdaptiveCardViewerState from './IAdaptiveCardViewerState';

/**
 *   This component manages state
 */
export const RootComponent: React.FunctionComponent<IAdaptiveCardViewerProps> = (props) => {
  console.log("RootComponent");

  const { cardServiceState, getAdaptiveCardJSON, getDataJSON } = useCardService(props.spContext);
  const { listServiceState, getListItems } = useSPListDataService(props.spContext);

  // local state to trigger http calls
  const [templateUrl, setTemplateUrl] = React.useState<string>(undefined);
  const [dataUrl, setDataUrl] = React.useState<string>(undefined);

  const initialViewerState: AdaptiveCardViewerState.IAdaptiveCardViewerState = {
    themeVariant: null,
    templateJSON: props.template,
    dataJSON: props.data,
    useTemplating: props.useTemplating,
    isLoading: false
  };


  // reducer to manage state for this and children
  const [viewerState, viewerStateDispatch] = React.useReducer(AdaptiveCardViewerState.reducer, initialViewerState);

  //
  // useEffect => componentDidMount
  //
  React.useEffect(() => {
    console.log("RootComponent.useEffect[]");

    // Register a handler to be notified if the theme variant changes
    const _handleThemeChangedEvent = (args: ThemeChangedEventArgs) => {
      viewerStateDispatch({ type: "theme", payload: args.theme });
    };

    // If it exists, get the theme variant
    const _themeProvider = props.spContext.serviceScope.consume(ThemeProvider.serviceKey);
    const _themeVariant = _themeProvider.tryGetTheme();
    viewerStateDispatch({ type: "theme", payload: _themeVariant });

    _themeProvider.themeChangedEvent.add(props.spEventObserver, _handleThemeChangedEvent);

    return () => {
      // Cleanup => componentWillUnmount
      _themeProvider.themeChangedEvent.remove(props.spEventObserver, _handleThemeChangedEvent);
    };
  }, []);

  React.useEffect(() => {
    console.log("RootComponent.useEffect[props]");

    /*
    * (The web part class does not have state. Values set in property pane are passed as props.
    *  On each reload, inspect the props and initialize state accordingly.)
    */
    if (props.templateSource === "json") {
      viewerStateDispatch({type: "template", payload: props.template});
    }

    if (props.templateSource === "url" && props.templateUrl) {
      setTemplateUrl(props.templateUrl);
    }

    if (props.dataSource === "list" && props.list) {
      getListItems(props.list, props.view);
    }

    if (props.dataSource === "url" && props.dataUrl) {
      setDataUrl(props.dataUrl);
    }

    if (props.dataSource === "json" && props.data) {
      viewerStateDispatch({type: "data", payload: props.data});
    }

  }, [props]);

  React.useEffect(() => {
    console.log(`RootComponent.useEffect[cardServiceState] - type: ${cardServiceState.type}`);

    if (cardServiceState.type === "status") {
      viewerStateDispatch({ type: "status", ...cardServiceState});
    }

    if (cardServiceState.type === "complete") {
      if (cardServiceState.dataType === "template") {
        viewerStateDispatch({ type: "template", payload: cardServiceState.data });
      }
      if (cardServiceState.dataType === "data") {
        viewerStateDispatch({ type: "data", payload: cardServiceState.data });
      }
    }
  }, [cardServiceState]);

  React.useEffect(() => {
    console.log("RootComponent.useEffect[templateUrl]");
    if (templateUrl) {
      getAdaptiveCardJSON(templateUrl);
    }
  }, [templateUrl]);

  React.useEffect(() => {
    console.log("RootComponent.useEffect[dataUrl]");
    if (dataUrl) {
      getDataJSON(dataUrl);
    }
  }, [dataUrl]);

  React.useEffect(() => {
    console.log(`RootComponent.useEffect[listServiceState] - type: ${listServiceState.type}`);

    if (listServiceState.type === "status") {
      viewerStateDispatch({ type: "status", ...listServiceState });
    }

    if (listServiceState.type === "complete") {
      if (listServiceState.dataType === "template") {
        viewerStateDispatch({ type: "template", payload: listServiceState.data });
      }
      if (listServiceState.dataType === "data") {
        viewerStateDispatch({ type: "data", payload: listServiceState.data });
      }
    }

  }, [listServiceState]);

  return (
    <AppContext.Provider value={
      {
        spContext: props.spContext,
        spEventObserver: props.spEventObserver,
        acViewerState: viewerState,
        acViewerStateDispatch: viewerStateDispatch
      }
    }>
      <AdaptiveCardViewer />
    </AppContext.Provider>
  );
};

