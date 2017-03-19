"use strict";
var BreadcrumbPage_1 = require('../../pages/BreadcrumbPage/BreadcrumbPage');
var ButtonPage_1 = require('../../pages/ButtonPage/ButtonPage');
var CalloutPage_1 = require('../../pages/CalloutPage/CalloutPage');
var ColorPickerPage_1 = require('../../pages/ColorPickerPage/ColorPickerPage');
var DocumentCardPage_1 = require('../../pages/DocumentCardPage/DocumentCardPage');
var CalendarPage_1 = require('../../pages/CalendarPage/CalendarPage');
var CheckboxPage_1 = require('../../pages/CheckboxPage/CheckboxPage');
var ChoiceGroupPage_1 = require('../../pages/ChoiceGroupPage/ChoiceGroupPage');
var CommandBarPage_1 = require('../../pages/CommandBarPage/CommandBarPage');
var ContextualMenuPage_1 = require('../../pages/ContextualMenuPage/ContextualMenuPage');
var DatePickerPage_1 = require('../../pages/DatePickerPage/DatePickerPage');
var DetailsListPage_1 = require('../../pages/DetailsListPage/DetailsListPage');
var DialogPage_1 = require('../../pages/DialogPage/DialogPage');
var DropdownPage_1 = require('../../pages/DropdownPage/DropdownPage');
var FacepilePage_1 = require('../../pages/Facepile/FacepilePage');
var FocusZonePage_1 = require('../../pages/FocusZonePage/FocusZonePage');
var FocusTrapZonePage_1 = require('../../pages/FocusTrapZonePage/FocusTrapZonePage');
var GroupedListPage_1 = require('../../pages/GroupedListPage/GroupedListPage');
var ImagePage_1 = require('../../pages/ImagePage/ImagePage');
var LabelPage_1 = require('../../pages/LabelPage/LabelPage');
var LayerPage_1 = require('../../pages/LayerPage/LayerPage');
var LinkPage_1 = require('../../pages/LinkPage/LinkPage');
var ListPage_1 = require('../../pages/ListPage/ListPage');
var MarqueeSelectionPage_1 = require('../../pages/MarqueeSelectionPage/MarqueeSelectionPage');
var MessageBarPage_1 = require('../../pages/MessageBarPage/MessageBarPage');
var NavPage_1 = require('../../pages/NavPage/NavPage');
var OverlayPage_1 = require('../../pages/OverlayPage/OverlayPage');
var PanelPage_1 = require('../../pages/PanelPage/PanelPage');
var PeoplePickerPage_1 = require('../../pages/PeoplePickerPage/PeoplePickerPage');
var PickersPage_1 = require('../../pages/PickersPage/PickersPage');
var PersonaPage_1 = require('../../pages/PersonaPage/PersonaPage');
var PivotPage_1 = require('../../pages/PivotPage/PivotPage');
var ProgressIndicatorPage_1 = require('../../pages/ProgressIndicatorPage/ProgressIndicatorPage');
var SearchBoxPage_1 = require('../../pages/SearchBoxPage/SearchBoxPage');
var SelectionPage_1 = require('../../pages/SelectionPage/SelectionPage');
var SliderPage_1 = require('../../pages/SliderPage/SliderPage');
var SpinnerPage_1 = require('../../pages/SpinnerPage/SpinnerPage');
var TeachingBubblePage_1 = require('../../pages/TeachingBubblePage/TeachingBubblePage');
var TextFieldPage_1 = require('../../pages/TextFieldPage/TextFieldPage');
var TogglePage_1 = require('../../pages/TogglePage/TogglePage');
var TooltipPage_1 = require('../../pages/TooltipPage/TooltipPage');
var ThemePage_1 = require('../../pages/ThemePage/ThemePage');
var DetailsList_Basic_Example_1 = require('../../pages/DetailsListPage/examples/DetailsList.Basic.Example');
(function (ExampleStatus) {
    ExampleStatus[ExampleStatus["placeholder"] = 0] = "placeholder";
    ExampleStatus[ExampleStatus["started"] = 1] = "started";
    ExampleStatus[ExampleStatus["beta"] = 2] = "beta";
    ExampleStatus[ExampleStatus["release"] = 3] = "release";
})(exports.ExampleStatus || (exports.ExampleStatus = {}));
var ExampleStatus = exports.ExampleStatus;
exports.AppState = {
    appTitle: 'Fabric - React',
    testPages: [
        {
            component: DetailsList_Basic_Example_1.DetailsListBasicExample,
            key: 'DetailsListBasicExample',
            name: 'DetailsListBasicExample',
            url: '#/tests/detailslistbasicexample'
        }
    ],
    examplePages: [
        {
            links: [
                {
                    component: BreadcrumbPage_1.BreadcrumbPage,
                    key: 'Breadcrumb',
                    name: 'Breadcrumb',
                    status: ExampleStatus.beta,
                    url: '#/examples/breadcrumb'
                },
                {
                    component: ButtonPage_1.ButtonPage,
                    key: 'Button',
                    name: 'Button',
                    status: ExampleStatus.beta,
                    url: '#/examples/button'
                },
                {
                    component: CalendarPage_1.CalendarPage,
                    key: 'Calendar',
                    name: 'Calendar',
                    status: ExampleStatus.started,
                    url: '#/examples/calendar'
                },
                {
                    component: CalloutPage_1.CalloutPage,
                    key: 'Callout',
                    name: 'Callout',
                    status: ExampleStatus.beta,
                    url: '#/examples/callout'
                },
                {
                    component: CheckboxPage_1.CheckboxPage,
                    key: 'Checkbox',
                    name: 'Checkbox',
                    status: ExampleStatus.beta,
                    url: '#/examples/checkbox'
                },
                {
                    component: ChoiceGroupPage_1.ChoiceGroupPage,
                    key: 'ChoiceGroup',
                    name: 'ChoiceGroup',
                    status: ExampleStatus.beta,
                    url: '#/examples/choicegroup'
                },
                {
                    component: CommandBarPage_1.CommandBarPage,
                    key: 'CommandBar',
                    name: 'CommandBar',
                    status: ExampleStatus.beta,
                    url: '#/examples/commandbar'
                },
                {
                    component: ContextualMenuPage_1.ContextualMenuPage,
                    key: 'ContextualMenu',
                    name: 'ContextualMenu',
                    status: ExampleStatus.beta,
                    url: '#/examples/contextmenu'
                },
                {
                    component: DatePickerPage_1.DatePickerPage,
                    key: 'DatePicker',
                    name: 'DatePicker',
                    status: ExampleStatus.beta,
                    url: '#/examples/datepicker'
                },
                {
                    component: DetailsListPage_1.DetailsListPage,
                    key: 'DetailsList',
                    name: 'DetailsList',
                    status: ExampleStatus.beta,
                    url: '#/examples/detailslist'
                },
                {
                    component: DialogPage_1.DialogPage,
                    key: 'Dialog',
                    name: 'Dialog',
                    status: ExampleStatus.beta,
                    url: '#/examples/dialog'
                },
                {
                    component: DocumentCardPage_1.DocumentCardPage,
                    key: 'DocumentCard',
                    name: 'DocumentCard',
                    status: ExampleStatus.beta,
                    url: '#/examples/documentcard'
                },
                {
                    component: DropdownPage_1.DropdownPage,
                    key: 'Dropdown',
                    name: 'Dropdown',
                    status: ExampleStatus.beta,
                    url: '#/examples/dropdown'
                },
                {
                    component: FacepilePage_1.FacepilePage,
                    key: 'Facepile',
                    name: 'Facepile',
                    status: ExampleStatus.started,
                    url: '#/examples/facepile'
                },
                {
                    component: LabelPage_1.LabelPage,
                    key: 'Label',
                    name: 'Label',
                    status: ExampleStatus.beta,
                    url: '#/examples/label'
                },
                {
                    component: LinkPage_1.LinkPage,
                    key: 'Link',
                    name: 'Link',
                    status: ExampleStatus.beta,
                    url: '#/examples/link'
                },
                {
                    component: ListPage_1.ListPage,
                    key: 'List',
                    name: 'List',
                    status: ExampleStatus.beta,
                    url: '#/examples/list'
                },
                {
                    component: MessageBarPage_1.MessageBarPage,
                    key: 'MessageBar',
                    name: 'MessageBar',
                    status: ExampleStatus.placeholder,
                    url: '#/examples/messagebar'
                },
                {
                    component: OverlayPage_1.OverlayPage,
                    key: 'Overlay',
                    name: 'Overlay',
                    status: ExampleStatus.beta,
                    url: '#/examples/overlay'
                },
                {
                    component: PanelPage_1.PanelPage,
                    key: 'Panel',
                    name: 'Panel',
                    status: ExampleStatus.beta,
                    url: '#/examples/panel'
                },
                {
                    component: PickersPage_1.PickersPage,
                    key: 'Pickers',
                    name: 'Pickers',
                    status: ExampleStatus.started,
                    url: '#/examples/pickers'
                },
                {
                    component: PeoplePickerPage_1.PeoplePickerPage,
                    key: 'PeoplePicker',
                    name: 'PeoplePicker',
                    status: ExampleStatus.started,
                    url: '#/examples/PeoplePicker'
                },
                {
                    component: PersonaPage_1.PersonaPage,
                    key: 'Persona',
                    name: 'Persona',
                    status: ExampleStatus.beta,
                    url: '#/examples/persona'
                },
                {
                    component: PivotPage_1.PivotPage,
                    key: 'Pivot',
                    name: 'Pivot',
                    status: ExampleStatus.started,
                    url: '#/examples/pivot'
                },
                {
                    component: ProgressIndicatorPage_1.ProgressIndicatorPage,
                    key: 'ProgressIndicator',
                    name: 'ProgressIndicator',
                    status: ExampleStatus.beta,
                    url: '#/examples/progressindicator'
                },
                {
                    component: SearchBoxPage_1.SearchBoxPage,
                    key: 'SearchBox',
                    name: 'SearchBox',
                    status: ExampleStatus.started,
                    url: '#/examples/searchbox'
                },
                {
                    component: SpinnerPage_1.SpinnerPage,
                    key: 'Spinner',
                    name: 'Spinner',
                    status: ExampleStatus.beta,
                    url: '#/examples/spinner'
                },
                {
                    component: TeachingBubblePage_1.TeachingBubblePage,
                    key: 'TeachingBubble',
                    name: 'TeachingBubble',
                    status: ExampleStatus.beta,
                    url: '#/examples/teachingbubble'
                },
                {
                    component: TextFieldPage_1.TextFieldPage,
                    key: 'TextField',
                    name: 'TextField',
                    status: ExampleStatus.beta,
                    url: '#/examples/textfield'
                },
                {
                    component: TogglePage_1.TogglePage,
                    key: 'Toggle',
                    name: 'Toggle',
                    status: ExampleStatus.beta,
                    url: '#/examples/toggle'
                },
                {
                    component: TooltipPage_1.TooltipPage,
                    key: 'Tooltip',
                    name: 'Tooltip',
                    status: ExampleStatus.beta,
                    url: '#/examples/Tooltip'
                }
            ],
            name: 'Basic components'
        },
        {
            links: [
                {
                    component: ColorPickerPage_1.ColorPickerPage,
                    key: 'ColorPicker',
                    name: 'ColorPicker',
                    status: ExampleStatus.started,
                    url: '#/examples/colorpicker'
                },
                {
                    component: GroupedListPage_1.GroupedListPage,
                    key: 'GroupedList',
                    name: 'GroupedList',
                    status: ExampleStatus.started,
                    url: '#examples/groupedlist'
                },
                {
                    component: ImagePage_1.ImagePage,
                    key: 'Image',
                    name: 'Image',
                    status: ExampleStatus.beta,
                    url: '#/examples/image'
                },
                {
                    component: LayerPage_1.LayerPage,
                    key: 'Layer',
                    name: 'Layer',
                    status: ExampleStatus.beta,
                    url: '#/examples/layer'
                },
                {
                    component: NavPage_1.NavPage,
                    key: 'Nav',
                    name: 'Nav',
                    status: ExampleStatus.started,
                    url: '#/examples/nav'
                },
                {
                    component: SliderPage_1.SliderPage,
                    key: 'Slider',
                    name: 'Slider',
                    status: ExampleStatus.beta,
                    url: '#/examples/slider'
                }
            ],
            name: 'Extended components'
        },
        {
            links: [
                {
                    component: FocusTrapZonePage_1.FocusTrapZonePage,
                    key: 'FocusTrapZone',
                    name: 'FocusTrapZone',
                    status: ExampleStatus.beta,
                    url: '#examples/focustrapzone'
                },
                {
                    component: FocusZonePage_1.FocusZonePage,
                    key: 'FocusZone',
                    name: 'FocusZone',
                    status: ExampleStatus.beta,
                    url: '#examples/focuszone'
                },
                {
                    component: MarqueeSelectionPage_1.MarqueeSelectionPage,
                    key: 'MarqueeSelection',
                    name: 'MarqueeSelection',
                    status: ExampleStatus.beta,
                    url: '#examples/marqueeselection'
                },
                {
                    component: SelectionPage_1.SelectionPage,
                    key: 'Selection',
                    name: 'Selection',
                    status: ExampleStatus.beta,
                    url: '#examples/selection'
                },
                {
                    component: ThemePage_1.ThemePage,
                    key: 'Themes',
                    name: 'Themes',
                    url: '#examples/themes'
                }
            ],
            name: 'Utilities'
        }
    ],
    headerLinks: [
        {
            name: 'Getting started',
            url: '#/'
        },
        {
            name: 'Fabric',
            url: 'http://dev.office.com/fabric'
        },
        {
            name: 'Github',
            url: 'http://www.github.com/officedev'
        }
    ]
};

//# sourceMappingURL=AppState.js.map
