type allowedAudiences = "me" | "organization" | "groupMembers" | "everyone";

export interface IAward {
    id: string;
    displayName: string;
    allowedAudiences: allowedAudiences;
    description: string;
    issuedDate: string;
    issuingAuthority: string;
    thumbnailUrl: string;
    webUrl: string;
}