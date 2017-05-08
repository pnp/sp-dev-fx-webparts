/**
 * Base interface for Taxonomy objects
 */
export interface ITermBase {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Name
   */
  name: string;
}

/**
 * Term Store interface
 */
export interface ITermStore extends ITermBase {
}

/**
 * Term Group interface
 */
export interface ITermGroup extends ITermBase {
  /**
   * Term Group's description
   */
  description: string;
  /**
   * Term Store ID.
   * It is added to be able to store hierarchy structure (and it helps to decrease amount of Ajax requests to SharePoint)
   */
  termStoreId: string;
}

/**
 * Term Set Interface
 */
export interface ITermSet extends ITermBase {
  /**
   * Description
   */
  description?: string;
  /**
   * Term Group ID
   * It is added to be able to store hierarchy structure (and it helps to decrease amount of Ajax requests to SharePoint)
   */
  termGroupId?: string;
  /**
   * Term Store ID.
   * It is added to be able to store hierarchy structure (and it helps to decrease amount of Ajax requests to SharePoint)
   */
  termStoreId?: string;
}

/**
 * Term interface
 */
export interface ITerm extends ITermBase {
  /**
   * Description
   */
  description: string;
  /**
   * Flag if the current term is a root term in a term set
   */
  isRoot: boolean;
  /**
   * Term labels
   */
  labels: ILabel[];
  /**
   * Number of child terms
   */
  termsCount: number;
  /**
   * Term Set ID
   * It is added to be able to store hierarchy structure (and it helps to decrease amount of Ajax requests to SharePoint)
   */
  termSetId: string;
}

/**
 * Term Label interface
 */
export interface ILabel {
  /**
   * Flag if the label is default for current language
   */
  isDefaultForLanguage: boolean;
  /**
   * Label's value
   */
  value: string;
  /**
   * Current Language
   */
  language: string;
}