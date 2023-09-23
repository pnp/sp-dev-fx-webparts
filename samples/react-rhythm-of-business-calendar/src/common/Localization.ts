export interface IButtonStrings {
    Text: string;
    AriaLabel?: string;
    Description?: string;
    Tooltip?: string;
}

export interface IFieldStrings {
    Label: string;
    AriaLabel?: string;
    Tooltip?: string;
}

export interface ITextFieldStrings extends IFieldStrings {
    Placeholder?: string;
}

export interface IToggleFieldStrings extends IFieldStrings {
    OnText: string;
    OffText: string;
}

export interface IDialogStrings {
    HeadingText: string;
    MessageText: string;
    AcceptButton?: IButtonStrings;
    RejectButton?: IButtonStrings;
}

export interface IWizardStrings {
    StartButton: IButtonStrings;
    BackButton: IButtonStrings;
    NextButton: IButtonStrings;
    FinishButton: IButtonStrings;
    CloseButtonAriaLabel: string;
}