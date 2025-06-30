import * as React from "react";
import { IColumn, Toggle } from "@fluentui/react";
import { IExtension } from "../Models/Extension";
import { ListTypeStrings } from "../Models/ListType";
import { LocationStrings } from "../Models/Location";

const DefaultColumn: (key: string) => IColumn = (key: string) => ({ key: key, fieldName: key, name: key, minWidth: 125, isResizable: true });
export const Columns: IColumn[] = [
    { ...DefaultColumn("TenantWideExtensionDisabled"), name: "Enabled", maxWidth: 60, onRender: (item: IExtension) => <Toggle disabled checked={!item.TenantWideExtensionDisabled} /> },
    { ...DefaultColumn("Title") },
    { ...DefaultColumn("TenantWideExtensionLocation"), name: "Location", minWidth: 250, onRender: (item: IExtension) => <span>{LocationStrings[item.TenantWideExtensionLocation]}</span> },
    { ...DefaultColumn('TenantWideExtensionListTemplate'), name: "List type", minWidth: 250, onRender: (item: IExtension) => <span>{ListTypeStrings[item.TenantWideExtensionListTemplate]}</span> },
]