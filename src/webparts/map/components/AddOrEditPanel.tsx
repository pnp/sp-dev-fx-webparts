
import * as React from 'react';
import { IMarker, IMarkerCategory, MarkerType } from './IMapProps';
import './Map.module.scss';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
import { Icon, Panel, TextField, IPanelProps, PrimaryButton, DefaultButton, IChoiceGroupOption, ChoiceGroup, IDropdownOption, Dropdown, getColorFromString, IColor, PanelType, Label, TooltipHost } from 'office-ui-fabric-react';
import { Guid } from '@microsoft/sp-core-library';
import { isNullOrEmpty, isFunction } from '@spfxappdev/utility';
import { InlineColorPicker } from '@src/components/inlineColorPicker/InlineColorPicker';
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import '@spfxappdev/utility/lib/extensions/StringExtensions';
import '@spfxappdev/utility/lib/extensions/ArrayExtensions';
import ManageMarkerCategoriesDialog from './ManageMarkerCategoriesDialog';
import { MarkerIcon } from './MarkerIcon';
import * as strings from 'MapWebPartStrings';
import { IconPicker } from '@src/components/iconPicker/IconPicker';

export interface IAddOrEditPanelProps {
    markerItem: IMarker;
    markerCategories: IMarkerCategory[];
    onDismiss();
    onMarkerChanged(markerItem: IMarker, isNewMarker: boolean);
    onDeleteMarker(markerItem: IMarker);
    onChangePositionClick(markerItem: IMarker);
    onMarkerCategoriesChanged(markerCategories: IMarkerCategory[]);
}

interface IAddOrEditPanelState {
    markerItem: IMarker;
    markerCategories: IMarkerCategory[];
    isSaveButtonDisabled: boolean;
    isManageCategoriesDialogVisible: boolean;
    
}

export default class AddOrEditPanel extends React.Component<IAddOrEditPanelProps, IAddOrEditPanelState> {

    public state: IAddOrEditPanelState = {
        markerItem: cloneDeep(this.props.markerItem),
        markerCategories: cloneDeep(this.props.markerCategories),
        isSaveButtonDisabled: false,
        isManageCategoriesDialogVisible: false
    };

    private readonly isNewMarker: boolean;

    private readonly headerText: string;
    
    private markerTypeOptions: IChoiceGroupOption[] = [
        { key: 'Panel', text: strings.ChoiceGroupPanelLabel, iconProps: { iconName: 'SidePanel' } },
        { key: 'Dialog', text: strings.ChoiceGroupDialogLabel, iconProps: { iconName: 'Favicon' } },
        { key: 'Url', text: strings.ChoiceGroupUrlLabel, iconProps: { iconName: 'Link' } },
        { key: 'None', text: strings.ChoiceGroupNoneLabel, iconProps: { iconName: 'FieldEmpty' } },
    ];

    private urlOptions: IChoiceGroupOption[] = [
        { key: '_self', text: strings.ChoiceGroupTargetSelfLabel },
        { key: '_blank', text: strings.ChoiceGroupTargetBlankLabel },
        { key: 'embedded', text: strings.ChoiceGroupTargetEmbeddedLabel },
      ];

    constructor(props: IAddOrEditPanelProps) {
        super(props);

        this.isNewMarker = this.props.markerItem.id.Equals(Guid.empty.toString());
        this.headerText = this.isNewMarker ? strings.PanelHeaderNewLabel : strings.PanelHeaderEditLabel;
    }

    public componentDidUpdate(prevProps: Readonly<IAddOrEditPanelProps>, prevState: Readonly<IAddOrEditPanelState>, snapshot?: any): void {

        if(!JSON.stringify(prevProps.markerCategories).Equals(JSON.stringify(this.props.markerCategories)) ||
        !JSON.stringify(prevProps.markerItem).Equals(JSON.stringify(this.props.markerItem))) {
            this.setState({
              markerCategories: cloneDeep(this.props.markerCategories),
              markerItem: cloneDeep(this.props.markerItem),
              isSaveButtonDisabled: false
            });
        }
    }
    
