import { BaseComponent } from '../../../../index';
import './PeoplePicker.Types.Example.scss';
export interface IPeoplePickerExampleState {
    currentPicker?: number | string;
    delayResults?: boolean;
}
export declare class PeoplePickerTypesExample extends BaseComponent<any, IPeoplePickerExampleState> {
    private _peopleList;
    private contextualMenuItems;
    constructor();
    render(): JSX.Element;
    _renderListPicker(): JSX.Element;
    _renderNormalPicker(): JSX.Element;
    _renderCompactPicker(): JSX.Element;
    _renderPreselectedItemsPicker(): JSX.Element;
    _renderLimitedSearch(): JSX.Element;
    private _onFilterChanged(filterText, currentPersonas, limitResults?);
    private _onFilterChangedWithLimit(filterText, currentPersonas);
    private _filterPromise(personasToReturn);
    private _listContainsPersona(persona, personas);
    private _filterPersonasByText(filterText);
    private _doesTextStartWith(text, filterText);
    private _convertResultsToPromise(results);
    private _removeDuplicates(personas, possibleDupes);
    private _toggleChange(toggleState);
    private _dropDownSelected(option);
}
