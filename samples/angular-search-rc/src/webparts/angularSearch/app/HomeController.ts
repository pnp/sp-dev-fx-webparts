import * as angular from 'angular';
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
  public searching: boolean = false;

  private _web: string = null;
  private _contentType: string = undefined;

  constructor(private dataService: IDataService, private $rootScope: angular.IRootScopeService, private $scope: angular.IScope, private $attrs: angular.IAttributes) {
    const vm: HomeController = this;

    vm.styles = angular.fromJson($attrs['style']);
    vm._web = $attrs['web'];
    vm._contentType = $attrs['contenttype'] === "" ? undefined : $attrs['contenttype'];

    if (this._contentType !== undefined) {
      this._init(this._contentType, vm.$scope);
    }
    else {
      this._init(undefined, undefined);
    }

    $rootScope.$on('configurationChanged',
      (event: angular.IAngularEvent, args: IConfigurationChangeArgs): void => {
        vm._init(args.contentType, vm.$scope);
      });
  }

  private _init(ctype: string, $scope: angular.IScope): void {
    if (ctype !== undefined && ctype.length > 0) {
      this._contentType = ctype;
      this.searchNotConfigured = false;
    }
    else {
      this.searchNotConfigured = true;
    }

    this.status = this.searchNotConfigured ? 'Please select a contenet type in the Web Part properties' : 'Ready';
    if ($scope && this._contentType !== undefined) {
      //$scope.$digest();

      //get search results as long as it isn't our mock dataService
      if (ctype.toLowerCase().indexOf('mock') == -1) {
        this.getSearchResults();
      }
    }
  }

  public getSearchResults(): void {
    //display searching message
    this.searching = true;
    this.dataService.getSearchResults(this._web, this._contentType)
      .then((results: ISearchResults): void => {
        this.items = this._setSearchResults(results.PrimaryQueryResult.RelevantResults.Table.Rows.results);
        console.log(this.items);

        //hide searching message
        this.searching = false;
      });

  }

  private _setSearchResults(searchResults: ICells[]): any[] {
    if (searchResults.length > 0) {
      const temp: any[] = [];
      searchResults.forEach((result: ICells) => {
        var val: Object = {};

        result.Cells.results.forEach((cell: ICellValue) => {
          if (cell.Key == 'HitHighlightedSummary') {
            //need to replace <ddd> markup
            val[cell.Key] = cell.Value.replace(/ <ddd\/>/g, '.');
          }
          else if (cell.Key == 'PublishingImage' && cell.Value !== null) {
            //need to pull image url out of PublishingImage field
            let div = document.createElement('div');
            div.innerHTML = cell.Value;
            let img = div.getElementsByTagName('img')[0];
            val[cell.Key] = img.src;
          }
          else {
            val[cell.Key] = cell.Value;
          }
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