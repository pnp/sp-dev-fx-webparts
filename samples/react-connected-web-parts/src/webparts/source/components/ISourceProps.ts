import { IPreferences } from "../../../common/Preferences";

export interface ISourceProps {
	onFirstNameChanged: (firstName: string | undefined) => void;
	onLastNameChanged: (lastName: string | undefined) => void;
	onPreferencesChanged: (preferences: IPreferences | undefined) => void;
}
