import { TableColumnDefinition, createTableColumn, TableRowId, useTableFeatures, useTableSelection, TableHeader, TableRow, Table, TableSelectionCell, TableHeaderCell, TableBody, TableCell, TableCellLayout } from "@fluentui/react-components";
import * as React from 'react';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import SPFxPeopleCard from "./SPFxPeopleCard";
import { ServiceScope } from "@microsoft/sp-core-library";
import { PersonaSize } from "office-ui-fabric-react/lib/Persona";

export interface TableGridProps {
    Users: MicrosoftGraph.User[];
    ServiceScope: ServiceScope;
    ReadOnly?: boolean;
    onSelectionChange?: (SelectedUsers: MicrosoftGraph.User[]) => void;
}

export default function TableGrid(props: TableGridProps): React.ReactElement<TableGridProps> {
    const columns: TableColumnDefinition<MicrosoftGraph.User>[] = React.useMemo(
        () => [
            createTableColumn<MicrosoftGraph.User>({
                columnId: 'username',
            })
        ],
        [],
    );

    const [selectedRows, setSelectedRows] = React.useState(() => new Set<TableRowId>([]));

    const {
        getRows,
        selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
    } = useTableFeatures(
        {
            columns,
            items: props.Users,
        },
        [
            useTableSelection({
                selectionMode: 'multiselect',
                selectedItems: selectedRows,
                onSelectionChange: (e, data) => {
                    if (props.ReadOnly) return;
                    if (props.onSelectionChange) props.onSelectionChange(props.Users.filter((v, i) => data.selectedItems.has(i)));
                    setSelectedRows(data.selectedItems);
                }
            }),
        ],
    );

    const rows = getRows(row => {
        const selected = isRowSelected(row.rowId);
        return {
            ...row,
            onClick: (e: React.MouseEvent) => { if (!props.ReadOnly) toggleRow(e, row.rowId) },
            onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === ' ') {
                    e.preventDefault();
                    if (!props.ReadOnly) toggleRow(e, row.rowId);
                }
            },
            selected,
            appearance: selected ? ('brand' as const) : ('none' as const),
        };
    });

    const toggleAllKeydown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === ' ') {
                toggleAllRows(e);
                e.preventDefault();
            }
        },
        [toggleAllRows],
    );


    return (<Table aria-label="Table with multiselect">
        <TableHeader>
            <TableRow>
                {!props.ReadOnly && <TableSelectionCell
                    checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
                    onClick={toggleAllRows}
                    onKeyDown={toggleAllKeydown}
                    checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
                />}
                <TableHeaderCell>User</TableHeaderCell>
            </TableRow>
        </TableHeader>
        <TableBody>
            {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
                <TableRow
                    key={item.id}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    aria-selected={selected}
                    appearance={appearance}
                >
                    {!props.ReadOnly && <TableSelectionCell checked={selected} checkboxIndicator={{ 'aria-label': 'Select row' }} />}
                    <TableCell>
                        <TableCellLayout>
                            <SPFxPeopleCard primaryText={item.displayName} serviceScope={props.ServiceScope} email={item.userPrincipalName} size={PersonaSize.size24} secondaryText={item.mail} />
                        </TableCellLayout>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>);
}