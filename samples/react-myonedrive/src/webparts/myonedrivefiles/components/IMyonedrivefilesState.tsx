import { IDrive } from '@pnp/graph/onedrive';
export interface IMyonedrivefilesState {
    drives: any[];
    list: any[];
    root: IDrive;
    onedriveRootUrl: string;
    onedriveFiles: any[];
    errorMessage: string;
    loading: boolean;
    activeFolder: string;
  }