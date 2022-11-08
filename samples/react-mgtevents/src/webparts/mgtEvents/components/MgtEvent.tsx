import React from "react";

import {
  format,
  parseISO
} from "date-fns";
import jquery from "jquery";
import {
  DocumentCard,
  DocumentCardDetails,
  format as formatString,
  IDocumentCardStyles,
  mergeStyles,
  mergeStyleSets,
  Stack,
  Text
} from "office-ui-fabric-react";

import { MgtTemplateProps } from "@microsoft/mgt-react";
import { Event as IEvent } from "@microsoft/microsoft-graph-types";

import { currentSiteTheme } from "../../../common/constants";
import { MgtPersons } from "./MgtPersons";

const tileStyle: IDocumentCardStyles = {
  root: {
    minHeight: 280,
    boxShadow: "0 5px 15px rgba(50, 50, 90, .1)",
  },
};

export const Event = (props: MgtTemplateProps) => {
  const  event:IEvent   = props.dataContext.event;

  const componentClasses = mergeStyleSets({
    eventDay: mergeStyles({
      position: "relative",
      left: -5,
      paddingLeft: 20,
      verticalAlign: "center",
      borderLeftWidth: 4,
      borderLeftColor: currentSiteTheme.theme.themePrimary,
      borderLeftStyle: "solid",
    }),
  });

  React.useEffect(() => {
    (async () => {
      // get ShadowRoot top container of events to apply css grid
      const _agendaWebComponentShadowRoot = jquery("mgt-agenda").get()[0]
        .shadowRoot;
      if (_agendaWebComponentShadowRoot) {
        jquery(_agendaWebComponentShadowRoot)
          .find(".agenda-list")
          .css("display", "grid")
          .css(
            "grid-template-columns",
            "repeat(auto-fill, minmax(min(100%, 220px), 1fr))"
          )
          .css("grid-gap", "1rem");
      }
    })();
  }, [props]);

  // Render component
  return (
    <>
      <DocumentCard styles={tileStyle}  data-interception="false" onClickTarget="_blank" onClickHref={event.webLink}>
        <Stack
          horizontal
          horizontalAlign="start"
          verticalAlign="center"
          tokens={{ childrenGap: 10 }}
          styles={{ root: { marginTop: 20 } }}
        >
          <div className={componentClasses.eventDay}>
            <Text variant={"xxLargePlus"}>
              {format(parseISO(event.start.dateTime), "dd")}
            </Text>
          </div>
          <Stack>
            <Text
              styles={{ root: { fontWeight: 600 } }}
              variant="mediumPlus"
              block
              nowrap
            >
              {format(parseISO(event.start.dateTime), "EEEE")}
            </Text>
            <Text variant="small">
              {format(parseISO(event.start.dateTime), "MMMM,yyyy")}
            </Text>
          </Stack>
        </Stack>
        <DocumentCardDetails
          styles={{ root: { height: 100 } }}
        ></DocumentCardDetails>
        <Stack styles={{ root: { position: "relative", padding: 20 } }}>
          <Text
            styles={{ root: { fontWeight: 600 } }}
            variant="mediumPlus"
            block
            nowrap
            title={event.subject}
          >
            {event.subject}
          </Text>
          <Text variant="small">
            {formatString(
              "Start at {0}",
              format(parseISO(event.start.dateTime), "p")
            )}
          </Text>
        </Stack>
        <Stack
          tokens={{ childrenGap: 5 }}
          horizontal
          horizontalAlign="start"
          wrap
          styles={{ root: { paddingLeft: 20, paddingRight: 20 } }}
        >
          <MgtPersons attendees={event.attendees} />
        </Stack>
      </DocumentCard>
    </>
  );
};
