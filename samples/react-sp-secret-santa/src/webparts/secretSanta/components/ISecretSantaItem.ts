export interface ISecretSantaItem {
    Title: string;
    Id: number;
    Image: { Url: string };
    Opened: boolean;
    OpenedBy?: { Id: number; Title: string };
    GiftTitle: string;
}
