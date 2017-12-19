declare module "textboxio" {
    interface ITextboxIO {
        replace(selector: string, config?: any): any;
        inline(selector: string, config?: any): any;
        replaceAll(selector: string, config?: any): any[];
        inlineAll(selector: string, config?: any): any[];
        get(id: string): any;
    }
    var textboxio: ITextboxIO;
    export = textboxio;
}