    public render(): React.ReactElement<IAddOrEditPanelProps> {

        const selectedCatId: string = this.state.markerCategories.Contains(cat => cat.id.Equals(this.state.markerItem.categoryId)) ? this.state.markerItem.categoryId : Guid.empty.toString();

        return (
            <Panel
              type={PanelType.medium}
              isOpen={true}
              onDismiss={() => { this.onConfigPanelDismiss(); }}
              headerText={this.headerText}
              closeButtonAriaLabel={strings.CloseLabel}
              onRenderFooterContent={(props: IPanelProps) => {
                return this.renderPanelFooter();
              }}
              // Stretch panel content to fill the available height so the footer is positioned
              // at the bottom of the page
              isFooterAtBottom={true}
            >
                <Label>
                    {strings.LabelCategory} 
                    <span 
                        onClick={() => {
                            this.setState({
                                isManageCategoriesDialogVisible: true
                            });
                        }} 
                        className='manage-categories-label'>
                            ({strings.LabelManage})
                    </span>
                </Label> 
              <Dropdown
                placeholder={strings.PlaceholderSelectACategory}
                defaultSelectedKey={selectedCatId}
                onChange={(ev: any, option: IDropdownOption) => {
                  this.state.markerItem.categoryId = option.key.toString();
                  this.setState({
                    markerItem: this.state.markerItem,
                    isSaveButtonDisabled: false
                  });
      
                }}
                options={this.categoryOptions}
              />
              <ChoiceGroup 
                label={strings.LabelMarkerType}
                defaultSelectedKey={this.state.markerItem.type} 
                onChange={(ev: any, option: IChoiceGroupOption) => {
                  this.state.markerItem.type = option.key.toString() as MarkerType;

                //   if( this.state.markerItem.type == "None") {
                //     this.state.markerItem.markerClickProps = undefined;
                //   }
      
                  this.setState({
                    markerItem: this.state.markerItem,
                    isSaveButtonDisabled: false
                  });
                }}
                options={this.markerTypeOptions} />
      
                {this.renderNonCategorySettings()}      
                {this.renderUrlSettings()}
                {this.renderPanelOrDialogSettings()}
                {this.renderManageCategoriesDialog()}
            </Panel>
          );
    }

    private renderPanelFooter(): JSX.Element {
        return (<div className='panel-footer'>
            <PrimaryButton 
                text={strings.SaveLabel}
                disabled={this.state.isSaveButtonDisabled} 
                onClick={() => {

                    if(this.isNewMarker) {
                        this.state.markerItem.id = Guid.newGuid().toString();
                    }
                    
                    this.onSaveMarkerClick(this.state.markerItem);
                }} 
            />

            {!this.isNewMarker &&
            <>
            <DefaultButton text={strings.DeleteLabel} onClick={() => { this.onDeleteMarkerClick(this.state.markerItem); }} />
            <DefaultButton text={strings.ChangePositionLabel} onClick={() => { this.onChangePositionClick(this.state.markerItem); }} />
            </>
            }

            <DefaultButton text={strings.CancelLabel} onClick={() => { this.onConfigPanelDismiss(); }} />
          </div>);
    }

    private renderNonCategorySettings(): JSX.Element {

        if(this.state.markerCategories.Contains(cat => cat.id.Equals(this.state.markerItem.categoryId))) {
            return (<></>);
        }

        return (
            <>
                <InlineColorPicker 
                label={strings.LabelMarkerColor} 
                alphaType='none'
                color={getColorFromString(this.state.markerItem.iconProperties.markerColor)} 
                onChange={(ev: any, color: IColor) => {
                    this.state.markerItem.iconProperties.markerColor = "#" + color.hex;
                    this.setState({
                    markerItem: this.state.markerItem,
                    isSaveButtonDisabled: false
                    });
                }} 
                />
    
                {/* <TextField label={strings.LabelIcon} description={strings.LabelLeaveEmpty} defaultValue={this.state.markerItem.iconProperties.iconName} onChange={(ev: any, iconName: string) => {
                    this.state.markerItem.iconProperties.iconName = iconName;
                    this.setState({
                    markerItem: this.state.markerItem,
                    isSaveButtonDisabled: false
                    });
                }} /> */}

                <IconPicker
                    label={strings.LabelIcon}
                    description={strings.LabelLeaveEmpty}
                    defaultValue={this.state.markerItem.iconProperties.iconName}
                    onIconChanged={(iconName: string) => {
                        this.state.markerItem.iconProperties.iconName = iconName;
                        this.setState({
                            markerItem: this.state.markerItem,
                            isSaveButtonDisabled: false
                        });
                    }} 
                />

                <InlineColorPicker 
                    label={strings.LabelIconColor}
                    alphaType='none'
                    color={getColorFromString(this.state.markerItem.iconProperties.iconColor)} 
                    onChange={(ev: any, color: IColor) => {
                        this.state.markerItem.iconProperties.iconColor = "#" + color.hex;
                        this.setState({
                        markerItem: this.state.markerItem,
                        isSaveButtonDisabled: false
                        });
                    }}
                    isDisbaled={isNullOrEmpty(this.state.markerItem.iconProperties.iconName)}
                />
    
                <Label>
                    {strings.LabelTooltip}
                    <TooltipHost content={strings.TooltipInfo}>
                        <Icon className='info-tooltip' iconName='Info' />
                    </TooltipHost>
                </Label>
                <TextField description={strings.LabelLeaveEmptyTooltip} defaultValue={this.state.markerItem.popuptext} onChange={(ev: any, popuptext: string) => {
                    this.state.markerItem.popuptext = popuptext;
                    this.setState({
                    markerItem: this.state.markerItem,
                    isSaveButtonDisabled: false
                    });
                }} />

                <Label>{strings.LabelPreview}</Label>
                <div style={{position: "relative", height: "36px", }}>
                    <div style={{position: "absolute"}}>
                        <MarkerIcon {...this.state.markerItem.iconProperties} />
                    </div>
                </div>
            </>
        );
    }

