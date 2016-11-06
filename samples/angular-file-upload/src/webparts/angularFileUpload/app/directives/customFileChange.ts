export class CustomFileChange implements ng.IDirective {
  constructor(private $parse: ng.IParseService) {

  }

  restrict = "A";
  link = (scope: ng.IScope, element: any, attrs: any) => {
    var model = this.$parse(attrs.customFileChange);
    var modelSetter = model.assign;
    element.bind("change", function () {
      scope.$apply(function () {
        var reader = new FileReader();
        reader.onload = function (e: any) {
          var fileModel = {
            fileName: element[0].files[0].name,
            fileAsBuffer: e.target.result
          };
          modelSetter(scope, fileModel);
        }
        reader.onerror = function (e: any) {
          alert(e.target.error);
        }
        reader.readAsArrayBuffer(element[0].files[0]);
      });
    });
  }

  static factory(): ng.IDirectiveFactory {
    const directive = ($parse: ng.IParseService) => new CustomFileChange($parse);
    directive.$inject = ['$parse'];
    return directive;
  }
}