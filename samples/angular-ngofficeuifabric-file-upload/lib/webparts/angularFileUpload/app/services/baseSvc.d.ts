export declare class BaseService {
    private $http;
    private $q;
    private pageContext;
    static $inject: string[];
    baseUrl: string;
    constructor($http: ng.IHttpService, $q: ng.IQService, pageContext: any);
    getRequest(query?: string, endPoint?: string): ng.IPromise<any>;
    postRequest(url: string, requestBody: any, endPoint?: string): ng.IPromise<any>;
    updateRequest(url: string, requestBody: any, eTag: string, endPoint?: string): ng.IPromise<{}>;
    deleteRequest(url: string, eTag: string, endPoint?: string): ng.IPromise<{}>;
    fileUploadRequest(url: string, file: ArrayBuffer, endPoint?: string): ng.IPromise<any>;
    private getFormDigestValue(webUrl);
}
