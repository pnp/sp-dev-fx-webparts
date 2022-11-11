define([], function () {
    return {
        AppName: "Rhythm of Business Calendar",
        PersistConcurrencyFailureMessage: "Another user has saved changes. Please wait for the updates to be received and then try saving again.",
        ConfigurationWizard: {
            Heading: "Welcome to {0}!",
            SetRefinersHeading: "Configure refiners",
            SetRefinersDescription: "Define custom attributes that you would like to associate with events, then use them to slice and dice the calendar data.",
            AddEventsHeading: "Add events",
            AddEventsDescription: "Create a single or recurring event, mark it confidential, and color-code it using refiners you define.",
            SetApproversHeading: "Set approvers",
            SetApproversDescription: "Create you own approval workflow for events based on the refiners you define.",
            StartButton: { Text: "Let's go!" },
            SetupComplete: "Setup is complete.",
            MustBeTeamOwner: "An owner of this Team needs to configure the app.",
            MustBeSiteAdmin: "An admin for this site needs to configure the app."
        },
        UpgradeStrings: {
            Heading: "Upgrade required",
            InProgressHeading: "Upgrading...",
            CompletedHeading: "Upgrade complete",
            Description: "This app needs to upgrade the data schema.",
            CannotUpgrade: "We're sorry, this app cannot be upgraded from",
            UpgradeButton: { Text: "Upgrade" }
        },
        ViewNames: {
            Day: "Day",
            Week: "Week",
            Month: "Month",
            Quarter: "Quarter"
        },
        ViewRoute: {
            Command_NewEvent: { Text: "New event" },
            Command_Settings: { Text: "Settings" },
            Command_Approvals: { Text: "Approvals" },
            RefinerRailLabel: "Refiners",
            Command_CollapseRefinerRail: { Tooltip: "collapse refiner rail", AriaLabel: "collapse refiner rail" },
            Command_AddRefiner: { Text: "Add refiner" }
        },
        DayView: {
            NoEventsMessage: "There are no events on this day"
        },
        WeekView: {
            Command_NewEvent: { Text: "New" },
        },
        MonthView: {
            Command_NewEvent: { Text: "New" },
        },
        QuarterView: {
            NoEventsMessage: "No events",
            MultipleOccurrences: "Multiple"
        },
        Refiner: {
            SelectAll: "Select all",
            Blank: "(blank)",
            Command_Edit: { Tooltip: "Edit refiner", AriaLabel: "edit refiner" }
        },
        ListItemTechnicals: {
            Field_Created: { Label: "Created on" },
            Field_Modified: { Label: "Last modified" }
        },
        Humanize: {
            AllDay: "All day event",
            Day: "day",
            Weekday: "weekday",
            Weekend: "weekend day",
            First: "first",
            Second: "second",
            Third: "third",
            Fourth: "fourth",
            Last: "last",
            HumanizePattern: "{0}, starting {1} {2}",
            Pattern_Until: {
                Forever: "",
                Date: "through {0}",
                Count: "for {0} occurrences"
            },
            Pattern_Daily_EachWeekday: "Each weekday",
            Pattern_Daily_EveryNDays: {
                Singular: "Each day",
                Plural: "Every {0} days"
            },
            Pattern_Weekly: {
                Singular: "On {0} each week",
                Plural: "On {0} every {1} weeks",
                AllDays: "all days"
            },
            Pattern_Monthly_ByDate: {
                Singular: "On the {0} of each month",
                Plural: "On the {0} of every {1} months"
            },
            Pattern_Monthly_ByDay: {
                Singular: "On the {0} {1} of each month",
                Plural: "On the {0} {1} of every {2} months"
            },
            Pattern_Yearly_ByDate: {
                Singular: "On {0} {1} each year",
                Plural: "On {0} {1} of every {2} years"
            },
            Pattern_Yearly_ByDay: {
                Singular: "On the {0} {1} of each year",
                Plural: "On the {0} {1} of every {2} years"
            }
        },
        RecurrencePatterns: {
            Pattern: "Pattern",
            Daily_EveryNDays: "Every {every} day(s)",
            Daily_Weekdays: "Every weekday",
            Weekly: "Every {every} week(s) on:",
            Monthly_ByDate: "Day {date} of every {every} month(s)",
            Monthly_ByDay: "The {weekof} {day} of every {every} month(s)",
            Yearly_ByDate: "Every {month} {date}",
            Yearly_ByDay: "The {weekof} {day} of {month}",
            Until: "Until",
            Until_Forever: "No end date",
            Until_Date: "End by {date}",
            Until_Count: "End after {count} occurence(s)",
            Field_EveryNDays: { AriaLabel: "every N days" },
            Field_EveryNWeeks: { AriaLabel: "every N weeks" },
            Field_EveryNMonths: { AriaLabel: "every N months" },
            Field_WeekOf: { AriaLabel: "week of" },
            Field_Day: { AriaLabel: "day" },
            Field_Month: { AriaLabel: "month" },
            Field_Date: { AriaLabel: "date" },
            Field_UntilCount: { AriaLabel: "end after N occurrences" },
            Field_UntilDate: { AriaLabel: "end by date" },
            Command_Increment: { Tooltip: "Increment", AriaLabel: "increment" },
            Command_Decrement: { Tooltip: "Decrement", AriaLabel: "decrement" },
        },
        EventOverview: {
            Confidential: "Confidential"
        },
        EventCommands: {
            Command_View: { Text: "View" },
            Command_AddToOutlook: { Text: "Add to Outlook" },
            Command_AddToOutlook_Recurring_Series: { Text: "Entire series" },
            Command_AddToOutlook_Recurring_Instance: { Text: "Just this occurence" },
            Command_GetLink: { Text: "Get link" },
        },
        EventPanel: {
            NewEvent: "New event",
            AllDay: "All day event",
            SpecificStartAndEndTime: "Specific start and end time",
            Field_Title: { Label: "Title" },
            Field_StartDate: { Label: "Start date" },
            Field_StartTime: { Label: "Start time" },
            Field_EndDate: { Label: "End date" },
            Field_EndTime: { Label: "End time" },
            Field_AllDayEvent: { Label: "All day event", OnText: "Yes", OffText: "No" },
            Field_Recurring: { Label: "Recurring event", OnText: "Yes", OffText: "No" },
            Field_Location: { Label: "Location" },
            Field_Description: { Label: "Description" },
            Field_Contacts: { Label: "Event contacts", Tooltip: "People who are the point of contact for this event" },
            Field_Confidential: { Label: "Confidential", OnText: "Yes", OffText: "No", Tooltip: "Make this a confidential event that only you, the team owners, the designated approver(s), and the specified groups will be able to see on the calendar" },
            Field_RestrictedToAccounts_Display: { Label: "Group(s) that can see this event" },
            Field_RestrictedToAccounts_Edit: { Label: "Only you, the team owners, the designated approver(s), and members of the below group(s) will be able to see this event" },
            Recurrence: {
                Daily: "Daily",
                Weekly: "Weekly",
                Monthly: "Monthly",
                Yearly: "Yearly",
                UpdateWarning: "Updating recurrence options will cause any exceptions to the original pattern to be lost",
                EditingInstanceWarning: "You are editing an instance of the series that occurs on {0}",
                Command_EditSeries: { Text: "Edit the series" },
                EditSeriesButtonExplanation: "if you need to change the recurrence pattern."
            },
            ThisInstanceOccursOn: "This instance occurs on {0}",
            Moderation: {
                EventIsPendingApproval: "This event needs approval to appear on the calendar",
                EventWillNeedApproval: "This event will need approval before it will appear on the calendar",
                EventWillBeAutoApproved: "This event will be automatically approved",
                EventIsApproved: "This event was approved by {0} on {1}",
                EventIsRejected: "This event was declined by {0} on {1}",
                ModeratorMessage: "Message from moderator:"
            },
            Command_Edit: { Text: "Edit" },
            Command_Edit_Recurring_Series: { Text: "Series" },
            Command_Edit_Recurring_Instance: { Text: "This occurence" },
            Command_Save: { Text: "Save" },
            Command_Discard: { Text: "Discard changes" },
            Command_AddToOutlook: { Text: "Add to Outlook" },
            Command_AddToOutlook_Recurring_Series: { Text: "Entire series" },
            Command_AddToOutlook_Recurring_Instance: { Text: "Just this occurence" },
            Command_GetLink: { Text: "Get link" },
            Command_Approval: { Text: "Approval" },
            Command_Approval_Approve: { Text: "Approve" },
            Command_Approval_Reject: { Text: "Decline" },
            Command_Delete: { Text: "Delete" },
            Command_Delete_Series: { Text: "Delete series" },
            Command_Delete_Recurring_Series: { Text: "Entire series" },
            Command_Delete_Recurring_Instance: { Text: "Just this occurence" }
        },
        ApprovalEmails: {
            RequestEmail: {
                Subject: "Your approval is requested",
                Intro: "An event requiring your approval has been submitted to the {0} by {1}.",
                EventLinkText: "Please approve or decline this event.",
                EventDetailsHeading: "Event details:"
            },
            RejectedEmail: {
                Subject: "Your event was declined",
                Intro: "An event you submitted to the {0} has been declined by {1}",
                EventLinkText: "View event in the calendar",
                NoReasonGiven: "(none given)",
                EventDetailsHeading: "Event details:"
            },
            EventDetails: {
                EventName: "Event",
                Location: "Location",
                DateAndTime: "Date and time",
                Description: "Description",
                ConfidentialEvent: "This is a confidential event."
            },
            RefinerNoValueSelected: "(no value selected)"
        },
        ApprovalDialog: {
            Title: "Approve event \"{0}\"?",
            Field_ModerationStatus: { Label: "Do you approve this event?" },
            ModerationStatus: {
                Pending: "Pending",
                Approve: "Approve",
                Approved: "Approved",
                Reject: "Decline",
                Rejected: "Declined"
            },
            Field_ModerationComments: { Label: "Comments (optional)" },
            Command_Submit: { Text: "Submit" },
            Command_Cancel: { Text: "Cancel" }
        },
        ApproversPanel: {
            Field_Title_DisplayMode: { Label: "Name" },
            Field_Title_EditMode: { Label: "Give this group of approvers a descriptive name" },
            Field_Users: { Label: "Users" },
            ApprovalExplanation: "These users can approve events with:",
            AnyValue: "Any value",
            AnyRefinerValue: "Any {0}",
            ValueForRefiner: "{0} for {1}",
            ValueListConjunction: "or",
            Command_Edit: { Text: "Edit" },
            Command_Save: { Text: "Save" },
            Command_Discard: { Text: "Discard changes" },
            Command_Delete: { Text: "Delete" }
        },
        ConfigureApproversPanel: {
            HeaderText: "Configure Approvers",
            Column_Title: "Name",
            Column_Users: "Users",
            AnyValue: "Any value",
            ValueListConjunction: "or",
            AdminApproversMessage_Teams: "Team owners will always be able to approve events.",
            AdminApproversMessage_SharePoint: "Site Administrators will always be able to approve events.",
            NoApproversDefined: "You have not defined any approvers.",
            Command_Close: { Text: "Close", Tooltip: "Close", AriaLabel: "close" },
            Command_Add: { Text: "New" },
            Command_Edit: { Text: "Edit" },
            Command_View: { Text: "View" },
        },
        MyApprovalsPanel: {
            HeaderText: "Events needing your approval",
            NoEventsToApprove: "You're all caught up. There are no events pending approval.",
            Command_Close: { Text: "Close", Tooltip: "Close", AriaLabel: "close" },
            Command_View: { Text: "View details" },
            Command_Approve: { Text: "Approve" },
            Command_Reject: { Text: "Decline" }
        },
        RefinerPanel: {
            RefinerHeadingPrefix: "Refiner",
            NewRefinerDefaultHeading: "New refiner",
            Field_Name: { Label: "Name" },
            Field_Required: { Label: "Required", OnText: "Yes", OffText: "No", Tooltip: "If required, users must choose one of this refiner's values when submitting an event, otherwise users may leave that field blank on the event form" },
            Field_AllowMultiselect: { Label: "Selection", OnText: "Multiselect", OffText: "Single select", Tooltip: "Multiselect allows users to associate more than one of this refiner's values with an event" },
            Field_InitialDisplay: { Label: "Initial display", OnText: "Expanded", OffText: "Collapsed", Tooltip: "Whether this refiner will initially display expanded or collapsed when the app starts" },
            Field_UseColors: { Label: "Use colors", OnText: "Yes", OffText: "No", Tooltip: "Turn on or off custom colors for this refiner's values. Only one of your refiners may use colors." },
            Field_UseTags: { Label: "Use tags", OnText: "Yes", OffText: "No", Tooltip: "Turn on or off custom tags for this refiner's values. Tags are short names (up to 3 characters) for each refiner value. Only one of your refiners may use tags." },
            Field_CustomSort: { Label: "Sorting", OnText: "Custom", OffText: "Alphabetical", Tooltip: "Whether to automatically sort the refiner values alphabetically or to enable specifying a custom ordering" },
            Field_RefinerValues: { Label: "Refiner values" },
            Field_RefinerValue_Name: { Label: "Name", Placeholder: "Value" },
            Field_RefinerValue_Tag: { Label: "Tag", Placeholder: "Tag" },
            Field_RefinerValue_Archive: { AriaLabel: "Active", OnText: "Active", OffText: "Inactive", Tooltip: "This refiner value is currently being referenced by one or more events. By marking it inactive, those events will be hidden from the calendar." },
            Command_DeleteRefinerValue: { Text: "Delete", Tooltip: "Delete refiner value", AriaLabel: "delete refiner value" },
            Command_AddRefinerValue: { Text: "Add" },
            Command_ReorderRefinerValue: { AriaLabel: "reorder this refiner value" },
            Command_Edit: { Text: "Edit" },
            Command_Save: { Text: "Save" },
            Command_Discard: { Text: "Discard changes" },
            Command_Delete: { Text: "Delete" }
        },
        SettingsPanel: {
            Heading: "Settings",
            Field_FiscalYear: { Label: "First month of your fiscal year", Tooltip: "Determines the fiscal quarter for the calendar view" },
            Field_DefaultView: { Label: "Initial view", Tooltip: "Default view that should appear to all users when the app starts" },
            Field_UseRefiners: { Label: "Use refiners", OnText: "Yes", OffText: "No", Tooltip: "Turn refiners on or off" },
            Field_RefinerRailInitialDisplay: { Label: "Refiners rail initial display", OnText: "Expanded", OffText: "Collapsed", Tooltip: "Whether the refiner rail will initially display expanded or collapsed when the app starts" },
            Field_QuarterViewGroupByRefiner: { Label: "Quarter view - group by", Tooltip: "Determines how events are grouped in the quarter view" },
            Field_UseApprovals: { Label: "Use approvals", OnText: "Yes", OffText: "No", Tooltip: "Turn on or off approval workflow for events" },
            Field_AllowConfidentialEvents: { Label: "Allow confidential events", OnText: "Yes", OffText: "No", Tooltip: "Turn on or off the ability for users to create events that are only visible to specific people or groups" },
            Field_Refiners: { Label: "Refiners" },
            Command_ConfigureApprovers: { Text: "Configure Approvers", Tooltip: "Create an approval matrix to define who will approve which events" },
            Command_AddRefiner: { Text: "Add refiner" },
            Command_EditRefiner: { Text: "Edit refiner", Tooltip: "Edit refiner", AriaLabel: "edit refiner" },
            Command_ReorderRefiner: { AriaLabel: "reorder this refiner" },
            Command_Edit: { Text: "Edit" },
            Command_Save: { Text: "Save" },
            Command_Back: { Text: "Back" }
        },
        CopyLinkDialog: {
            Title: "Copy a link to \"{0}\"",
            SubText: "Press Ctrl + C to get a link to this event that you can share with your teammates.",
            Field_Url: { AriaLabel: "URL" }
        },
        Validation: {
            Daily: {
                EveryNRequired: "Must specify a number"
            },
            Weekly: {
                EveryNRequired: "Must specify a number",
                DaysRequired: "Must select at least one day"
            },
            MonthlyByDate: {
                DateRequired: "Must specify a number",
                EveryNRequired: "Must specify a number"
            },
            MonthlyByDay: {
                EveryNRequired: "Must specify a number"
            },
            YearlyByDate: {
                DateRequired: "Must specify a number"
            },
            Until: {
                EndDateRequired: "Must specify a date",
                EndDateAfterStart: "Must be after start date",
                CountRequired: "Must specify a number"
            },
            Refiners: {
                NotValid: "Refiner selections are not valid",
                Required: "This is required"
            }
        }
    };
});