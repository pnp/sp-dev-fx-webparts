export declare class CustomFileChange implements ng.IDirective {
    private $parse;
    constructor($parse: ng.IParseService);
    restrict: string;
    link: (scope: angular.IScope, element: any, attrs: any) => void;
    static factory(): ng.IDirectiveFactory;
}
