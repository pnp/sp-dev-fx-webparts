import { IInvitation } from './IInvitation';
import { IExternalUser } from './IExternalUser';

export interface IInvitationManagerState {
  loading: boolean;
  error: string;
  invitation: IInvitation;
  signedIn: boolean;
  sendInvitationMessage: boolean;
  redirectUrl: string;
  displayName: string;
  emailAddress: string;
  externalUser:  IExternalUser,
  selectionDetails: string,
  items: string[];
}