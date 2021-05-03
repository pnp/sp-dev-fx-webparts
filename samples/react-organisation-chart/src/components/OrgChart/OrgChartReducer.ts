import { IErrorInfo } from "../../components/OrgChart/IOrgChartState";
import { IUserInfo } from "../../models/IUserInfo";
import { EOrgChartTypes } from "./EOrgChartTypes";
import { IOrgChartState } from "./IOrgChartState";
export const OrgChartReducer = (
  state: IOrgChartState,
  action: { type: EOrgChartTypes; payload: unknown }
):IOrgChartState => {
  switch (action.type) {
    case EOrgChartTypes.SET_RENDER_MANAGERS:
      return { ...state, renderManagers: action.payload as JSX.Element[] };
    case EOrgChartTypes.SET_RENDER_DIRECT_REPORTS:
      return { ...state, renderDirectReports: action.payload as JSX.Element[]};
    case EOrgChartTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload  as boolean};
    case EOrgChartTypes.SET_HAS_ERROR:
      return { ...state,  error: action.payload as IErrorInfo};
    case EOrgChartTypes.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload  as IUserInfo};
    default:
      return state;
  }
};
