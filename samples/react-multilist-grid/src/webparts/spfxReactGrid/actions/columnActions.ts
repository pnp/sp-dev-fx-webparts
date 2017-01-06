import {
    ADD_COLUMN,
    ADD_COLUMNS,
    REMOVE_COLUMN,
    REMOVE_ALLCOLUMNS,
    MOVE_COLUMN_UP,
    MOVE_COLUMN_DOWN,
SAVE_COLUMN
} from "../constants";

import ColumnDefinition from "../model/ColumnDefinition";
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
export function moveCulumnUp(column: ColumnDefinition) {
    return {
        type: MOVE_COLUMN_UP,
        payload: {
            column: column
        }
    };
}
export function moveCulumnDown(column: ColumnDefinition) {
    return {
        type: MOVE_COLUMN_DOWN,
        payload: {
            column: column
        }
    };
}
export function removeAllColumns() {
    return {
        type: REMOVE_ALLCOLUMNS,
        payload: {

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


