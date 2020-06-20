import * as React from 'react';

//import styles from './KanbanBucketConfigurator.module.scss';

import * as strings from 'KanbanBoardStrings';
import { TextField, MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { Slider } from 'office-ui-fabric-react/lib/Slider';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { cloneDeep, clone, isEqual } from '@microsoft/sp-lodash-subset';
import {
    ColorPicker,
    ChoiceGroup,
    IChoiceGroupOption,
    getColorFromString,
    IColor,
    IColorPickerStyles,
    IColorPickerProps,
    PrimaryButton,
    DefaultButton,
    ThemeSettingName,
} from 'office-ui-fabric-react/lib/index';

import { IKanbanBucket } from './IKanbanBucket';


export interface IKanbanBucketConfiguratorProps {
    index: number;
    bucket: IKanbanBucket;
    update: (index: number, value: IKanbanBucket) => void;
}

export interface IKanbanBucketConfiguratorState {
    bucket?: IKanbanBucket;
    // showHeadline: boolean;
    useColor: boolean;
}

export default class KanbanBucketConfigurator extends React.Component<IKanbanBucketConfiguratorProps, IKanbanBucketConfiguratorState> {

    constructor(props: IKanbanBucketConfiguratorProps) {
        super(props);
        this.state = {
            //       showHeadline: false,
            useColor: false
        };

    }
    public componentDidMount(): void {
        this.resetState();
    }

    public componentDidUpdate(prevProps: IKanbanBucketConfiguratorProps): void {
        if (prevProps.bucket && this.props.bucket && !isEqual(this.props.bucket, prevProps.bucket)) {
            this.resetState();
        }
    }

    public render(): React.ReactElement<IKanbanBucketConfiguratorProps> {
        /*
        const columnProps: Partial<IStackProps> = {
            gap: 15,
            styles: { root: { width: 300 } },
        };*/
        /*
        const colorPickerStyles: Partial<IColorPickerStyles> = {
            panel: { padding: 12 },
            root: {
                maxWidth: 352,
                minWidth: 352,
            },
            colorRectangle: { height: 268 },
        };*/
        const statebucket = this.state.bucket;
        if (!statebucket) {
            return (<div></div>);
        }
        return (
            <Stack>
                <TextField label={strings.BucketConfigInternalName} disabled defaultValue={statebucket.bucket} />
                {/*   <Toggle label={strings.BucketConfigUseCustomHeadline} onText="On" offText="Off" inlineLabel
                    checked={this.state.showHeadline}
                    onChange={(ev, checked) => { this.setState({ showHeadline: checked }); }} />
                    */}
                <TextField label={strings.BucketConfigHeadline} defaultValue={statebucket.bucketheadline}
                onChanged={(value: string) => {
                    const bucket = clone(this.state.bucket);
                    bucket.bucketheadline = value;
                    this.setState({ bucket: bucket });
                }}
                />

                <Slider
                    label={strings.BucketConfigPercentageComplete}
                    max={100}
                    value={statebucket.percentageComplete}
                    ariaValueText={(value: number) => `${value} ${strings.Percent}`}
                    valueFormat={(value: number) => `${value}%`}
                    showValue
                    onChange={(value: number) => {
                        const bucket = clone(this.state.bucket);
                        bucket.percentageComplete = value;
                        this.setState({ bucket: bucket });
                    }}
                />
                <Toggle label={strings.BucketConfigAllowAddTask} onText="On" offText="Off" inlineLabel
                    checked={statebucket.allowAddTask}
                    onChange={(ev, checked) => {
                        const bucket = clone(this.state.bucket);
                        bucket.allowAddTask = checked;
                        this.setState({ bucket: bucket });
                    }} />
                <Toggle label={strings.BucketConfigUseColor} onText="On" offText="Off" inlineLabel
                    checked={this.state.useColor}
                    onChange={(ev, checked) => { this.setState({ useColor: checked }); }} />
                {this.state.useColor && (<ColorPicker

                    color={statebucket.color}

                    // alphaSliderHidden={false}
                    // showPreview={true}
                    onChange={(ev: any, colorObj: IColor) => {
                        const bucket = clone(this.state.bucket);
                        bucket.color =  colorObj.str;
                        this.setState({ bucket: bucket });
                    }
                    }
                // The ColorPicker provides default English strings for visible text.
                // If your app is localized, you MUST provide the `strings` prop with localized strings.
                /*
                FluentUI
                strings={{
                    // By default, the sliders will use the text field labels as their aria labels.
                    // If you'd like to provide more detailed instructions, you can use these props.
                    alphaAriaLabel: 'Alpha slider: Use left and right arrow keys to change value, hold shift for a larger jump',
                    transparencyAriaLabel:
                        'Transparency slider: Use left and right arrow keys to change value, hold shift for a larger jump',
                    hueAriaLabel: 'Hue slider: Use left and right arrow keys to change value, hold shift for a larger jump',
                }}
                */
                />
                )}
                <Stack>

                    <PrimaryButton text={strings.BucketConfigSave} onClick={this.submitData.bind(this)} />
                    {/* <!-- TODO Confirmation --!> */}
                    <DefaultButton text={strings.BucketConfigReset} onClick={this.resetState.bind(this)} />
                </Stack>

            </Stack>
        );
    }

    private resetState():void {
        const newbucket: IKanbanBucket = clone(this.props.bucket);
        this.setState({
            bucket: newbucket,
            //    showHeadline: newbucket.bucketheadline && newbucket.bucketheadline.length > 0,
            useColor: newbucket.color && newbucket.color.length > 0
        });
    }
    private submitData():void {
        debugger;
        const newbucket: IKanbanBucket = clone(this.state.bucket);
        if (!this.state.useColor) {
            newbucket.color = undefined;
        }
        /*
        if (!this.state.showHeadline) {
            newbucket.color = undefined;
        }
        */
        if (this.props.update) {
            this.props.update(this.props.index, newbucket);
        }
    }

}
