import { DetailsList } from "@fluentui/react";
import * as React from "react";

export interface IEntitiesTableProps {
    entities: any[];
    columns?: string[];
}

export function EntitiesTable(props: IEntitiesTableProps): JSX.Element {
    const isPrimitive: (value: any) => boolean = (value: any) => {
        return value !== Object(value);
    }
    const columnNames = props.columns || Object.keys(props.entities[0]);
    const columns = columnNames.map(column => ({
        key: column,
        name: column,
        fieldName: column,
        minWidth: 100,
        onRender: (item: any) => {
            return <span>{isPrimitive(item[column]) ? item[column] : JSON.stringify(item[column])}</span>
        }
    }))


    return (<DetailsList
        items={props.entities}
        columns={columns}
        setKey="multiple"
        isHeaderVisible={true}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
    />
    );
}