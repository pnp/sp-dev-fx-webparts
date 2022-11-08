import { max } from "lodash";
import { useCallback, useRef } from "react";
import { useForceUpdate } from "@fluentui/react-hooks";
import { Refiner } from "model";
import { useEventsService } from "services";
import { IRefinerPanel } from "../refiners";

export const useRefinerPanel = () => {
    const forceUpdate = useForceUpdate();

    const { refinersAsync } = useEventsService();

    const refinerPanel = useRef<IRefinerPanel>();

    const newRefiner = useCallback(async () => {
        try {
            const refiner = new Refiner();
            const maxOrder = max(refinersAsync.data?.map(v => v.order));
            refiner.order = isFinite(maxOrder) ? maxOrder + 1 : 0;
            await refinerPanel.current.edit(refiner);
        } finally { forceUpdate(); }
    }, [refinersAsync, refinerPanel, forceUpdate]);

    const editRefiner = useCallback(async (refiner: Refiner) => {
        try {
            await refinerPanel.current.edit(refiner);
        } finally { forceUpdate(); }
    }, [refinerPanel, forceUpdate]);

    return [
        refinerPanel,
        newRefiner,
        editRefiner
    ] as const;
};