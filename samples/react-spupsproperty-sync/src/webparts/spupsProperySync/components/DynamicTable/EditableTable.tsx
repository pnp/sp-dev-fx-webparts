import * as React from 'react';
import styles from './DynamicTable.module.scss';
import DataRow from './DataRow';

export interface IEditableTableProps {
    onTableUpdate?: () => void;
    onRowDel: () => void;
    filterText?: string;
    data: any[];
    isReadOnly?: boolean;
}

export default function EditableTable(props: IEditableTableProps) {
    var keyData = JSON.parse(JSON.stringify(props.data));
    var columns = Object.keys(keyData[0]);
    var rowitem: any = props.data.map((item) => {
        return (<DataRow item={item} columns={columns} onTableUpdate={props.onTableUpdate} onDelRow={props.onRowDel} key={item.UserID} isReadOnly={props.isReadOnly} />);
    });
    return (
        <div className={styles.dynamicTable}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {props.isReadOnly ? (
                            <>
                                {columns.map(key => {
                                    if (key.toLocaleLowerCase() !== "imageurl" && key.toLocaleLowerCase() !== "userprincipalname" && key.toLocaleLowerCase() !== "id") {
                                        return (<th>{key}</th>);
                                    }
                                })}
                            </>
                        ) : (
                                <>
                                    {columns.map(key => {
                                        if (key.toLocaleLowerCase() !== "imageurl" && key.toLocaleLowerCase() !== "displayname") {
                                            return (<th>{key}</th>);
                                        }
                                    })}
                                </>
                            )}

                    </tr>
                </thead>
                <tbody>
                    {rowitem}
                </tbody>
            </table>
        </div>
    );
}