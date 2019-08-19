export interface ICommunicationService {
    SubscribeToStatusChangeForUser(userEmail: string, userDisplayName: string,
        handler: (newStatus: string, oldStatus: string, displayName: string) => void): Promise<boolean>;
}
