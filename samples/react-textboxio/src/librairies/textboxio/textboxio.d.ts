declare module "textboxio" {
    interface ITextboxIO {
        inline(selector: string, config?: any): any;
        get(id: string): any;
    }
    var textboxio: ITextboxIO;
    export = textboxio;
}