import { FileUploadService } from '../services/fileUploadSvc';
import { IFileItem } from "../../interfaces/IFileItem";
import { IFile } from "../../interfaces/IFile";
import { IError } from "../../interfaces/IError";

export class FileUploadCtrl {
  public static $inject: string[] = ['fileUploadService', '$rootScope'];
  public allFiles: Array<IFileItem>;
  public file: IFile;
  public libraryTitle: string;
  public rowLimit: number;
  public isUploading: boolean = false;
  public isRemoving: boolean = false;

  constructor(private fileUploadService: FileUploadService, private $rootScope: ng.IRootScopeService) {
    const vm: FileUploadCtrl = this;
    $rootScope.$on('configurationChanged',
      (event: ng.IAngularEvent, args: any): void => {
        this.libraryTitle = args.libraryTitle;
        this.rowLimit = parseInt(args.rowLimit);
        if(this.libraryTitle){
          this.init();
        }
      });
  }
  private init(): void {
    this.fileUploadService.getFiles(this.libraryTitle, this.rowLimit)
      .then((response: Array<IFileItem>): void => {
        this.allFiles = response;
      }, (error: IError): void => {
        alert(error.message);
      });
  }

  public upload(): void {
    if(!this.file){
      return;
    }
    this.isUploading = true;
    this.fileUploadService.uploadFile(this.libraryTitle, this.file)
      .then((response: IFileItem): void => {
        this.allFiles.unshift(response);
        this.file = null;
        this.isUploading = false;
      }, (error: IError): void => {
        alert(error.message);
        this.isUploading = false;
      });
  }

  public deleteFile(fileItem: IFileItem): void {
    this.isRemoving = true;
    this.fileUploadService
      .deleteFile(this.libraryTitle, fileItem.Id)
      .then((response: any): void => {
        var fileItemIndex: number = this.allFiles.indexOf(fileItem);
        this.allFiles.splice(fileItemIndex, 1);
        this.isRemoving = false;
      }, (error: IError): void => {
        alert(error.message);
        this.isRemoving = false;
      });
  }
}
