import { DisplayMode } from '@microsoft/sp-core-library';
import HttpClientService from '../services/HttpClientService';

export interface IMyApprovalsState {
  name: string;
  title: string;
  requestDate: string;
  requestUser: string;
}
