import { IInvitation } from './IInvitation';

export interface IInvitationManagerState {
  loading: boolean;
  error: string;
  invitation: IInvitation;
  signedIn: boolean;
}