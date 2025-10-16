/**
 * Interface for Microsoft Graph Application object
 */

export interface IGraphApplication {
  id: string;
  displayName: string;
  appId: string;
}

/**
 * Interface for results returned from Microsoft Graph when querying applications
 */
export interface IGraphApplicationResults {
  value: IGraphApplication[ ];
}
