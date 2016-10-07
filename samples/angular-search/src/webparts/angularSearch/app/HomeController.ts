
export default class HomeController {
  public static $inject: string[] = ['$rootScope', '$scope', '$attrs'];
  public styles: any = null;
  public hello: string = null;
  private web: string = null;

  constructor(private $rootScope: ng.IRootScopeService, private $scope: ng.IScope, private $attrs: ng.IAttributes) {
    let vm: HomeController = this;
    vm.styles = $attrs['style'];
    vm.hello = $attrs['hello'];
    vm.web = $attrs['web'];
  }
}