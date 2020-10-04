import { IProfileCardProperty } from "../../Entities/IProfileCardProperty";
import { ILocalization } from "../../Entities/IAnnotations";
import { ILocalizationExtended } from "../../Entities/IlocalizationExtended";
import { IComboBoxOption } from "office-ui-fabric-react";

export interface IDeleteProfileCardPropertyState {
  isloading: boolean;
  hasError:boolean;
  errorMessage:string;
  isDeleting:boolean;
  displayPanel: boolean;
  disableDelete:boolean;
}