    private renderPanelOrDialogSettings(): JSX.Element {

        if(!(this.state.markerItem.type == "Dialog" || this.state.markerItem.type == "Panel")) {
            return (<></>);
        }

        const headerLabel: string = this.state.markerItem.type == "Dialog" ? strings.LabelDialogHeader : strings.LabelPanelHeader;

        return (<>
        <TextField label={headerLabel} defaultValue={this.state.markerItem.markerClickProps.content.headerText} onChange={(ev: any, headerText: string) => {
            this.state.markerItem.markerClickProps.content.headerText = headerText;
            this.setState({
              markerItem: this.state.markerItem,
              isSaveButtonDisabled: false
            });
          }} />

          <Label>{strings.LabelContent}</Label>
          <RichText isEditMode={true} value={this.state.markerItem.markerClickProps.content.html} onChange={(content: string): string => {
            this.state.markerItem.markerClickProps.content.html = content;
            this.setState({
              markerItem: this.state.markerItem,
              isSaveButtonDisabled: false
            });

            return content;
          }} />

        </>);
    }

    private renderUrlSettings(): JSX.Element {

        if(this.state.markerItem.type != "Url") {
            return (<></>);
        }

        return (
            <>
                <TextField label={strings.LabelUrl} type='url' defaultValue={this.state.markerItem.markerClickProps.url.href} onChange={(ev: any, url: string) => {
                    this.state.markerItem.markerClickProps.url.href = url;
                    this.setState({
                    markerItem: this.state.markerItem,
                    isSaveButtonDisabled: false
                    });
                }} />

                <ChoiceGroup 
                    defaultSelectedKey={this.state.markerItem.markerClickProps.url.target} 
                    options={this.urlOptions} 
                    onChange={(ev: any, option: IChoiceGroupOption) => {
                        (this.state.markerItem.markerClickProps.url.target as any) = option.key;
                        
                        this.setState({
                            markerItem: this.state.markerItem,
                            isSaveButtonDisabled: false
                        });
                    }} 
                />
            </>
        );
    }

    private renderManageCategoriesDialog(): JSX.Element {

        if(!this.state.isManageCategoriesDialogVisible) {
            return (<></>);
        }

        return (
        <>
        <ManageMarkerCategoriesDialog 
            markerCategories={this.props.markerCategories} 
            onDismiss={() => {
                this.setState({
                    isManageCategoriesDialogVisible: false
                });
            }}
            onMarkerCategoriesChanged={(markerCategories: IMarkerCategory[]) => {
                
                this.setState({
                    isManageCategoriesDialogVisible: false,
                    markerCategories: markerCategories
                });

                if(isFunction(this.props.onMarkerCategoriesChanged)) {
                    this.props.onMarkerCategoriesChanged(markerCategories);
                }
            }}
        />
        </>
        );
    }

    private onConfigPanelDismiss(): void {
        if(isFunction(this.props.onDismiss)) {
            this.props.onDismiss();
        }
    }

    private onSaveMarkerClick(marker: IMarker): void {

        if(isFunction(this.props.onMarkerChanged)) {
            this.props.onMarkerChanged(marker, this.isNewMarker);
        }
    }

    private onDeleteMarkerClick(marker: IMarker): void {

        if(isFunction(this.props.onDeleteMarker)) {
            this.props.onDeleteMarker(marker);
        }
    }

    private onChangePositionClick(marker: IMarker): void {

        if(isFunction(this.props.onChangePositionClick)) {
            this.props.onChangePositionClick(marker);
        }
    }

    private get categoryOptions(): IDropdownOption[] {
        const categories: IDropdownOption[] = [
            { key: Guid.empty.toString(), text: 'None' }
        ];

        this.state.markerCategories.forEach((category: IMarkerCategory) => {
            categories.push({ key: category.id, text: category.name });
        });

        return categories;
    }
}