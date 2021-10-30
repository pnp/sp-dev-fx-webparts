import * as React from "react";

import { Person } from "@microsoft/mgt-react";
import { Attendee } from "@microsoft/microsoft-graph-types";

export interface IMgtPersonsProps {
  attendees: Attendee[];
}

export const MgtPersons: React.FunctionComponent<IMgtPersonsProps> = (
  props: React.PropsWithChildren<IMgtPersonsProps>
) => {
  const { attendees } = props;
  return (
    <>
      {attendees.map((attendee, i) => {
        return (
          <Person
            userId={attendee.emailAddress.address}
            showPresence={true}
          ></Person>
        );
      })}
    </>
  );
};
