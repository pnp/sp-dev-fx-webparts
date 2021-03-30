import * as React from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import styles from './DynamicTable.module.scss';
import EditableCell from './EditableCell';

export interface IDataRowProps {
    item: any;
    columns: any;
    isReadOnly?: boolean;
    onTableUpdate: () => void;
    onDelRow: (item: any) => void;
}

export default function DataRow(props: IDataRowProps) {
    function onDelEvent() {
        props.onDelRow(props.item);
    }
    return (
        <tr>
            {props.isReadOnly ? (
                <>
                    {props.columns.map(col => {
                        if (col.toLocaleLowerCase() !== "imageurl" && col.toLocaleLowerCase() !== "userprincipalname" && col.toLocaleLowerCase() !== "id") {
                            if (col.toLocaleLowerCase() == "displayname") {
                                return <EditableCell cellData={{
                                    "type": col,
                                    value: props.item.displayName,
                                    id: props.item.userPrincipalName,
                                    label: true,
                                    ImageUrl: props.item.ImageUrl
                                }} isReadOnly={props.isReadOnly} />;

                            } else {
                                return <EditableCell cellData={{
                                    "type": col,
                                    value: props.item[col],
                                    id: props.item.userPrincipalName,
                                }} isReadOnly={props.isReadOnly} />;
                            }
                        }
                    })}
                </>
            ) : (
                    <>
                        {props.columns.map(col => {
                            if (col.toLocaleLowerCase() !== "imageurl" && col.toLocaleLowerCase() !== "displayname") {
                                if (col == "UserID") {
                                    return <EditableCell onTableUpdate={props.onTableUpdate} cellData={{
                                        "type": col,
                                        value: props.item.DisplayName,
                                        id: props.item.UserID,
                                        label: true,
                                        ImageUrl: props.item.ImageUrl
                                    }} />;
                                } else {
                                    return <EditableCell onTableUpdate={props.onTableUpdate} cellData={{
                                        "type": col,
                                        value: props.item[col],
                                        id: props.item.UserID,
                                        label: false
                                    }} />;
                                }
                            }
                        })}
                    </>
                )}
            <td>
                <IconButton iconProps={{ iconName: "UserRemove" }} title="Remove" ariaLabel="Remove" onClick={onDelEvent} />
            </td>
        </tr>
    );
}