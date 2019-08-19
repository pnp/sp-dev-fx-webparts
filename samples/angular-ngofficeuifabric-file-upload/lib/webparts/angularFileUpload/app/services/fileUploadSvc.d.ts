import { BaseService } from "./baseSvc";
import { IFileItem } from "../../interfaces/IFileItem";
import { IFile } from "../../interfaces/IFile";
export declare class FileUploadService {
    private baseService;
    private $q;
    static $inject: string[];
    constructor(baseService: BaseService, $q: ng.IQService);
    uploadFile(libraryName: string, file: IFile): ng.IPromise<IFileItem>;
    getFiles(libraryName: string, rowLimit: number): ng.IPromise<Array<IFileItem>>;
    deleteFile(libraryName: string, id: number): ng.IPromise<any>;
}
