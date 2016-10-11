import { IDataService } from './DataService';
import { ISearchResults, ICells, ICellValue } from './../models/ISearchResults';

interface IConfigurationChangeArgs {
  contentType: string;
}

export default class HomeController {
  public static $inject: string[] = ['DataService', '$rootScope', '$scope', '$attrs'];

  public status: string = undefined;
  public styles: any = null;
  public searchNotConfigured: boolean = true;
  public items: any[] = [];

  private _web: string = null;
  private _contentType: string = undefined;

  constructor(private dataService: IDataService, private $rootScope: ng.IRootScopeService, private $scope: ng.IScope, private $attrs: ng.IAttributes) {
    const vm: HomeController = this;

    vm.styles = $attrs['style'];
    vm._web = $attrs['web'];
    vm._contentType = $attrs['contenttype'] === "" ? undefined : $attrs['contenttype'];

    if (this._contentType !== undefined) {
      this._init(this._contentType, vm.$scope);
    }
    else {
      this._init(undefined, undefined);
    }

    $rootScope.$on('configurationChanged',
      (event: ng.IAngularEvent, args: IConfigurationChangeArgs): void => {
        vm._init(args.contentType, vm.$scope);
      });
  }

  private _init(ctype: string, $scope: ng.IScope): void {
    if (ctype !== undefined && ctype.length > 0) {
      this._contentType = ctype;
      this.searchNotConfigured = false;
    }
    else {
      this.searchNotConfigured = true;
    }

    this.status = this.searchNotConfigured ? 'Please configure the search settings in the Web Part properties' : 'Ready';
    if ($scope) {
      //$scope.$digest();

      //get search results
      this.getSearchResults();
    }
  }

  public getSearchResults(): void {
    this.status = 'Loading search results...';
    this.dataService.getSearchResults(this._web, this._contentType)
      .then((results: ISearchResults): void => {
        this.items = this._setSearchResults(results.PrimaryQueryResult.RelevantResults.Table.Rows.results);
        console.log(this.items);
      });

  }

  private _setSearchResults(searchResults: ICells[]): any[] {
    if (searchResults.length > 0) {
      const temp: any[] = [];
      searchResults.forEach((result: ICells) => {
        var val: Object = {};

        result.Cells.results.forEach((cell: ICellValue) => {
          val[cell.Key] = cell.Value;
        });

        temp.push(val);
      });
      return temp;
    }
    else {
      return [];
    }
  }
}