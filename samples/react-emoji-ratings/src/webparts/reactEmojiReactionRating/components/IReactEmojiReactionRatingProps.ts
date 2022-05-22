import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IReactEmojiReactionRatingProps {
  ratingText: string;
  emojisCollection: any[];
  context: WebPartContext;
  enableComments: boolean;
  enableCount: boolean;
  selectedColor: string;
  listName: string;
  displayMode: any;
  listMessage: string;
}
