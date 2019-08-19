/**
 * Map component state
 */
export interface IMapState {
  /**
   * Coordinates for the specified address
   */
  coordinates: number[];
  /**
   * Error message that occurred while loading the data
   */
  error: string;
  /**
   * Indicates if the component is currently loading data or not
   */
  loading: boolean;
}