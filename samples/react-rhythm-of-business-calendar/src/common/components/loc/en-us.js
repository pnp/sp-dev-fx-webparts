define([], function () {
    return {
        Loading: "Loading...",
        Saving: "Saving...",
        OneMoment: "One moment...",
        GenericError: "Sorry, something went wrong.",
        GenericEmptyListMessage: "We can't find anything to show here.",
        Close: "Close",
        Humanize: {
            ZeroCount: "no {0}",
            HourShort: "hr",
            HoursShort: "hrs",
            MinuteShort: "min",
            MinutesShort: "mins",
            ListSeparator: ",",
            ListConjunction: "and",
            ListExcept: "except",
            ListAllItems: "All items"
        },
        Validation: {
            ValidationFailed: "Please fix all validation errors.",
            Required: "This field is required.",
            MinimumValue: "This field cannot be less than {0}.",
            MaximumValue: "This field cannot be greater than {0}.",
            RangeValue: "This field must be from {0} and {1}.",
            MaximumLength: "This field cannot have more than {0} characters.",
            MaximumItems: "This cannot have more than {0} items.",
            Url: "This field must be a valid URL.",
            Email: "This field must be a valid e-mail address.",
            Phone: "This field must be a valid US phone number"
        },
        ConfirmDialogDefaults: {
            HeadingText: "Confirm",
            MessageText: "Are you sure?",
            AcceptButton: { Text: "OK" },
            RejectButton: { Text: "Cancel" }
        },
        ConfirmDeleteDialog: {
            HeadingText: "Delete",
            MessageText: "Are you sure you want to delete?",
            AcceptButton: { Text: "Delete" },
            RejectButton: { Text: "Cancel" }
        },
        ConfirmDiscardDialog: {
            HeadingText: "Discard",
            MessageText: "Are you sure you want to discard changes?",
            AcceptButton: { Text: "Discard" },
            RejectButton: { Text: "Keep Editing" }
        },
        DateRotator: {
            PreviousDateButton: { Text: "Previous date" },
            NextDateButton: { Text: "Next date" },
        },
        Wizard: {
            StartButton: { Text: "Start" },
            BackButton: { Text: "Back" },
            NextButton: { Text: "Next" },
            FinishButton: { Text: "Finish" },
            CloseButtonAriaLabel: "close wizard button"
        },
        UserPicker: {
            RemoveAriaLabel: "Remove"
        },
        LiveUpdate: {
            New: "New!",
            Updated: "Updated",
            Deleted: "Deleted",
            RecentlyAddedMarkTooltip: "Someone added this item recently",
            RecentlyEditedMarkTooltip: "Other people have made edits recently",
            RecentlyDeletedMarkTooltip: "Someone deleted this item",
            Callout: {
                ItemWasAdded: "{0} added this item {1}",
                ItemWasEdited: "{0} made edits {1}",
                ItemWasDeleted: "This item was deleted",
                MyChangeLabel: "My edit",
                TheirChangeLabel: "Their change",
                OriginalLabel: "Original",
                KeepMineButton: { Text: "Keep mine" },
                KeepTheirsButton: { Text: "Keep theirs" },
                TakeTheirsButton: { Text: "Take theirs" },
                RevertToOriginalButton: { Text: "Revert to original" },
                UndeleteButton: { Text: "Restore this item" }
            },
            Toggle: {
                OnText: "On",
                OffText: "Off"
            }
        }
    };
});