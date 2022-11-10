import { useQuery, UseQueryResult } from "react-query";
import { useGraphClient } from "../infrastructure/UseHttpClient";

export interface IUser {
    displayName: string;
    jobTitle: string;
    presence: { availability: string };
    photo: string;
}
export function useUserQuery(userId?: string): UseQueryResult<IUser> {
    const graphClient = useGraphClient();
    return useQuery(userId ? `user${userId}` : 'me', async () => {
        const query = userId ? `users/${userId}` : "me"
        const [me, photo, presence] = await Promise.all([
            graphClient.get(`https://graph.microsoft.com/v1.0/${query}`).then(r => r.json()),
            graphClient.get(`https://graph.microsoft.com/v1.0/${query}/photo/$value`).then(r => r.text()),
            graphClient.get(`https://graph.microsoft.com/v1.0/${query}/presence`).then(r => r.json()),
        ]);
        return {
            ...me,
            photo,
            presence
        }
    });
}