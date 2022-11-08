import React, { FC } from "react";
import { Separator, Stack } from "@fluentui/react";
import { Refiner, RefinerValue } from "model";
import { type OnRefinerSelectionChanged } from "./OnRefinerSelectionChanged";
import { RefinerValues } from "./RefinerValues";
import { Entity } from "common";

interface IProps {
    editingEnabled: boolean;
    refiners: readonly Refiner[];
    selectedValues: Set<RefinerValue>;
    onSelectionChanged: OnRefinerSelectionChanged;
    onEditRefiner: (refiner: Refiner) => void;
}

export const Refiners: FC<IProps> = ({ editingEnabled, refiners, selectedValues, onSelectionChanged, onEditRefiner }) =>
    <Stack>
        {refiners.filter(Entity.NotDeletedFilter).sort(Refiner.OrderAscComparer).map((refiner, idx) => <>
            {idx > 0 && <Separator />}
            <RefinerValues
                key={refiner.key}
                editingEnabled={editingEnabled}
                refiner={refiner}
                selectedValues={selectedValues}
                onSelectionChanged={onSelectionChanged}
                onEdit={onEditRefiner}
            />
        </>)}
    </Stack>