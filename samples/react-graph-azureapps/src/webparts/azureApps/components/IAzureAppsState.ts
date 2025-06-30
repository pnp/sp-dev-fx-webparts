import { IAppModel } from "../../../common/models/IAppModel";

export interface IAzureAppsState {
    error: string;
    apps: IAppModel[];
    loading: boolean;
    isModalOpen: boolean;
    isDialogHidden: boolean;
    isRefreshed: boolean;
  }