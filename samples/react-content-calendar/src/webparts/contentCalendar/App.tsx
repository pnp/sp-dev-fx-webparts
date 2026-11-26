import * as React from "react"
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle"
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder"
import { DisplayMode } from "@microsoft/sp-core-library"
import * as strings from "ContentCalendarWebPartStrings"
import { IContentCalendarProps } from "./interfaces/IContentCalendarProps"
import { ContentCalendar } from "./components/ContentCalendar"

export const App = (props: IContentCalendarProps): React.ReactElement => {
  return (
    <section>
      <WebPartTitle
        displayMode={props.displayMode}
        title={props.title}
        updateProperty={props.updateProperty}
      />
      {props.config.listId ? (
        <ContentCalendar
          service={props.service}
          config={props.config}
          locale={props.locale}
          instanceId={props.instanceId}
        />
      ) : (
        <Placeholder
          iconName="Calendar"
          iconText={strings.ConfigureCalendarTitle}
          description={strings.ConfigureCalendarDescription}
          buttonLabel={strings.ConfigureCalendarButtonLabel}
          hideButton={props.displayMode !== DisplayMode.Edit}
          onConfigure={props.onConfigure}
        />
      )}
    </section>
  )
}
