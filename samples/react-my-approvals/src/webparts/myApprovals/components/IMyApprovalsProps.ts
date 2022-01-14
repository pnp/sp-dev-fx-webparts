import { DisplayMode } from '@microsoft/sp-core-library';
import HttpClientService from '../services/HttpClientService';

export interface IMyApprovalsProps {
  httpService: HttpClientService;
  displayMode: DisplayMode;
  environment: string;
  title: string;
  setTitle: (value: string) => void;
}
