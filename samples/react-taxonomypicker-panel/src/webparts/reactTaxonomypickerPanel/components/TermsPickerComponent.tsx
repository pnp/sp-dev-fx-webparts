import * as React from 'react';
import { taxonomy, ITermStore } from "@pnp/sp-taxonomy";

// Office ui fabric react controls
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import { DefaultButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// Represents a taxonomy term. 
export interface ITaxonomyTerm {
    name: string;
    key: string;
}

// Represents the properties of the term picker component.
export interface ITermPickerProps {
    IsMultiValue: boolean;
    TermSetId: string;
    LabelText: string;
    SelectedTerms: any[]
}

// Represents the local state of the term picker component.
export interface ISelectTermsState {
    TaxonomyTerms: ITaxonomyTerm[];
    showPanel: boolean;
    SelectedChoiceGroupTerm: ITaxonomyTerm;
    SelectedTerms: any[];
    PickerText: string;
}

let taxonomyOptions: IChoiceGroupOption[] = [];

export default class TermsPickerComponent extends React.Component<ITermPickerProps, ISelectTermsState> {

    constructor(props, state: ISelectTermsState) {
        super(props);

        let initialTaxonomyTermsArray: ITaxonomyTerm[] = [];

        this.state = {
            TaxonomyTerms: initialTaxonomyTermsArray,
            showPanel: false,
            SelectedChoiceGroupTerm: { name: null, key: null },
            SelectedTerms: [],
            PickerText: "",
        }

    }

    // Creates the choice group to be displayed in the pciker panel.
    public createTaxonomyChoiceGroup() {

        taxonomyOptions = [];
        if (this.state.TaxonomyTerms.length > 0) {
            this.state.TaxonomyTerms.forEach(trm => {
                taxonomyOptions.push(
                    {
                        key: trm.key,
                        text: trm.name
                    }
                )
            })
        }
    }

    public render(): React.ReactElement<ITermPickerProps> {

        this.createTaxonomyChoiceGroup();

        return (
            <div>
                <div className="ms-Grid">
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm12 ms-lg12">
                            <Label>{this.props.LabelText}</Label>
                        </div>
                    </div>
                    <div className="ms-Grid-row">
                        <div className="ms-Grid-col ms-sm8 ms-lg8">
                            <TagPicker
                                onResolveSuggestions={this._onFilterChanged.bind(this)}
                                selectedItems={this.state.SelectedTerms}
                                getTextFromItem={this._getTextFromItem.bind(this)}
                                itemLimit={this.props.IsMultiValue ? 100 : 1}
                                disabled={true}
                            />
                        </div>
                        <div className="ms-Grid-col ms-sm4 ms-lg4">
                            <ActionButton
                                primary={true}
                                onClick={this._onShowPanel.bind(this)}
                                iconProps={{ iconName: 'MultiSelectMirrored' }}
                            />
                        </div>
                    </div>
                </div>
                <Panel
                    isOpen={this.state.showPanel}
                    type={PanelType.smallFixedFar}
                    onDismiss={this._handlePanelDismiss.bind(this)}
                    headerText="Select terms"
                    closeButtonAriaLabel="Close"
                >
                    <div style={this.state.TaxonomyTerms.length == 0 ? { display: "none" } : {}}>
                        <ChoiceGroup
                            options={taxonomyOptions}
                            onChange={this._onTaxonomyChoiceChange.bind(this)}
                            required={true}
                            selectedKey={this.state.SelectedChoiceGroupTerm.key}
                        />
                        <br />
                        <DefaultButton
                            primary={true}
                            text="Select"
                            onClick={this._handleSelectedTaxonomyTerm.bind(this)}
                        />
                        <br />
                        <br />
                        <TextField label="Selected tags : " value={this.state.PickerText} multiline rows={4} onChanged={this._handlePickerTextChange.bind(this)} />
                        <br />
                        <br />
                        <DefaultButton
                            primary={true}
                            text="Done"
                            onClick={this._handlePickerDone.bind(this)}
                        />
                    </div>
                    <div style={this.state.TaxonomyTerms.length == 0 ? {} : { display: "none" }}>
                        <Label>No terms available....</Label>
                    </div>
                </Panel>
            </div>
        );
    }

    // Component did mount - fetches the available terms from the term set.
    // If existing terms are passed to the component through the 'SelectedTerms' property, it resolves
    // the terms from the available set and adds them to the local state.
    public componentDidMount() {

        this.GetTerms().then(resp => {
            let setSelectedTerms: ITaxonomyTerm[] = [];
            if (this.props.SelectedTerms.length > 0 && this.state.TaxonomyTerms.length > 0) {
                this.props.SelectedTerms.forEach(selectedTrm => {

                    // Checks if the selected terms that was send as a property is valid (ie present in the available terms from termstore)
                    var checkForExistingValidTerm = this.state.TaxonomyTerms.filter(trm => {
                        return (trm.name.toLowerCase() === selectedTrm.name.toLowerCase() && trm.key === selectedTrm.key)
                    })
                    // If valid, add it to the selected terms of LOCAL STATE
                    if (checkForExistingValidTerm.length > 0) {
                        setSelectedTerms.push(selectedTrm);
                    }
                })

            }
            this.setState({
                SelectedTerms: setSelectedTerms,
                PickerText: this._getPickerTextString(setSelectedTerms)
            })
        })
    }

    // Fetches the terms from the term set and sets the TaxonomyTerms (available terms) in the local state.
    public async GetTerms(): Promise<any> {

        try {
            const store: ITermStore = await taxonomy.termStores.getByName("<TERM_STORE_NAME>");
            const setWithData = await store.getTermSetById(this.props.TermSetId);
            const terms = await setWithData.terms.get();
            let taxonomyTerms: ITaxonomyTerm[] = new Array();

            if (terms.length > 0) {
                terms.forEach(trm => {
                    taxonomyTerms.push({
                        name: trm.Name,
                        key: trm.Id.split('(')[1].replace(')/', '')
                    })
                });

                this.setState({
                    TaxonomyTerms: taxonomyTerms
                })
            }

        }
        catch (error) {
            console.log("An error occurred while fetching the terms from the term store....");
        }
        return "";
    }

    public _onShowPanel() {
        this.setState({ showPanel: true })
    }


    // This method is called when the panel is dismissed. So on the "DONE" button click,
    // this method is automatically called. Also on the 'X' button click.
    // On DONE button click in the picker panel, we only set the showPanel value to false.
    private _handlePanelDismiss() {

        // Push the data into component property.
        if (this.state.SelectedTerms.length > 0) {
            this.props.SelectedTerms.length = 0;
            this.state.SelectedTerms.forEach(trm => {
                this.props.SelectedTerms.push(trm);
            })
        }

        // Reset the picker text in case it was modified by the user manually.
        // The next time it is opened, it will show the text of the selected terms.
        this.setState({
            PickerText: this._getPickerTextString(this.state.SelectedTerms),
        })
    }

    private _onFilterChanged = (filterText: string, tagList: { key: string; name: string }[]): { key: string; name: string }[] => {
        return filterText ? this.state.TaxonomyTerms.filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) : [];
    };

    public _getTextFromItem(item: any): any {
        return item.Text;
    }

    // Sets the selected term on change of term in the picker panel.
    private _onTaxonomyChoiceChange = (ev: React.FormEvent<HTMLInputElement>, option: any): void => {

        this.setState({
            SelectedChoiceGroupTerm: { name: option.text, key: option.key }
        })
    }


    private _handleSelectedTaxonomyTerm = (): void => {

        let selectedTerms: ITaxonomyTerm[] = this.state.SelectedTerms;

        // Handles the state and picker textbox if the field is multi-select
        if (this.props.IsMultiValue) {
            selectedTerms = this.state.SelectedTerms;

            // Check if the term is already selected
            let existingTerm = selectedTerms.filter(trm => {
                return trm.name.toLowerCase() === this.state.SelectedChoiceGroupTerm.name.toLowerCase()
            })
            if (existingTerm.length == 0) {
                selectedTerms.push(
                    {
                        name: this.state.SelectedChoiceGroupTerm.name,
                        key: this.state.SelectedChoiceGroupTerm.key
                    }
                );

            }

            this.setState({
                SelectedTerms: selectedTerms,
                PickerText: this._getPickerTextString(this.state.SelectedTerms)
            })
        }
        // Handles the state and picker textbox if the field is single-select
        else {
            selectedTerms = [];
            selectedTerms.push(
                {
                    name: this.state.SelectedChoiceGroupTerm.name,
                    key: this.state.SelectedChoiceGroupTerm.key
                }
            );

            this.setState({
                SelectedTerms: selectedTerms,
                PickerText: selectedTerms[0].name
            })
        }
    }

    // Handle the close panel on "Done" button click
    // When the showPanel is set to false, the onDismiss method will be automatically executed.
    private _handlePickerDone = (): void => {
        this.setState({
            showPanel: false
        })
    }

    // Generates the ';' separated string for selected terms
    private _getPickerTextString(selectedTerms: any[]): string {

        let pickerTextString: string = "";

        if (selectedTerms.length > 0) {
            pickerTextString = selectedTerms.map(trm => {
                return trm.name
            }).join('; ')
        }

        return pickerTextString;
    }

    // Handles manual change to the picker control.
    private _handlePickerTextChange(value) {

        if (value !== "") {

            let selectedTerms: any[] = [];
            let pickerSelectedTerms: any[] = value.split(';');

            pickerSelectedTerms.forEach((pickerSelectedTerm: string) => {
                pickerSelectedTerm = pickerSelectedTerm.trim();
                let filteredTerm = this.state.TaxonomyTerms.filter((trm) => {
                    return trm.name.toLowerCase() == pickerSelectedTerm.toLowerCase()
                })

                // Push the term only if it resolved.
                if (filteredTerm.length > 0) {
                    selectedTerms.push(filteredTerm[0]);
                }
            })

            this.setState({
                PickerText: value,
                SelectedTerms: selectedTerms
            })
        }
        else {
            this.setState({
                PickerText: value,
                SelectedTerms: []
            })
        }

    }

}