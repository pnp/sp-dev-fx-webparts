export class UpdateHyperlink {
    public Description: string;
    public Url: string;

    constructor(url: string, description?: string) {
        this.Url = url;
        this.Description = description || url;
    }
}