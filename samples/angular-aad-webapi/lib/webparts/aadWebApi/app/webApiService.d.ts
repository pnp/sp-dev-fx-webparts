export interface IWebAPIServce {
    getItem(): ng.IPromise<Object>;
    getMe(): ng.IPromise<Object>;
}
export declare class WebAPIService implements IWebAPIServce {
    private $q;
    private $http;
    private $log;
    static $inject: string[];
    constructor($q: ng.IQService, $http: ng.IHttpService, $log: ng.ILogService);
    getItem(): ng.IPromise<Object>;
    getMe(): ng.IPromise<Object>;
}
