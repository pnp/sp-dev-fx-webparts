import * as React from 'react';
import ISectionViewProps from "./ISectionViewProps";
import ITextFieldControl from "../../../../../models/ITextFieldControl";

class SectionView extends React.Component<ISectionViewProps, null> {
    public render(): React.ReactElement<void> {

        let sectionControls: JSX.Element[] = [];
        
        this.props.section.controls.map((control, index) => {

            switch (control.type) {

                case "TextFieldControl":
                    const textFieldControl = control as ITextFieldControl;
                    sectionControls.push(
                        <div key={ index } dangerouslySetInnerHTML={ {__html: textFieldControl.content } }></div> 
                    );
                    break;

                default:
                    break;
            }
        });

        return  (<div> 
                    { sectionControls }
                </div>);
    }
}

export default SectionView;