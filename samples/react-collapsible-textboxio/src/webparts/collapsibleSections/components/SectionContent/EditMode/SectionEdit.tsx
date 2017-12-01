import * as React from 'react';
import ISectionEditProps from "./ISectionEditProps";
import IBaseSectionControl from "../../../../../models/IBaseSectionControl";
import ITextFieldControl from "../../../../../models/ITextFieldControl";
import * as update from 'immutability-helper';
import * as ReactDOM from 'react-dom';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { Text } from "@microsoft/sp-core-library";
import ContentZoneEditor from "./ContentZoneEditor";

export default class SectionEdit extends React.Component<ISectionEditProps, null> {

    public constructor(props: ISectionEditProps) {
        super(props);

        this._onControlUpdated = this._onControlUpdated.bind(this);
    }

    private _onControlUpdated(updatedControl: IBaseSectionControl, controlIndex: number) {

        // Update the control data at specified index
        // We use immutability helper to avoid reference object memory conflicts (which is the case when you only update the base section directly)
        const updatedSection = update(this.props.section, {controls: {[controlIndex]: {$set: updatedControl} }} );
        this.props.onSectionUpdated(updatedSection);
    }  

    public render(): React.ReactElement<void> {

        let sectionControls: JSX.Element[] = [];

        this.props.section.controls.map((control, index) => {

            // Add you custom controls here
            switch (control.type) {
                case "TextFieldControl": 
                    const textFieldControl = control as ITextFieldControl;

                    sectionControls.push(
                        <ContentZoneEditor 
                            key={ this.props.section.id }
                            content={ textFieldControl.content } 
                            locale={ this.props.locale }
                            onContentChanged={ (newContent: string) => {
                                const newControl = update(textFieldControl, {content: {$set: newContent}} );
                                this._onControlUpdated(newControl, index);
                            }}
                        />
                    );
                    
                    break;
            }
        });

        return (
            <div>
                { sectionControls }            
            </div>
        );
    }
}
