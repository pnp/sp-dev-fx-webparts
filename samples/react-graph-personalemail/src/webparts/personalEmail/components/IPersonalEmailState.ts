import { IMessage } from '.';

export interface IPersonalEmailState {
  error: string;
  loading: boolean;
  messages: IMessage[];
}