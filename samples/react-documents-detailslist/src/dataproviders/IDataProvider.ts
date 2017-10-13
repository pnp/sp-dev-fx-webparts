import { IDocument } from "../common/IObjects";

export default  interface IDataProvider {

    validateSettings(): boolean;

    readDocumentsFromSearch(): Promise<IDocument[]>;

    readDocumentsFromLibrary(): Promise<IDocument[]>;

}