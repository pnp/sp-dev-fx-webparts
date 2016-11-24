
import {
    ADD_COLUMN,
    ADD_COLUMNS,
    REMOVE_COLUMN,
SAVE_COLUMN

} from "../constants";

import pnp from "sp-pnp-js";
import Column from "../model/Column";
import ListItem from "../model/ListItem";

export function addColumn(column: Column) {

    return {
        type: ADD_COLUMN,
        payload: {
            column: column
        }
    };
}
export function removeColumn(column: Column) {
    return {
        type: REMOVE_COLUMN,
        payload: {
            column: column
        }
    };
}
export function addColumns(columns: Column[]) {
    return {
        type: ADD_COLUMNS,
        payload: {
            columns: columns
        }
    };
}
export function saveColumn(column: Column) {
    return {
        type: SAVE_COLUMN,
        payload: {
            column: column
        }
    };
}


