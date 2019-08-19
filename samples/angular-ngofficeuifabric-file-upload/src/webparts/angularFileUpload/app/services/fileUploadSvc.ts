import { BaseService } from "./baseSvc";
import { IFileItem } from "../../interfaces/IFileItem";
import { IFile } from "../../interfaces/IFile";

export class FileUploadService {
  public static $inject: string[] = ["baseService", "$q"];
  constructor(private baseService: BaseService, private $q: ng.IQService) {
  }

  public uploadFile(libraryName: string, file: IFile): ng.IPromise<IFileItem> {
    const deferred: ng.IDeferred<IFileItem> = this.$q.defer();
    var uploadUrl = `/_api/web/lists/getbytitle('${libraryName}')/rootfolder/files/add(url=@filename, overwrite=true)?@filename='${file.fileName}'`;
    this.baseService
      .postRequest(uploadUrl, file.fileAsBuffer)
      .then((response: any): ng.IPromise<IFileItem> => {
        return this.baseService
          .getRequest(null, `${response.d.ListItemAllFields.__deferred.uri}?$select=Id,Modified,FileLeafRef`);
      }).then((response: IFileItem): void => {
        deferred.resolve(response);
      }, (error: any): void => {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  public getFiles(libraryName: string, rowLimit: number): ng.IPromise<Array<IFileItem>> {
    const url: string = `/_api/Web/lists/getbytitle('${libraryName}')/items?$select=Id,Modified,FileLeafRef,Author/Id&$expand=Author&$orderby=Modified desc&$top=${rowLimit}`;
    return this.baseService.getRequest(url);
  }

  public deleteFile(libraryName: string, id: number): ng.IPromise<any> {
    const url: string = `/_api/Web/lists/getbytitle('${libraryName}')/items(${id})`;
    return this.baseService.deleteRequest(url, "*");
  }
}