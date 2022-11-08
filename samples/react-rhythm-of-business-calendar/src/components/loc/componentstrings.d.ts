declare module 'ComponentStrings' {
    import { IButtonStrings, IFieldStrings, ITextFieldStrings, IToggleFieldStrings } from "common";

    interface IConfigurationWizardStrings {
        Heading: string;
        SetRefinersHeading: string;
        SetRefinersDescription: string;
        AddEventsHeading: string;
        AddEventsDescription: string;
        SetApproversHeading: string;
        SetApproversDescription: string;
        StartButton: IButtonStrings;
        SetupComplete: string;
        MustBeTeamOwner: string;
        MustBeSiteAdmin: string;
    }

    interface IUpgradeStrings {
        Heading: string;
        InProgressHeading: string;
        CompletedHeading: string;
        Description: string;
        CannotUpgrade: string;
        UpgradeButton: IButtonStrings;
    }

    interface IViewNames {
        Day: string;
        Week: string;
        Month: string;
        Quarter: string;
    }

    interface IViewRouteStrings {
        Command_NewEvent: IButtonStrings;
        Command_Settings: IButtonStrings;
        Command_Approvals: IButtonStrings;
        RefinerRailLabel: string;
        Command_CollapseRefinerRail: IButtonStrings;
        Command_AddRefiner: IButtonStrings;
    }

    interface IDayViewStrings {
        NoEventsMessage: string;
    }

    interface IWeekViewStrings {
        Command_NewEvent: IButtonStrings;
    }

    interface IMonthViewStrings {
        Command_NewEvent: IButtonStrings;
    }

    interface IQuarterViewStrings {
        NoEventsMessage: string;
        MultipleOccurrences: string;
    }

    interface IRefinerStrings {
        SelectAll: string;
        Blank: string;
        Command_Edit: IButtonStrings;
    }

    interface IListItemTechnicalsStrings {
        Field_Created: IFieldStrings;
        Field_Modified: IFieldStrings;
    }

    interface IHumanizeStrings {
        AllDay: string;
        Day: string;
        Weekday: string;
        Weekend: string;
        First: string;
        Second: string;
        Third: string;
        Fourth: string;
        Last: string;
        HumanizePattern: string;
        Pattern_Until: { Forever: string; Date: string; Count: string; };
        Pattern_Daily_EachWeekday: string;
        Pattern_Daily_EveryNDays: { Singular: string; Plural: string; };
        Pattern_Weekly: { Singular: string; Plural: string; AllDays: string; };
        Pattern_Monthly_ByDate: { Singular: string; Plural: string; };
        Pattern_Monthly_ByDay: { Singular: string; Plural: string; };
        Pattern_Yearly_ByDate: { Singular: string; Plural: string; };
        Pattern_Yearly_ByDay: { Singular: string; Plural: string; };
    }

    interface IRecurrencePatternsStrings {
        Pattern: string;
        Daily_EveryNDays: string;
        Daily_Weekdays: string;
        Weekly: string;
        Monthly_ByDate: string;
        Monthly_ByDay: string;
        Yearly_ByDate: string;
        Yearly_ByDay: string;
        Until: string;
        Until_Forever: string;
        Until_Date: string;
        Until_Count: string;
        Field_EveryNDays: IFieldStrings;
        Field_EveryNWeeks: IFieldStrings;
        Field_EveryNMonths: IFieldStrings;
        Field_WeekOf: IFieldStrings;
        Field_Day: IFieldStrings;
        Field_Month: IFieldStrings;
        Field_Date: IFieldStrings;
        Field_UntilCount: IFieldStrings;
        Field_UntilDate: IFieldStrings;
        Command_Increment: IButtonStrings;
        Command_Decrement: IButtonStrings;
    }

    interface IEventOverviewStrings {
        Confidential: string;
    }

    interface IEventCommandsStrings {
        Command_View: IButtonStrings;
        Command_AddToOutlook: IButtonStrings;
        Command_AddToOutlook_Recurring_Series: IButtonStrings;
        Command_AddToOutlook_Recurring_Instance: IButtonStrings;
        Command_GetLink: IButtonStrings;
    }

    interface IEventPanelStrings {
        NewEvent: string;
        AllDay: string;
        SpecificStartAndEndTime: string;
        Field_Title: ITextFieldStrings;
        Field_StartDate: IFieldStrings;
        Field_StartTime: IFieldStrings;
        Field_EndDate: IFieldStrings;
        Field_EndTime: IFieldStrings;
        Field_AllDayEvent: IToggleFieldStrings;
        Field_Recurring: IToggleFieldStrings;
        Field_Location: ITextFieldStrings;
        Field_Description: ITextFieldStrings;
        Field_Contacts: IFieldStrings;
        Field_Confidential: IToggleFieldStrings;
        Field_RestrictedToAccounts_Display: IFieldStrings;
        Field_RestrictedToAccounts_Edit: IFieldStrings;
        Recurrence: {
            Daily: string;
            Weekly: string;
            Monthly: string;
            Yearly: string;
            UpdateWarning: string;
            EditingInstanceWarning: string;
            Command_EditSeries: IButtonStrings;
            EditSeriesButtonExplanation: string;
        };
        ThisInstanceOccursOn: string;
        Moderation: {
            EventIsPendingApproval: string;
            EventWillNeedApproval: string;
            EventWillBeAutoApproved: string;
            EventIsApproved: string;
            EventIsRejected: string;
            ModeratorMessage: string;
        };
        Command_Edit: IButtonStrings;
        Command_Edit_Recurring_Series: IButtonStrings;
        Command_Edit_Recurring_Instance: IButtonStrings;
        Command_Save: IButtonStrings;
        Command_Discard: IButtonStrings;
        Command_AddToOutlook: IButtonStrings;
        Command_AddToOutlook_Recurring_Series: IButtonStrings;
        Command_AddToOutlook_Recurring_Instance: IButtonStrings;
        Command_GetLink: IButtonStrings;
        Command_Approval: IButtonStrings;
        Command_Approval_Approve: IButtonStrings;
        Command_Approval_Reject: IButtonStrings;
        Command_Delete: IButtonStrings;
        Command_Delete_Series: IButtonStrings;
        Command_Delete_Recurring_Series: IButtonStrings;
        Command_Delete_Recurring_Instance: IButtonStrings;
    }

    interface IApprovalEmailsStrings {
        RequestEmail: {
            Subject: string;
            Intro: string;
            EventLinkText: string;
            EventDetailsHeading: string;
        },
        RejectedEmail: {
            Subject: string;
            Intro: string;
            EventLinkText: string;
            NoReasonGiven: string;
            EventDetailsHeading: string;
        },
        EventDetails: {
            EventName: string;
            Location: string;
            DateAndTime: string;
            Description: string;
            ConfidentialEvent: string;
        },
        RefinerNoValueSelected: string;
    }

    interface IApprovalDialogStrings {
        Title: string;
        Field_ModerationStatus: IFieldStrings;
        ModerationStatus: {
            Pending: string;
            Approve: string;
            Approved: string;
            Reject: string;
            Rejected: string;
        };
        Field_ModerationComments: ITextFieldStrings;
        Command_Submit: IButtonStrings;
        Command_Cancel: IButtonStrings;
    }

    interface IApproversPanelStrings {
        Field_Title_DisplayMode: ITextFieldStrings;
        Field_Title_EditMode: ITextFieldStrings;
        Field_Users: IFieldStrings;
        ApprovalExplanation: string;
        AnyValue: string;
        AnyRefinerValue: string;
        ValueForRefiner: string;
        ValueListConjunction: string;
        Command_Edit: IButtonStrings;
        Command_Save: IButtonStrings;
        Command_Discard: IButtonStrings;
        Command_Delete: IButtonStrings;
    }

    interface IConfigureApproversPanelStrings {
        HeaderText: string;
        Column_Title: string;
        Column_Users: string;
        AnyValue: string;
        ValueListConjunction: string;
        AdminApproversMessage_Teams: string;
        AdminApproversMessage_SharePoint: string;
        NoApproversDefined: string;
        Command_Close: IButtonStrings;
        Command_Add: IButtonStrings;
        Command_Edit: IButtonStrings;
        Command_View: IButtonStrings;
    }

    interface IMyApprovalsPanelStrings {
        HeaderText: string;
        NoEventsToApprove: string;
        Command_Close: IButtonStrings;
        Command_View: IButtonStrings;
        Command_Approve: IButtonStrings;
        Command_Reject: IButtonStrings;
    }

    interface IRefinerPanelStrings {
        RefinerHeadingPrefix: string;
        NewRefinerDefaultHeading: string;
        Field_Name: ITextFieldStrings;
        Field_Required: IToggleFieldStrings;
        Field_AllowMultiselect: IToggleFieldStrings;
        Field_InitialDisplay: IToggleFieldStrings;
        Field_UseColors: IToggleFieldStrings;
        Field_UseTags: IToggleFieldStrings;
        Field_CustomSort: IToggleFieldStrings;
        Field_RefinerValues: IFieldStrings;
        Field_RefinerValue_Name: ITextFieldStrings;
        Field_RefinerValue_Tag: ITextFieldStrings;
        Field_RefinerValue_Archive: IToggleFieldStrings;
        Command_AddRefinerValue: IButtonStrings;
        Command_DeleteRefinerValue: IButtonStrings;
        Command_ReorderRefinerValue: IButtonStrings;
        Command_Edit: IButtonStrings;
        Command_Save: IButtonStrings;
        Command_Discard: IButtonStrings;
        Command_Delete: IButtonStrings;
    }

    interface ISettingsPanelStrings {
        Heading: string;
        Field_FiscalYear: IFieldStrings;
        Field_DefaultView: ITextFieldStrings;
        Field_UseRefiners: IToggleFieldStrings;
        Field_RefinerRailInitialDisplay: IToggleFieldStrings;
        Field_QuarterViewGroupByRefiner: IFieldStrings;
        Field_UseApprovals: IToggleFieldStrings;
        Field_AllowConfidentialEvents: IToggleFieldStrings;
        Field_Refiners: IFieldStrings;
        Command_ConfigureApprovers: IButtonStrings;
        Command_AddRefiner: IButtonStrings;
        Command_EditRefiner: IButtonStrings;
        Command_ReorderRefiner: IButtonStrings;
        Command_Edit: IButtonStrings;
        Command_Save: IButtonStrings;
        Command_Back: IButtonStrings;
    }

    interface ICopyLinkDialogStrings {
        Title: string;
        SubText: string;
        Field_Url: IFieldStrings;
    }

    interface IValidationStrings {
        Daily: {
            EveryNRequired: string;
        };
        Weekly: {
            EveryNRequired: string;
            DaysRequired: string;
        };
        MonthlyByDate: {
            DateRequired: string;
            EveryNRequired: string;
        };
        MonthlyByDay: {
            EveryNRequired: string;
        };
        YearlyByDate: {
            DateRequired: string;
        };
        Until: {
            EndDateRequired: string;
            EndDateAfterStart: string;
            CountRequired: string;
        };
        Refiners: {
            NotValid: string;
            Required: string;
        }
    }

    interface IComponentStrings {
        AppName: string;
        PersistConcurrencyFailureMessage: string;
        ConfigurationWizard: IConfigurationWizardStrings;
        UpgradeStrings: IUpgradeStrings;
        ViewNames: IViewNames;
        ViewRoute: IViewRouteStrings;
        DayView: IDayViewStrings;
        WeekView: IWeekViewStrings;
        MonthView: IMonthViewStrings;
        QuarterView: IQuarterViewStrings;
        Refiner: IRefinerStrings;
        ListItemTechnicals: IListItemTechnicalsStrings;
        Humanize: IHumanizeStrings;
        RecurrencePatterns: IRecurrencePatternsStrings;
        EventOverview: IEventOverviewStrings;
        EventCommands: IEventCommandsStrings;
        EventPanel: IEventPanelStrings;
        ApprovalEmails: IApprovalEmailsStrings;
        ApprovalDialog: IApprovalDialogStrings;
        ApproversPanel: IApproversPanelStrings;
        ConfigureApproversPanel: IConfigureApproversPanelStrings;
        MyApprovalsPanel: IMyApprovalsPanelStrings;
        RefinerPanel: IRefinerPanelStrings;
        SettingsPanel: ISettingsPanelStrings;
        CopyLinkDialog: ICopyLinkDialogStrings;
        Validation: IValidationStrings;
    }

    const strings: IComponentStrings;
    export = strings;
}
