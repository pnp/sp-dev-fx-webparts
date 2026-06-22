/**
 * Interface for saved query metadata
 */
export interface ISavedQuery {
  id: string;
  name: string;
  listId: string;
  listName: string;
  query: string;
  lastUsed: Date;
}
