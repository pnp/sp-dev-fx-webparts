

//   Typing a useReducer React hook in TypeScript
//   https://codewithstyle.info/Typing-a-useReducer-React-hook-in-TypeScript/

type CardServiceDataType = 'template' | 'data';

export type ICardServiceState =
  | { type: 'complete', isLoading: boolean, isError: boolean, dataType: CardServiceDataType, data?: string }
  | { type: 'status', isLoading: boolean, isError: boolean, status?: { message: string, diagnostics: any } };

export type CardServiceAction =
  | { type: 'request_template' }
  | { type: 'success_template', results: { template: string } }
  | { type: 'request_data' }
  | { type: 'success_data', results: { data: string } }
  | { type: 'success_nodata', status: { message: string, diagnostics: any } }
  | { type: 'failure', error: any };


export const cardServiceReducer: React.Reducer<ICardServiceState, CardServiceAction> = (state: ICardServiceState, action: CardServiceAction) => {
  console.log(`cardServiceReducer: ${action.type}`);

  if (action.type === 'failure') {
    console.error(action.error);
  }

  switch (action.type) {
    case 'request_template':
      return {
        ...state,
        type: 'status',
        isLoading: true,
        isError: false,
        status: { message: "Requesting template", diagnostics: null }
      };
    case 'success_template':
      return {
        ...state,
        type: "complete",
        isLoading: false,
        isError: false,
        dataType: 'template',
        data: action.results.template
      };
    case 'request_data':
      return {
        ...state,
        type: 'status',
        isLoading: true,
        isError: false,
        status: { message: "Requesting data", diagnostics: null }
      };
    case 'success_data':
      return {
        ...state,
        type: "complete",
        isLoading: false,
        isError: false,
        dataType: "data",
        data: action.results.data
      };
    case 'success_nodata':
      return {
        ...state,
        type: "status",
        isLoading: false,
        isError: false,
        status: { message: "Operation successful", diagnostics: null }
      };
    case 'failure':
      return {
        ...state,
        type: 'status',
        isLoading: false,
        isError: true,
        status: { message: "failure", diagnostics: action.error }
      };
    default:
      throw new Error();
  }
};
