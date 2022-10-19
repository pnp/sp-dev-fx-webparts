import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { ChatAdapter } from '@azure/communication-react';

import { EProcessingStatus } from '../constants/EProcessingStatus';

export interface ICommunicationServiceData {
  endpointUrl: string;
    userId: string;
    token: string;
    displayName: string;
    threadId: string;
    chatAdapter: ChatAdapter;
    credential: AzureCommunicationTokenCredential;
    status: EProcessingStatus;
    error: Error;
}
