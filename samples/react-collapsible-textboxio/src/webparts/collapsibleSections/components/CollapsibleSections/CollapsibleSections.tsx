import ICollapsibleSectionsProps from "./ICollapsibleSectionsProps";
import ICollapsibleSectionsState from "./ICollapsibleSectionsState";
import CanvasToolboxHint from "../CanvasToolboxHint/CanvasToolboxHint";
import ISection from "../../../../models/ISection";
import * as React from "react";
import {
    GroupedList,
    IGroup,
    IGroupDividerProps
  } from 'office-ui-fabric-react/lib/components/GroupedList/index';
import { DisplayMode } from "@microsoft/sp-core-library";
import { Label } from 'office-ui-fabric-react/lib/Label';
import * as strings from "CollapsibleSectionsWebPartStrings";
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import SectionContent from "../SectionContent/SectionContent";
import ITextFieldControl from "../../../../models/ITextFieldControl";

export default class CollapsibleSections extends React.Component<ICollapsibleSectionsProps, ICollapsibleSectionsState> {
    
    public constructor(props) {
        super(props);

        this._onRenderHeader = this._onRenderHeader.bind(this);
        this._onRenderCell = this._onRenderCell.bind(this);
        this._onAddSection = this._onAddSection.bind(this);
        this._onDeleteSection = this._onDeleteSection.bind(this);
        this._showConfirmationDialog = this._showConfirmationDialog.bind(this);
        this._closeConfirmationDialog = this._closeConfirmationDialog.bind(this);

        this.state = {
            lastInsertedIndex: -1,
            isDialogOpen: false,
            selectedSection: null,
            selectedGroupIndex: 0,
        };
    }

    public render() {

        let items: JSX.Element[] = [];
        let groups: IGroup[] = [];
        let renderSections: JSX.Element = null;
        const isEditmode = this.props.displayMode === DisplayMode.Edit ? true : false;
        let emptySectionMessage: JSX.Element = null;

        // We have only on dialog control for all sections so wee need to update the state every time a seciton is selected/deleted to get the right one in the dialog
        const renderDialog: JSX.Element =   <Dialog 
                                                isOpen={ this.state.isDialogOpen }
                                                onDismiss={ this._closeConfirmationDialog }
                                                title={ strings.ConfirmDeleteItem }
                                                subText= { this.state.selectedSection ? this.state.selectedSection.title : "" }
                                                type= { DialogType.close }
                                                isBlocking= { false }
                                                isDarkOverlay={ true }                                
                                                containerClassName= "ms-dialogMainOverride"                                
                                            >  
                                                    <DialogFooter>
                                                        <PrimaryButton onClick={ this._onDeleteSection } text={ strings.ConfirmButton } />
                                                        <DefaultButton onClick={ this._closeConfirmationDialog } text={ strings.CancelButton }  />
                                                    </DialogFooter>
                                            </Dialog>;   

        // If no item, only the button to add a new item is displayed
        if (this.props.sections) {
            if (this.props.sections.length > 0) {

                // Build items for the grouped list
                items = this.props.sections.map((section, index) => {
            
                    return <div className="ms-Grid-row">
                                <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                                    <div className="collapsible-sections__section__section-content">
                                        <SectionContent 
                                            section={ section }
                                            displayMode={ this.props.displayMode }
                                            locale={ this.props.locale } 
                                            onSectionUpdated={ (updatedSection) => { this.props.onSectionUpdated(updatedSection, index); } } />
                                        <CanvasToolboxHint key={ index } visible={ isEditmode } onClick={ () => { this._onAddSection(index + 1); } }/>
                                    </div>
                                </div>
                            </div>;
                });

                // Build collapsible groups from sections
                // One group contains one item
                groups = this.props.sections.map((section, index) => {

                    const group: IGroup = {
                        key: index.toString(),
                        name: section.title,
                        count: 1,
                        startIndex: index,
                        isDropEnabled: true,
                        data: {
                            section: section,          
                        }
                    };

                    return group;
                }); 

                renderSections = <GroupedList
                                    ref='groupedList'
                                    items={ items }
                                    onRenderCell={ this._onRenderCell }
                                    groupProps={
                                    
                                        {
                                            onRenderHeader: this._onRenderHeader,                                                    
                                        }
                                    }
                                    groups={ groups }/>;
            } else {

                if (this.props.displayMode === DisplayMode.Edit) {
                    emptySectionMessage = <div className="collapsible-sections__section__nosection"><Label>{ strings.EmptySectionsMessage }</Label></div>;
                }
            }
        }


        return  (
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12">
                                { emptySectionMessage }
                                <CanvasToolboxHint visible={ isEditmode } onClick={ () => { this._onAddSection(0); } }/>
                            </div>
                        </div>
                        { renderSections }
                        { renderDialog }
                    </div>
                );
    }

