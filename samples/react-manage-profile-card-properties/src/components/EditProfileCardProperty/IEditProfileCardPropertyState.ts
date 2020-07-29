import { IProfileCardProperty } from "../../Entities/IProfileCardProperty";
import { ILocalization } from "../../Entities/IAnnotations";
import { ILocalizationExtended } from "../../Entities/IlocalizationExtended";
import { IComboBoxOption } from "office-ui-fabric-react";

export interface IEditProfileCardPropertyState {
  isloading: boolean;
  hasError:boolean;
  errorMessage:string;
  isSaving:boolean;
  displayPanel: boolean;
  profileCardProperties: IProfileCardProperty;
  disableAdd:boolean;
  addLocalizationItem: ILocalizationExtended;
  languagesOptions: IComboBoxOption[];
}
