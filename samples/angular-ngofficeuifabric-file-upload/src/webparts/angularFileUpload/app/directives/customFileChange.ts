import { IFile } from "../../interfaces/IFile";
export class CustomFileChange implements ng.IDirective {
  constructor(private $parse: ng.IParseService) {

  }

  restrict = "A";
  link = (scope: ng.IScope, element: any, attrs: any) => {
    let model = this.$parse(attrs.customFileChange);
    let modelSetter = model.assign;
    element.bind("change", (): void => {
      scope.$apply((): void => {
        let reader = new FileReader();

        reader.onload = (event: any): void => {
          let fileModel: IFile = {
            fileName: element[0].files[0].name,
            fileAsBuffer: event.target.result
          };
          modelSetter(scope, fileModel);
        };

        reader.onerror = (event: any): void => {
          alert(event.target.error);
        };
        reader.readAsArrayBuffer(element[0].files[0]);
      });
    });
  };

  static factory(): ng.IDirectiveFactory {
    const directive = ($parse: ng.IParseService) => new CustomFileChange($parse);
    directive.$inject = ['$parse'];
    return directive;
  }
}