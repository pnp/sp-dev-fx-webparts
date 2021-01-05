import * as React from "react";

import { Text } from "office-ui-fabric-react";

import { Agenda } from "@microsoft/mgt-react";

import { IMgtEventsProps } from "./IMgtEventsProps";
import { Event } from "./MgtEvent";

//
export const MgtEvents: React.FunctionComponent<IMgtEventsProps> = (
  props: React.PropsWithChildren<IMgtEventsProps>
) => {
  return (
    <>
          <Text variant="xLarge">{props.title}</Text>
          <div style={{ marginTop: 30 }}>
          <Agenda days={props.numberDays} >
            <Event template="event"  />
          </Agenda>
          </div>
    </>
  );
};
