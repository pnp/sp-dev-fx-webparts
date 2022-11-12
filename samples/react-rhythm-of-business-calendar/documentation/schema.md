# Schema
Schema refers to the SharePoint elements that need to be provisioned and configured on the site for the app to function and be able to securely store data, such as lists, views and columns, and even custom security groups. The SPFx Solution Accelerator includes robust patterns and utilities for defining, provisioning, and upgrading the app's schema.

The code describing the app's schema is located under the [/src/schema](../src/schema/) folder.

During startup, the app should check that the schema has been provisioned on the current site (usually this is simply a check to determine if the Configuration list for the app exists).  If the schema has not been provisioned, then the app should display a setup screen/wizard for the user to configure any settings required to provision the application on the site.  Then the app should use the `ElementProvisioner` class to ensure the schema is provisioned on the site.

See [/src/components/setup/ConfigurationWizard.tsx](../src/components/setup/ConfigurationWizard.tsx) for an example of a basic setup wizard that provisions the schema.

## Supported elements
The schema can define, and the element provisioner can create and manage, the following types of SharePoint elements:
* Lists - generic, events, document library, and picture library
    * Columns - Text, DateTime, Number, Yes/No, Choice, Lookup, User, Hyperlink, and more
    * Views
* Site columns
* Site security groups
* Site custom permission levels

## Defining the root schema object
A root schema is an object that implements `IElementDefinitions`.  Here is a basic schema:
```
export const CurrentSchemaVersion: number = 1.0;

export const AppSchema = buildLiveSchema<IElementDefinitions>({
    version: CurrentSchemaVersion,
    lists: [
        EventsList,
        RefinersList,
        RefinerValuesList
    ],
    upgrades: [
    ]
});
```

This defines the current version of the schema and specifies three lists to provision.  It does not include any upgrade definitions since it is still on version 1.  See [RhythmOfBusinessCalendarSchema.ts](../src/schema/RhythmOfBusinessCalendarSchema.ts) for a full example of a schema.

## Defining a list
A list is an object that implements `IListDefinition`.  It specifies the name of the list, the type of list, the columns, views, and permissions, as well as any dependencies on other lists (such as in the case of a lookup column).

A basic list looks like this:
```
export const RefinersList: IListDefinition = {
    title: 'Refiners',
    description: '',
    template: ListTemplateType.GenericList,
    fields: [
        Field_Order
    ],
    views: [
        View_AllRefinerValues
    ]
};
```

Lists also support defining custom permissions (break role inheritence) with the built-in SP groups or custom security groups, creating default list items, moderation and versioning settings, ratings, and more.

## Defining a view
A list view is an object that implements `IViewDefinition`.  It specifies properties such as the name of the view, the row limit, whether it uses paging, which fields to show in the view, and can also include a CAML query for filtering, sorting, and or grouping.

A basic view looks like this:
```
const View_AllRefiners: IViewDefinition = {
    title: "All Refiners",
    fields: includeStandardViewFields(
        Field_Order
    )
};
```

The `includeStandardViewFields` utility function adds the "ID", "Title", "Author", "Editor", "Created", and "Modified" fields that are needed when loading data for a `ListItemEntity`.

## Defining a field
A field is a column in a list and is defined by an object that implements one of the field definition-derived interfaces.  Each field type in SharePoint has a corresponding interface that enables type-safe definitions.

A basic number field is defined like this:
```
const Field_Order: INumberFieldDefinition = {
    type: FieldType.Number,
    name: 'Order',
    min: 0
};
```

The `name` of the field is the internal name of the column in SharePoint.  If you would like to have the column name appear differently when displayed to a user browsing the list, specify the `displayName` property too.  `displayName` is optional and will use the value of `name` if not specified.  Use the `required` boolean property to specify if the field is required.  There are many other properties common to all field definitions, such as `indexed`, `hidden`, `readonly`, `hideInNewForm`, and more.

Field Type|Interface|Comments
---|---|---
Title|ITitleFieldDefinition|Used for updating properties of the built-in Title field, like changing the display name or max length
Text|ITextFieldDefinition|Supports single- and mult-line, as well as various level of rich text
Yes/No|IBooleanFieldDefinition|
DateTime|IDateTimeFieldDefinition|Can specify the format as date and time, or date-only
Number|INumberFieldDefinition|Can specify the min and max allowed values, as well as whether to display as a percentage
Currency|ICurrencyFieldDefinition|Can specify the min and max allowed values, as well as the currency locale ID
Hyperlink|IHyperlinkFieldDefinition|
Picture|IPictureFieldDefinition|
Users/Groups|IUserFieldDefinition|Can indicate if the field allows multiple users, as well as if it supports only users or both users and groups
Choice|IChoiceFieldDefinition|Specify the list of choices as a string array, and the default value
Lookup|ILookupFieldDefinition|Can specify that the lookup is multivalued, which list to reference, and which field to show
Taxonomoy|ITaxonomyFieldDefinition|Can specify the term group name or 'sitecollection', the term set, the anchor term, whether or not to allow fill-in choices, and whether to allow muultiple values
Calculated (text output)|ICalculatedTextFieldDefinition|
Calculated (number output)|ICalculatedNumberFieldDefinition|
Calculated (currency output)|ICalculatedCurrencyFieldDefinition|
Calculated (date/time output)|ICalculatedDateTimeFieldDefinition|
Calculated (yes/no output)|ICalculatedBooleanFieldDefinition|
