/* eslint-disable react/self-closing-comp */
import * as React from 'react';

import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

import { IFlightStatus } from '../../models/IFlightStatus';
import { IFlightTrackerListItem } from '../../models/IFlightTrackerListItem';
import { FlightStatus } from '../FlightStatus/FlightStatus';
import { useFlightTrackerStyles } from './useFlightTrackerStyles';

export interface IFlightTrackerListColumns  {
  getListColumns:  () => IColumn[];
}

export const useFlightTrackerListColumns = ():IFlightTrackerListColumns => {
  const { controlStyles } = useFlightTrackerStyles();

  const getListColumns = React.useCallback((): IColumn[] => {
    return [
      {
        key: "column1",
        name: " flightCompanyImage",
        className: controlStyles.fileIconCell,
        iconClassName: controlStyles.fileIconHeaderIcon,
        ariaLabel: "company image",
        isIconOnly: true,
        fieldName: "image",
        minWidth: 70,
        maxWidth: 70,
        onRender: (item: IFlightTrackerListItem) => {
          return (
            <img src={item.flightCompanyImage}  style={{width: 28, height: 28}}   />
          );
        }
      },
      {
        key: "column2",
        name: "Air line",
        fieldName: "flightCompany",
        minWidth: 210,
        maxWidth: 210,
        isRowHeader: true,
        isResizable: true,
        data: "string",
        isPadded: true,
      },
      {
        key: "column6",

        name: "Flight",
        fieldName: "flightNumber",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: "number",
        onRender: (item: IFlightTrackerListItem) => {
          return <span>{item.flightNumber}</span>;
        },
      },
      {
        key: "column3",
        name: "time",
        fieldName: "flightTime",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,

        data: "number",
        onRender: (item: IFlightTrackerListItem) => {
          return <span>{item.flightTime}</span>;
        },
        isPadded: true,
      },
      {
        key: "column4",
        name: "Terminal",
        fieldName: "flightTerminal",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: "string",

        onRender: (item: IFlightTrackerListItem) => {
          return <span>{item.flightTerminal}</span>;
        },
        isPadded: true,
      },
      {
        key: "column5",
        name: "Origem",
        fieldName: "flightOrigin",
        minWidth: 150,
        maxWidth: 150,
        isResizable: true,
        isCollapsible: true,
        data: "number",
        onRender: (item: IFlightTrackerListItem) => {
          return <span>{item.flightOrigin}</span>;
        },
      },

      {
        key: "column6",
        name: "Status",
        fieldName: "flightTimeStatus",
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        isCollapsible: true,
        data: "number",
        onRender: (item: IFlightTrackerListItem) => {
          const flightInfo:IFlightStatus = {
            date: item.flightRealTime, status: item.flightTimeStatusText,
            flightId: item.flightNumber
          };
          return  <FlightStatus flightInfo={flightInfo}/>;
        },
      },
    ];
  }, []);

  return  {getListColumns  }
};
