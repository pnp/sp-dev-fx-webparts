import * as React from 'react';
import { IMarker, IMarkerCategory, MarkerType } from './IMapProps';
import styles from './Map.module.scss';
import { clone } from '@microsoft/sp-lodash-subset';
import { Icon, Panel, Dialog, TextField, IPanelProps, PrimaryButton, DefaultButton, IChoiceGroupOption, ChoiceGroup, IDropdownOption, Dropdown, getColorFromString, IColor, PanelType, Label, DialogFooter, DialogContent, DialogType } from 'office-ui-fabric-react';
import { Guid } from '@microsoft/sp-core-library';
import { isNullOrEmpty, isFunction } from '@spfxappdev/utility';
import { InlineColorPicker, IInlineColorPickerProps } from '@src/components/inlineColorPicker/InlineColorPicker';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import '@spfxappdev/utility/lib/extensions/StringExtensions';
import '@spfxappdev/utility/lib/extensions/ArrayExtensions';
import { IconButton } from '@microsoft/office-ui-fabric-react-bundle';
import { MarkerIcon } from './MarkerIcon';

export interface IManageMarkerCategoriesDialogProps {
    markerCategories: IMarkerCategory[];
    onDismiss();
    onMarkerCategoriesChanged(markerCategories: IMarkerCategory[]);
}

interface IManageMarkerCategoriesDialogState {
    markerCategories: IMarkerCategory[];
    isSaveButtonDisabled: boolean;
    isNewFormVisible: boolean;

}

export default class ManageMarkerCategoriesDialog extends React.Component<IManageMarkerCategoriesDialogProps, IManageMarkerCategoriesDialogState> {

    public state: IManageMarkerCategoriesDialogState = {
        markerCategories: clone(this.props.markerCategories),
        isSaveButtonDisabled: false,
        isNewFormVisible: false
    };

    constructor(props: IManageMarkerCategoriesDialogProps) {
        super(props);

    }

    componentDidMount(): void {
        this.validateForm();
    }
    
    public render(): React.ReactElement<IManageMarkerCategoriesDialogProps> {
        return (
        <Dialog 
            hidden={false}
            onDismiss={() => { this.props.onDismiss(); }}
            dialogContentProps={{
                title: "Manage Categories",
                type: DialogType.close
            }}
            minWidth={800}
            modalProps={{
                isBlocking: true,
                className: "categories-dialog"
                
            }}
        >
            <DialogContent>
                <div className='spfxappdev-grid'>

                    <div className='spfxappdev-grid-row grid-header'>
                        <div className='spfxappdev-grid-col spfxappdev-sm1'></div>
                        <div className='spfxappdev-grid-col spfxappdev-sm3'>Name</div>
                        <div className='spfxappdev-grid-col spfxappdev-sm1'>Marker color</div>
                        <div className='spfxappdev-grid-col spfxappdev-sm3'>Icon</div>
                        <div className='spfxappdev-grid-col spfxappdev-sm1'>Icon Color</div>
                        <div className='spfxappdev-grid-col spfxappdev-sm2'>Tooltip text</div>
                        <div className='spfxappdev-grid-col spfxappdev-sm1'></div>
                    </div>
                    {this.state.markerCategories.map((cat: IMarkerCategory, index: number): JSX.Element => {
                        return (<div key={cat.id} className='spfxappdev-grid-row categories-grid' data-catid={cat.id}>
                            {this.renderForm(cat, index)}
                        </div>)
                    })}
                    <div className='spfxappdev-grid-row grid-footer'>

                        <div className='spfxappdev-grid-col spfxappdev-sm12'>
                            <PrimaryButton onClick={() => {
                                this.onAddNewCatagoryButtonClick();
                            }}>Add</PrimaryButton>
                        </div>
                        
                    </div>
                </div>

            </DialogContent>

            <DialogFooter>
                <PrimaryButton 
                    onClick={() => {
                        if(isFunction(this.props.onMarkerCategoriesChanged)) {
                            this.props.onMarkerCategoriesChanged(this.state.markerCategories);
                        }
                    }} 
                    text="Save" 
                    disabled={this.state.isSaveButtonDisabled} 
                />
                <DefaultButton onClick={() => {
                    this.props.onDismiss();
                }} text="Cancel" />
            </DialogFooter>

        </Dialog>);
    }

    private renderForm(categoryItem: IMarkerCategory, index: number): JSX.Element {

        return (
        <>
            <div className='spfxappdev-grid-col spfxappdev-sm1'>
                <IconButton iconProps={{iconName: "Delete"}} onClick={() => {
                    this.state.markerCategories.RemoveAt(index);
                    this.validateForm();
                }} />
            </div>
            <div className='spfxappdev-grid-col spfxappdev-sm3'>
                <TextField 
                    required={true}
                    defaultValue={categoryItem.name} 
                    onChange={(ev: any, name: string) => {
                        this.state.markerCategories[index].name = name;
                        this.validateForm();
                    }}  
                />
            </div>
            <div className='spfxappdev-grid-col spfxappdev-sm1'>
                <InlineColorPicker 
                    alphaType='none'
                    color={getColorFromString(categoryItem.iconProperties.markerColor)}
                    onChange={(ev: any, color: IColor) => {
                        this.state.markerCategories[index].iconProperties.markerColor = "#" + color.hex;
                        this.validateForm();
                    }}
                />
            </div>
            <div className='spfxappdev-grid-col spfxappdev-sm3'>
                <TextField
                    defaultValue={categoryItem.iconProperties.iconName} 
                    onChange={(ev: any, name: string) => {
                        this.state.markerCategories[index].iconProperties.iconName = name;
                        this.validateForm();
                    }}  
                />
            </div>
            <div className='spfxappdev-grid-col spfxappdev-sm1'>
                <InlineColorPicker
                    alphaType='none'
                    color={getColorFromString(categoryItem.iconProperties.iconColor)}
                    onChange={(ev: any, color: IColor) => {
                        this.state.markerCategories[index].iconProperties.iconColor = "#" + color.hex;
                        this.validateForm();
                    }}
                    isDisbaled={isNullOrEmpty(categoryItem.iconProperties.iconName)}
                />
            </div>
            <div className='spfxappdev-grid-col spfxappdev-sm2'>
                <TextField
                    defaultValue={categoryItem.popuptext} 
                    onChange={(ev: any, popuptext: string) => {
                        this.state.markerCategories[index].popuptext = popuptext;
                        this.validateForm();
                    }}  
                />
            </div>
            <div className='spfxappdev-grid-col spfxappdev-sm1'>
                <div style={{position: "absolute"}}>
                    <MarkerIcon {...categoryItem.iconProperties} />
                </div>
            </div>
        </>
        );
    }

    private validateForm(): void {
        
        const isSaveBtnDisabled = this.state.markerCategories.Contains(cat => isNullOrEmpty(cat.name) || isNullOrEmpty(cat.iconProperties.markerColor));

        this.setState({
            markerCategories: this.state.markerCategories,
            isSaveButtonDisabled: isSaveBtnDisabled
        });
    }

    private onAddNewCatagoryButtonClick(): void {
        this.state.markerCategories.push(this.createNewCatagoryItem());

        this.validateForm();
    }

    private createNewCatagoryItem(): IMarkerCategory {
        const category: IMarkerCategory = {
            id: Guid.newGuid().toString(),
            name: "",
            iconProperties: {
                markerColor: "#000",
                iconName: "",
                iconColor: "#fff"
            }
        };

        return category;
    }
}