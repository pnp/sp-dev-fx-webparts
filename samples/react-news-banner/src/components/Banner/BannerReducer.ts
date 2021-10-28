import { IListItem, INotification } from "./../../entities";
import { EBannerTypes } from "./EBannerTypes";
import { IBannerState } from "./IBannerState";
// Reducer
export const reducer = (
  state: IBannerState,
  action: { type: EBannerTypes; payload: unknown }
): IBannerState => {
  switch (action.type) {
    case EBannerTypes.SET_ITEMS:
      return { ...state, items: action.payload as IListItem[] };
    case EBannerTypes.SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload as IListItem,
      };
    case EBannerTypes.SET_ISLOADING:
      return { ...state, isLoading: action.payload as boolean };
    case EBannerTypes.SET_MESSAGE:
      return { ...state, messageError: action.payload as INotification };
    default:
      return state;
  }
};
