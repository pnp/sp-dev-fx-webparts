import * as React from 'react';
import { ChangedFormEvent, ChoiceValue, ISPListField } from "./ISPListFields";
import { LinkFieldValue } from './LinkFieldValue';
import { RestLookupFieldValue } from './RestLookupFieldValue';
/**
 * TODO
 * PREVENT LOADING: https://de.reactjs.org/docs/react-component.html#shouldcomponentupdate
 * Lifecycle: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
 *
 * Github UI 9
 * https://github.com/microsoft/fluentui
 * RoadMap: https://github.com/microsoft/fluentui/wiki/Fluent-UI-React-v9-Component-Roadmap
 *
 *
 * https://learn.microsoft.com/de-de/previous-versions/office/sharepoint-csom/ee540543(v=office.15)
 * 7 "<Field Type="Lookup" DisplayName="Kontakt:E-Mail" List="cc58cd01-2208-4150-8479-2b2a43252a6a" WebId="20e378fa-6c95-4c13-97cf-475388cdd8c6" ShowField="E_x002d_Mail" FieldRef="11c6ae9e-f621-47fb-970c-7e84d1b178f9" ReadOnly="TRUE" UnlimitedLengthInDocumentLibrary="FALSE" ID="{5e469cc7-37c4-4d01-90ae-92a93c0ea865}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Kontakt_x003a_E_x002d_Mail" Name="Kontakt_x003a_E_x002d_Mail" Version="1" />"
 * 3 "<Field Type="Note" DisplayName="MulipleText" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" NumLines="6" RichText="TRUE" RichTextMode="FullHtml" IsolateStyles="TRUE" Sortable="FALSE" ID="{c7956ee9-2cc1-415d-8d27-bafc2b458680}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="MulipleText" Name="MulipleText" ColName="ntext3" RowOrdinal="0" />"
 * 6 "<Field Type="Choice" DisplayName="Choice (OPTIONS)" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="RadioButtons" FillInChoice="FALSE" ID="{2eef270f-f37f-494b-9459-b85352dc6b5a}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Choice_x0020__x0028_OPTIONS_x002" Name="Choice_x0020__x0028_OPTIONS_x002" ColName="nvarchar11" RowOrdinal="0" Version="1"><Default>Option 1</Default><CHOICES><CHOICE>Option 1</CHOICE><CHOICE>Option 2</CHOICE><CHOICE>Option 3</CHOICE><CHOICE>Option 4</CHOICE></CHOICES></Field>"
 * 15 "<Field Type="MultiChoice" DisplayName="Choice (Multiple)" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" FillInChoice="FALSE" ID="{3412a836-13fa-47ea-92e8-543953c48654}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Choice_x0020__x0028_Multiple_x00" Name="Choice_x0020__x0028_Multiple_x00" ColName="ntext4" RowOrdinal="0" Version="1"><Default>Option 1</Default><CHOICES><CHOICE>Option 1</CHOICE><CHOICE>Option 2</CHOICE><CHOICE>Option 3</CHOICE><CHOICE>Option 4</CHOICE></CHOICES></Field>"
 * 9 "<Field Type="Number" DisplayName="Number" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" ID="{ddba5cae-b839-4ca2-b98d-d7775a338175}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Number" Name="Number" ColName="float1" RowOrdinal="0" />"
 * 10 "<Field Type="Currency" DisplayName="Currency" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" LCID="1031" ID="{341d8419-9aa9-4a6c-acf8-ccbd0b730812}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Currency" Name="Currency" ColName="float2" RowOrdinal="0" />"
 * 4 "<Field Type="DateTime" DisplayName="DateOnly" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="DateOnly" FriendlyDisplayFormat="Disabled" ID="{0f7688d3-cca8-4b41-87f4-e8819ab1d932}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="DateOnly" Name="DateOnly" ColName="datetime1" RowOrdinal="0" />"
 * 4 "<Field Type="DateTime" DisplayName="DateAndTime" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="DateTime" FriendlyDisplayFormat="Disabled" ID="{5c24f347-83bf-4098-ae1b-ee6116cd3aea}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="DateAndTime" Name="DateAndTime" ColName="datetime2" RowOrdinal="0" />"
 * 8 "<Field Type="Boolean" DisplayName="YesNo" EnforceUniqueValues="FALSE" Indexed="FALSE" ID="{e865f35f-0c28-451c-b750-be1604e916ed}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="YesNo" Name="YesNo" ColName="bit1" RowOrdinal="0"><Default>1</Default></Field>"
 * 12 "<Field ID="{82642ec8-ef9b-478f-acf9-31f7d45fbc31}" ReadOnly="TRUE" Type="Computed" Name="LinkTitle" DisplayName="Title" DisplayNameSrcField="Title" ClassInfo="Menu" AuthoringInfo="(linked to item with edit menu)" ListItemMenuAllowed="Required" LinkToItemAllowed="Prohibited" SourceID="http://schemas.microsoft.com/sharepoint/v3" StaticName="LinkTitle" FromBaseType="TRUE"><FieldRefs><FieldRef Name="Title" /><FieldRef Name="LinkTitleNoMenu" /><FieldRef Name="_EditMenuTableStart2" /><FieldRef Name="_EditMenuTableEnd" /></FieldRefs><DisplayPattern><FieldSwitch><Expr><GetVar Name="FreeForm" /></Expr><Case Value="TRUE"><Field Name="LinkTitleNoMenu" /></Case><Default><HTML><![CDATA[<div class="ms-vb itx" onmouseover="OnItem(this)" CTXName="ctx]]></HTML><Field Name="_EditMenuTableStart2" /><HTML><![CDATA[">]]></HTML><Field Name="LinkTitleNoMenu" /><HTML><![CDATA[</div>]]></HTML><HTML><![CDATA[<div class="s4-ctx" onmouseover="OnChildItem(this.parentNode); return false;">]]></HTML><HTML><![CDATA[<span>&nbsp;</span>]]></HTML><HTML><![CDATA[<a onfocus="OnChildItem(this.parentNode.parentNode); return false;" onclick="PopMenuFromChevron(event); return false;" href="javascript:;" title="Open Menu"></a>]]></HTML><HTML><![CDATA[<span>&nbsp;</span>]]></HTML><HTML><![CDATA[</div>]]></HTML></Default></FieldSwitch></DisplayPattern></Field>"
 * 20 "<Field Type="User" DisplayName="Person" List="UserInfo" Required="FALSE" EnforceUniqueValues="FALSE" ShowField="ImnName" UserSelectionMode="PeopleOnly" UserSelectionScope="0" ID="{737f5379-7404-4a0b-9e42-a1beee85f68a}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Person" Name="Person" ColName="int2" RowOrdinal="0" />"
 * 11 "<Field Type="URL" DisplayName="LinkOrImage" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" Format="Hyperlink" ID="{1e0ea48f-f39c-4cfe-92fa-978dd0f6c784}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="LinkOrImage" Name="LinkOrImage" ColName="nvarchar12" RowOrdinal="0" ColName2="nvarchar13" RowOrdinal2="0" />"
 * 33 "<Field DisplayName="Details" Format="Dropdown" IsModern="TRUE" Name="Details" Title="Details" Type="Location" ID="{d256e1c8-02b5-4ee1-b2b7-664c634f700f}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="Details" ColName="ntext2" RowOrdinal="0" />"
 * 34 "<Field Type="Thumbnail" DisplayName="OnlyImage" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" ID="{423329b0-41e7-4452-bca6-2ccac301f6df}" SourceID="{9516d5e4-aa12-4931-a5a5-9b5e6c15db91}" StaticName="OnlyImage" Name="OnlyImage" ColName="ntext5" RowOrdinal="0" />"
*/
type FormFieldState = {
    errorMessage: string;
    currentFormValue: LinkFieldValue | string | string[] | boolean | ChoiceValue | Date | RestLookupFieldValue;
    lookupChoices?: ChoiceValue[];
};
export declare class FormControlFluentUI extends React.Component<ISPListField, FormFieldState> {
    onFormdataChanged?: ChangedFormEvent;
    private UI_LABELSIZE;
    constructor(fieldData: ISPListField);
    private _onDateTimeChanged;
    private _onBlurHandlerDatePicker;
    private _onBlurHandler;
    private _onBlurHandlerTextArea;
    private _onChangedRadioGroupList;
    private _onDropdDownSelectionChanged;
    private manageFormFieldChanges;
    componentDidMount(): void;
    private qryLookupListData;
    private formatFieldValue;
    render(): React.ReactElement<ISPListField>;
    private renderFormControl;
}
export {};
//# sourceMappingURL=FormControlFluentUI.d.ts.map