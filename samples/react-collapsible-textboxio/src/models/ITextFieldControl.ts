import IBaseSectionControl from "./IBaseSectionControl";

interface ITextFieldControl extends IBaseSectionControl {

    /**
     * Content of the text field
     */
    content: string;
    
    /**
     * Default text to display in a section description to help user to fill it with the right content
     */
    placeHolderText?: string;
}

export default ITextFieldControl;