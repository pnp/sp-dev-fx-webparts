import { AzureCommunicationTokenCredential } from '@azure/communication-common';

export interface IUserIdentity {
  userId?:string;
  accessToken?:string;
  displayName:string;
  avatar?:string;
  threadId?:string;
  userCredential?:AzureCommunicationTokenCredential;
  email:string;
}
