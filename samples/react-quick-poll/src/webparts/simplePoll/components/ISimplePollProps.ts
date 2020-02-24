import { IUserInfo } from "../../../Models";
import { ChartType } from "@pnp/spfx-controls-react/lib/ChartControl";

export interface ISimplePollProps {
  pollQuestions: any[];
  SuccessfullVoteSubmissionMsg: string;
  ResponseMsgToUser: string;
  BtnSubmitVoteText: string;
  chartType: ChartType;
  pollBasedOnDate: boolean;
  currentUserInfo: IUserInfo;
  NoPollMsg: string;
  openPropertyPane: () => void;
}
