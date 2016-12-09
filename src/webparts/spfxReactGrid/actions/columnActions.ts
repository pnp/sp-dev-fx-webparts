import {
    ADD_COLUMN,
    ADD_COLUMNS,
    REMOVE_COLUMN,
SAVE_COLUMN
} from "../constants";

import ColumnDefinition from "../model/Column";
export function addColumn(column: ColumnDefinition) {

    return {
        type: ADD_COLUMN,
        payload: {
            column: column
        }
    };
}
export function removeColumn(column: ColumnDefinition) {
    return {
        type: REMOVE_COLUMN,
        payload: {
            column: column
        }
    };
}
export function addColumns(columns: ColumnDefinition[]) {
    return {
        type: ADD_COLUMNS,
        payload: {
            columns: columns
        }
    };
}
export function saveColumn(column: ColumnDefinition) {
    return {
        type: SAVE_COLUMN,
        payload: {
            column: column
        }
    };
}


