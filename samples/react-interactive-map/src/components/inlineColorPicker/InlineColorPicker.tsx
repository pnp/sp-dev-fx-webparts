import * as React from 'react';
import { ColorPicker, IColorPickerProps, getColorFromString, IColor, Callout, Label } from 'office-ui-fabric-react';
import styles from './InlineColorPicker.module.scss';
import { isset, isNullOrEmpty } from '@spfxappdev/utility';

export interface IInlineColorPickerProps extends IColorPickerProps {
    label?: string;
    isDisbaled?: boolean;
}

interface IInlineColorPickerState {
    isPickerVisible: boolean;
}

export class InlineColorPicker extends React.Component<IInlineColorPickerProps, IInlineColorPickerState> {

    public state: IInlineColorPickerState = {
        isPickerVisible: false,
    };

    public static defaultProps: IInlineColorPickerProps = {
        color: '#000000',
        isDisbaled: false
    };

    private targetElement: HTMLDivElement = null;
    
    public render(): React.ReactElement<IInlineColorPickerProps> {


        let bc: IColor = null;
        
        if(typeof this.props.color != "string") {
            bc = this.props.color;
        }
        else {
            bc = getColorFromString(this.props.color);
        }

        const customCss: React.CSSProperties = {
            background: `rgba(${bc.r}, ${bc.g}, ${bc.b}, ${bc.a/100})`
        };

        return (
            <>
            {!isNullOrEmpty(this.props.label) && 
            <Label>{this.props.label}</Label> 
            }
        <div 
        className={styles['inline-color-picker'] + ` ${this.props.isDisbaled?styles['disabled']:''}`} 
        ref={(r) => {
            if(isset(r)) {
                this.targetElement = r;
            }
        }} 
        onClick={() => {

            if(this.props.isDisbaled) {
                return;
            }

            this.setState({ isPickerVisible: true });
        }}>
            <div className={styles['inline-color-picker-inner']} style={customCss}></div>
        </div>
        {this.state.isPickerVisible &&
                <Callout target={this.targetElement} onDismiss={() => {
                    this.setState({ isPickerVisible: false });
                }}>
                    <ColorPicker {...this.props} />
                </Callout>
        }
        </>
        );
    }
}