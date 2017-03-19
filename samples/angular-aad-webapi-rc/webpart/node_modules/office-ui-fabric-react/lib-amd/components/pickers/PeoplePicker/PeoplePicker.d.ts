import { BasePicker, BasePickerListBelow } from '../BasePicker';
import { IBasePickerProps } from '../BasePicker.Props';
import { IPersonaProps } from '../../../Persona';
import './PeoplePicker.scss';
export interface IPeoplePickerProps extends IBasePickerProps<IPersonaProps> {
}
export declare class BasePeoplePicker extends BasePicker<IPersonaProps, IPeoplePickerProps> {
}
export declare class MemberListPeoplePicker extends BasePickerListBelow<IPersonaProps, IPeoplePickerProps> {
}
/**
 * Standard People Picker.
 */
export declare class NormalPeoplePicker extends BasePeoplePicker {
    static defaultProps: {
        onRenderItem: (props: any) => JSX.Element;
        onRenderSuggestionsItem: (props: any) => JSX.Element;
    };
}
/**
* Compact layout. It uses small personas when displaying search results.
*/
export declare class CompactPeoplePicker extends BasePeoplePicker {
    static defaultProps: {
        onRenderItem: (props: any) => JSX.Element;
        onRenderSuggestionsItem: (props: any) => JSX.Element;
    };
}
/**
 * MemberList layout. The selected people show up below the search box.
 */
export declare class ListPeoplePicker extends MemberListPeoplePicker {
    static defaultProps: {
        onRenderItem: (props: any) => JSX.Element;
        onRenderSuggestionsItem: (props: any) => JSX.Element;
    };
}
