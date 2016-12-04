import {
    ADD_COLUMN,
    ADD_COLUMNS,
    REMOVE_COLUMN,
SAVE_COLUMN
} from "../constants";

import ColumnRef from "../model/Column";
export function addColumn(column: ColumnRef) {

    return {
        type: ADD_COLUMN,
        payload: {
            column: column
        }
    };
}
export function removeColumn(column: ColumnRef) {
    return {
        type: REMOVE_COLUMN,
        payload: {
            column: column
        }
    };
}
export function addColumns(columns: ColumnRef[]) {
    return {
        type: ADD_COLUMNS,
        payload: {
            columns: columns
        }
    };
}
export function saveColumn(column: ColumnRef) {
    return {
        type: SAVE_COLUMN,
        payload: {
            column: column
        }
    };
}


