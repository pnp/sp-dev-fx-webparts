import * as React from 'react';
import { HttpClient, HttpClientConfiguration, HttpClientResponse } from '@microsoft/sp-http';
import { cardServiceReducer, ICardServiceState } from './CardServiceReducer';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export const useCardService = (spContext: WebPartContext) => {
  const initialState: ICardServiceState = { type: 'status', isLoading: false, isError: false };

  const [cardServiceState, dispatch] = React.useReducer(cardServiceReducer, initialState);

  // make the call
  const fetchData = async (url: string, dataType: 'template'|'data') => {
    if (!url) {
      return;
    }

    spContext.httpClient.get(url, HttpClient.configurations.v1)
      .then((response: HttpClientResponse) => {
        if (response.ok) {
          response.json()
            .then((data: any) => {
              if (dataType === 'template') {
                dispatch({ type: 'success_template', results: { template: JSON.stringify(data) } });
              }
              if (dataType === 'data') {
                dispatch({ type: 'success_data', results: { data: JSON.stringify(data) } });
              }
            });
        }
      })
      .catch((error: any) => {
        dispatch({ type: 'failure', error: error });
      });
  };


  const getAdaptiveCardJSON = async (templateUrl: string) => {
    dispatch({ type: 'request_template' });
    await fetchData(templateUrl,'template');

    return () => {
      // clean up (equivalent to finally/dispose)
    };
  };

  const getDataJSON = async (dataUrl: string) => {
    dispatch({ type: 'request_data' });
    await fetchData(dataUrl, 'data');

    return () => {
      // clean up (equivalent to finally/dispose)
    };
  };

  // return the items that consumers need
  return { cardServiceState, getAdaptiveCardJSON, getDataJSON};

};
