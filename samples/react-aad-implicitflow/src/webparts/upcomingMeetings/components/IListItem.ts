export interface IListItem {
  primaryText: string;
  secondaryText?: string;
  tertiaryText?: string;
  metaText?: string;
  isUnread?: boolean;
  isSelectable?: boolean;
}