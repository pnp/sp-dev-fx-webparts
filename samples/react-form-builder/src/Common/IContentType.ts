export interface IContentType {
    ClientFormCustomFormatter: string
    Description: string
    DisplayFormClientSideComponentId: string
    DisplayFormClientSideComponentProperties: string
    DisplayFormTarget: number
    DisplayFormTemplateName: string
    DisplayFormUrl: string
    DocumentTemplate: string
    DocumentTemplateUrl: string
    EditFormClientSideComponentId: string
    EditFormClientSideComponentProperties: string
    EditFormTarget: number
    EditFormTemplateName: string
    EditFormUrl: string
    Group: string
    Hidden: boolean
    Id: ContentTypeId
    JSLink: string
    MobileDisplayFormUrl: string
    MobileEditFormUrl: string
    MobileNewFormUrl: string
    Name: string
    NewFormClientSideComponentId: any
    NewFormClientSideComponentProperties: string
    NewFormTarget: number
    NewFormTemplateName: string
    NewFormUrl: string
    ReadOnly: boolean
    SchemaXml: string
    Scope: string
    Sealed: boolean
    StringId: string
}

export interface ContentTypeId {
    StringValue: string
}
