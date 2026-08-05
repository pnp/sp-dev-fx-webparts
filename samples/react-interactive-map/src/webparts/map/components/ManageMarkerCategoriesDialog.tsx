import * as React from 'react';
import { IMarkerCategory } from './IMapProps';
import './Map.module.scss';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { Icon, Dialog, TextField, PrimaryButton, DefaultButton, getColorFromString, IColor, DialogFooter, DialogContent, DialogType, MessageBar, TooltipHost, IconButton } from '@fluentui/react';
import { Guid } from '@microsoft/sp-core-library';
import { isNullOrEmpty, isFunction } from '@spfxappdev/utility';
import { InlineColorPicker } from '../../../components/inlineColorPicker/InlineColorPicker';
import '@spfxappdev/utility/lib/extensions/StringExtensions';
import '@spfxappdev/utility/lib/extensions/ArrayExtensions';
import { MarkerIcon } from './MarkerIcon';
import * as strings from 'MapWebPartStrings';
import { IconPicker } from '../../../components/iconPicker/IconPicker';

export interface IManageMarkerCategoriesDialogProps {
    markerCategories: IMarkerCategory[];
    onDismiss(): void;
    onMarkerCategoriesChanged(markerCategories: IMarkerCategory[]): void;
}

interface IManageMarkerCategoriesDialogState {
    markerCategories: IMarkerCategory[];
    isSaveButtonDisabled: boolean;
    isNewFormVisible: boolean;
    isDialogVisible: boolean;
}

export default class ManageMarkerCategoriesDialog extends React.Component<IManageMarkerCategoriesDialogProps, IManageMarkerCategoriesDialogState> {

    public state: IManageMarkerCategoriesDialogState = {
        markerCategories: cloneDeep(this.props.markerCategories),
        isSaveButtonDisabled: false,
        isNewFormVisible: false,
        isDialogVisible: true
    };

    constructor(props: IManageMarkerCategoriesDialogProps) {
        super(props);

    }

    public componentDidMount(): void {
        this.validateForm();
    }
    
    public render(): React.ReactElement<IManageMarkerCategoriesDialogProps> {
        return (
        <Dialog 
            hidden={!this.state.isDialogVisible}
            onDismiss={() => { this.onDialogDismiss(); }}
            dialogContentProps={{
                title: strings.DialogTitleManageCategories,
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
                    <MessageBar className='category-messagebar'>
                    {isNullOrEmpty(this.state.markerCategories) && <>{strings.InfoTextNoCategories} </>}{strings.InfoTextCategories}
                    </MessageBar>

                {!isNullOrEmpty(this.state.markerCategories) &&
                <>
                    <div className='spfxappdev-grid-row grid-header'>
                        <div className='spfxappdev-grid-col spfxappdev-sm1' />
                        <div className='spfxappdev-grid-col spfxappdev-sm3'>{strings.LabelCategoryHeaderName}</div>
                        <div className='spfxappdev-grid-col spfxappdev-sm1'>{strings.LabelMarkerColor}</div>
                        <div className='spfxappdev-grid-col spfxappdev-sm3'>
                            {strings.LabelIcon} 
                            <TooltipHost content={strings.LabelLeaveEmpty}>
                                <Icon className='info-tooltip' iconName='Info' />
                            </TooltipHost></div>
                        <div className='spfxappdev-grid-col spfxappdev-sm1'>{strings.LabelIconColor}</div>
                        <div className='spfxappdev-grid-col spfxappdev-sm2'>
                            {strings.LabelTooltip}
                            <TooltipHost content={strings.TooltipInfoCategory}>
                                <Icon className='info-tooltip' iconName='Info' />
                            </TooltipHost>
                        </div>
                        <div className='spfxappdev-grid-col spfxappdev-sm1' />
                    </div>
                    {this.state.markerCategories.map((cat: IMarkerCategory, index: number): JSX.Element => {
                        return (<div key={cat.id} className='spfxappdev-grid-row categories-grid' data-catid={cat.id}>
                            {this.renderForm(cat, index)}
                        </div>);
                    })}
                </>
                }
                    <div className='spfxappdev-grid-row grid-footer'>

                        <div className='spfxappdev-grid-col spfxappdev-sm12'>
                            <PrimaryButton 
                            text={strings.AddLabel}
                            onClick={() => {
                                this.onAddNewCatagoryButtonClick();
                            }} />
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

                        this.setState({
                            isDialogVisible: false
                        }); 
                    }} 
                    text={strings.SaveLabel} 
                    disabled={this.state.isSaveButtonDisabled} 
                />
                <DefaultButton onClick={() => {
                    this.onDialogDismiss();
                }} text={strings.CancelLabel} />
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
                    onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, name?: string) => {
                        const markerCategories = this.state.markerCategories;
                        markerCategories[index].name = name ?? "";
                        this.setState({ markerCategories });
                        this.validateForm();
                    }}
                />
            </div>
            <div className='spfxappdev-grid-col spfxappdev-sm1'>
                <InlineColorPicker
                    alphaType='none'
                    color={getColorFromString(categoryItem.iconProperties.markerColor)}
                    onChange={(ev: React.SyntheticEvent<HTMLElement>, color: IColor) => {
                        const markerCategories = this.state.markerCategories;
                        markerCategories[index].iconProperties.markerColor = "#" + color.hex;
                        this.setState({ markerCategories });
                        this.validateForm();
                    }}
                />
            </div>
            <div className='spfxappdev-grid-col spfxappdev-sm3'>
                <IconPicker
                    defaultValue={categoryItem.iconProperties.iconName}
                    onIconChanged={(name: string) => {
                        const markerCategories = this.state.markerCategories;
                        markerCategories[index].iconProperties.iconName = name;
                        this.setState({ markerCategories });
                        this.validateForm();
                    }}
                />
            </div>
            <div className='spfxappdev-grid-col spfxappdev-sm1'>
                <InlineColorPicker
                    alphaType='none'
                    color={getColorFromString(categoryItem.iconProperties.iconColor)}
                    onChange={(ev: React.SyntheticEvent<HTMLElement>, color: IColor) => {
                        const markerCategories = this.state.markerCategories;
                        markerCategories[index].iconProperties.iconColor = "#" + color.hex;
                        this.setState({ markerCategories });
                        this.validateForm();
                    }}
                    isDisbaled={isNullOrEmpty(categoryItem.iconProperties.iconName)}
                />
            </div>
            <div className='spfxappdev-grid-col spfxappdev-sm2'>
                <TextField
                    defaultValue={categoryItem.popuptext}
                    onChange={(ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, popuptext?: string) => {
                        const markerCategories = this.state.markerCategories;
                        markerCategories[index].popuptext = popuptext;
                        this.setState({ markerCategories });
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
                markerColor: "#000000",
                iconName: "FullCircleMask",
                iconColor: "#ffffff"
            }
        };

        return category;
    }

    private onDialogDismiss(): void {
        this.setState({
            isDialogVisible: false
        }); 
        this.props.onDismiss();
    }
}