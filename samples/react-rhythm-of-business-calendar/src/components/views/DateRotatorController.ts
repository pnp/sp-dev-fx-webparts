import { now } from "common";
import { Moment } from "moment-timezone";
import { IIconProps } from "@fluentui/react";
import { useCallback, useState } from "react";
import { Configuration } from "schema";
import { useConfigurationService, useTimeZoneService } from "services";
import moment from "moment";

export interface IDateRotatorController {
    previousIconProps: IIconProps;
    nextIconProps: IIconProps;
    previousDate(date: Moment, config: Configuration): Moment;
    nextDate(date: Moment, config: Configuration): Moment;
    dateString(date: Moment, config: Configuration): string;
}

export const useDataRotatorController = (controller: IDateRotatorController) => {
    //const [anchorDate, setAnchorDate] = useState(now());
    const { siteTimeZone } = useTimeZoneService();
    const [anchorDate, setAnchorDate] = useState(moment().tz(siteTimeZone.momentId));

    const { active: config } = useConfigurationService();
    //const { siteTimeZone } = useTimeZoneService();
    //console.log("siteTimeZone",siteTimeZone);

    const onRotatePreviousDate = useCallback(() => {
        setAnchorDate(controller.previousDate(anchorDate, config));
    }, [setAnchorDate, anchorDate, config, controller]);

    const onRotateNextDate = useCallback(() => {
        setAnchorDate(controller.nextDate(anchorDate, config));
    }, [setAnchorDate, anchorDate, config, controller]);

    const dateString = controller.dateString(anchorDate, config);

    return [
        anchorDate,
        setAnchorDate,
        dateString,
        onRotatePreviousDate,
        onRotateNextDate
    ] as const;
};