import { FileUploadService } from '../services/fileUploadSvc';
import { IFileItem } from "../../interfaces/IFileItem";
import { IFile } from "../../interfaces/IFile";
export declare class FileUploadCtrl {
    private fileUploadService;
    private $rootScope;
    static $inject: string[];
    allFiles: Array<IFileItem>;
    file: IFile;
    libraryTitle: string;
    rowLimit: number;
    isUploading: boolean;
    isRemoving: boolean;
    constructor(fileUploadService: FileUploadService, $rootScope: ng.IRootScopeService);
    private init();
    upload(): void;
    deleteFile(fileItem: IFileItem): void;
}