    private _onRenderCell(nestingDepth: number, item: any, itemIndex: number) {
        return (
          <div data-selection-index={ itemIndex }>
            { item }
          </div>
        );
      }
    
    private _onRenderHeader(props: IGroupDividerProps): JSX.Element {

        let removeBtn: JSX.Element = null;
        const currentSection: ISection = props.group.data.section;
        const isInEditMode = this.props.displayMode === DisplayMode.Edit ? true : false;
        
        const headerCssClassName = "collapsible-sections__section__section-header";

        // Add a remove button only in edit mode
        if (isInEditMode) {
            removeBtn = <div className="header-icon">
                            <i className="ms-Icon ms-Icon--Delete" onClick={ () => { this._showConfirmationDialog(props.groupIndex, currentSection); } }></i>                   
                        </div>;
        }

        return (
            <div className={ props.group.isCollapsed ? headerCssClassName + " collapsed" :  headerCssClassName + " expanded" }>
                <div className="ms-Grid-row" onClick={ () => props.onToggleCollapse(props.group) }>                
                    <div className="ms-Grid-col ms-u-sm10 ms-u-md10 ms-u-lg10">
                        <TextField  borderless placeholder='Type your section title here' 
                                    value={ currentSection.title } 
                                    disabled={ !isInEditMode }
                                    onClick={ (e) => { 
                                        if (isInEditMode) {
                                            // Avoid expand/collapse when clicking inside the field
                                            e.stopPropagation();
                                        }
                                    }}
                                    componentRef={ ((ref) => {
                                        if (props.groupIndex === this.state.lastInsertedIndex) {
                                            if (ref) {
                                                
                                                // Little hack to get the focus just after the Textbox.io instance is rendered
                                                // Textbox.io editor instanciation losts initial focus of the section otherwise
                                                setTimeout(() => {
                                                    // Focus the text field immediately after creation
                                                    ref.focus();
                                                }, 500);                                           
                                            }
                                        }
                                    }).bind(this)}
                                    onChanged={ ((value: string) => {                                        
                                        currentSection.title = value;

                                        // Reset the laste inserted index 
                                        this.setState({
                                            lastInsertedIndex: -1,
                                        });
                                        
                                        // Call the parent component
                                        this.props.onSectionUpdated(currentSection, props.groupIndex);
                                    }) }/>
                    </div>
                    <div className="ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                        { removeBtn }
                    </div>
                    <div className="ms-Grid-col ms-u-sm1 ms-u-md1 ms-u-lg1">
                        <div className="header-icon">
                            <i className={ props.group.isCollapsed ? "ms-Icon ms-Icon--CalculatorAddition" : "ms-Icon ms-Icon--CalculatorSubtract"}></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private _showConfirmationDialog(index: number, selectedSection: ISection) {
        this.setState({
            isDialogOpen: true,
            selectedGroupIndex: index,           
            selectedSection: selectedSection, 
        });
    }

    private _closeConfirmationDialog() {
        this.setState({
            isDialogOpen: false,
        });
    }

    private _onAddSection(index: number) {
        
        // Create a blank section with blank controls
        // Section are uniquely identified with a guid
        const blankTextFieldControl: ITextFieldControl = {
            type: "TextFieldControl",
            content: "",
            placeHolderText: strings.SectionDescriptionPlaceHolderText,
        };

        const newSection: ISection = {
            title: "",
            id: this._getNewGuid(),
            controls: [blankTextFieldControl],
        };

        // Set the last inserted index to focus the newly created text field
        this.setState({
            lastInsertedIndex: index,
        });
        
        // Call the parent to update its state
        this.props.onAddSection(newSection, index);
    }

    private _onDeleteSection() {

        this._closeConfirmationDialog();

        // Call the parent delete method
        // We need to pass the index in the state instead of the property
        this.props.onRemoveSection(this.state.selectedSection, this.state.selectedGroupIndex);       
    }

    /**
     * Create a new random guid
     * @return {String} A new guid as string
     */
    private _getNewGuid(): string {
        
        const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
            // tslint:disable-next-line:no-bitwise
            const r = Math.random() * 16 | 0;
            // tslint:disable-next-line:no-bitwise
            const v = c === "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return guid;
    }
}