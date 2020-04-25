/**
 * Interface to work with web part properties
 */
export interface IWebPartPropertiesService<T> {
  /**
   * Gets web part properties
   */
  getProperties: (webPartKey: string) => Promise<T | null>;
  /**
   * Sets web part properties
   */
  setProperties: (webPartKey: string, properties: T) => Promise<void>;
}
