declare module 'CommonStrings' {
    import { IButtonStrings, IDialogStrings, IWizardStrings } from "../Localization";

    interface IHumanizeStrings {
        ZeroCount: string;
        HourShort: string;
        HoursShort: string;
        MinuteShort: string;
        MinutesShort: string;
        ListSeparator: string;
        ListConjunction: string;
        ListExcept: string;
        ListAllItems: string;
    }

    interface IValidationStrings {
        ValidationFailed: string;
        Required: string;
        MinimumValue: string;
        MaximumValue: string;
        RangeValue: string;
        MaximumLength: string;
        MaximumItems: string;
        Url: string;
        Email: string;
        Phone: string;
    }

    interface IDataRotatorStrings {
        PreviousDateButton: IButtonStrings;
        NextDateButton: IButtonStrings;
    }

    interface IUserPickerStrings {
        RemoveAriaLabel: string;
    }

    interface ILiveUpdateCalloutStrings {
        ItemWasAdded: string;
        ItemWasEdited: string;
        ItemWasDeleted: string;
        MyChangeLabel: string;
        TheirChangeLabel: string;
        OriginalLabel: string;
        KeepMineButton: IButtonStrings;
        KeepTheirsButton: IButtonStrings;
        TakeTheirsButton: IButtonStrings;
        RevertToOriginalButton: IButtonStrings;
        UndeleteButton: IButtonStrings;
    }

    interface ILiveToggleStrings {
        OnText: string;
        OffText: string;
    }

    interface ILiveUpdateStrings {
        New: string;
        Updated: string;
        Deleted: string;
        RecentlyAddedMarkTooltip: string;
        RecentlyEditedMarkTooltip: string;
        RecentlyDeletedMarkTooltip: string;
        Callout: ILiveUpdateCalloutStrings;
        Toggle: ILiveToggleStrings;
    }

    interface ICommonStrings {
        Loading: string;
        Saving: string;
        OneMoment: string;
        GenericError: string;
        GenericEmptyListMessage: string;
        Close: string;
        Humanize: IHumanizeStrings;
        Validation: IValidationStrings;
        ConfirmDialogDefaults: IDialogStrings;
        ConfirmDeleteDialog: IDialogStrings;
        ConfirmDiscardDialog: IDialogStrings;
        DateRotator: IDataRotatorStrings;
        Wizard: IWizardStrings;
        UserPicker: IUserPickerStrings;
        LiveUpdate: ILiveUpdateStrings;
    }

    const strings: ICommonStrings;
    export = strings;
}
