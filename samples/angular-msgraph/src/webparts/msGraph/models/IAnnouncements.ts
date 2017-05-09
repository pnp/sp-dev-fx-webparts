export interface IAnnouncements {
  id: number;
  ContentType?: string;
  Title: string;
  Modified?: Date;
  Created?: Date;
  Author?: string;
  AuthorId?: number;
  Editor?: string;
  EditorId?: number;
  _UIVersionString?: number;
  Attachments?: boolean;
  Edit?: string;
  LinkTitleNoMenu?: string;
  LinkTitle?: string;
  ItemChildCount?: number;
  FolderChildCount?: number;
  Body?: string;
}