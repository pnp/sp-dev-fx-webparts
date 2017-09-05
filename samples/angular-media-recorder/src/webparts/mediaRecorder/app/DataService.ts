/*=================
| Service methods |
=================*/
export interface IDataService {
    uploadFile(arrayBuffer: any, fileName: string, url: any, listName: string): ng.IPromise<string>;
    getFileBuffer(file: any): ng.IPromise<any>;
    arrayBufferToBase64(buffer: any): any;
}

export default class DataService implements IDataService {

    public static $inject: string[] = ['$q', '$http', '$log'];

    constructor(private $q: ng.IQService, private $http: ng.IHttpService, private $log: ng.ILogService)
    { }

    /*=================
    | Upload file to SharePoint |
    =================*/
    public uploadFile(arrayBuffer: any, fileName: string, url: any, listName: string): ng.IPromise<string> {

        const deferred: ng.IDeferred<string> = this.$q.defer();

        try {
            var clientContext = new SP.ClientContext(url);
            var oWeb = clientContext.get_web();
            var oList = oWeb.get_lists().getByTitle(listName);
            var createInfo = new SP.FileCreationInformation();
            createInfo.set_content(arrayBuffer);
            createInfo.set_url(fileName);
            var uploadedDocument = oList.get_rootFolder().get_files().add(createInfo);
            clientContext.load(uploadedDocument, 'ListItemAllFields');

            clientContext.executeQueryAsync((sender: any, args: SP.ClientRequestSucceededEventArgs): void => {
                deferred.resolve(uploadedDocument.get_listItemAllFields().get_id().toString());
            }, (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
                deferred.reject('Error Message - ' + args.get_message() + ' . Stack Trace - ' + args.get_stackTrace());
            });
        }
        catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;
    }

    /*=================
    | File Buffer for the given file |
    =================*/
    public getFileBuffer(file: any): ng.IPromise<any> {

        const deferred: ng.IDeferred<any> = this.$q.defer();

        try {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                var contents: any = e.target;
                deferred.resolve(contents.result);
            };
            reader.onerror = function (e) {
                var contents: any = e.target;
                deferred.reject(contents.error);
            };
            reader.readAsArrayBuffer(file);
        }
        catch (err) {
            deferred.reject(err);
        }

        return deferred.promise;

    }

    /*=================
    | Convert array buffer to Base64 |
    =================*/
    public arrayBufferToBase64(buffer: any): any {

        let binary = '';

        try {
            let bytes = new Uint8Array(buffer);
            let len = bytes.byteLength;
            for (var i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            return binary;
        }
        catch (err) {
            return '';
        }
    }
}


