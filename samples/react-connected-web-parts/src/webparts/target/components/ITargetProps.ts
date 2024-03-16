import { DynamicProperty } from "@microsoft/sp-component-base";
import { IPreferences } from "../../../common/Preferences";

export interface ITargetProps {
	firstName: DynamicProperty<string>;
	lastName: DynamicProperty<string>;
	preferences: DynamicProperty<IPreferences>;
	userName: DynamicProperty<string>;
}
