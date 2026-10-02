import * as React from "react"
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle"
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
      <ContentCalendar
        service={props.service}
        config={props.config}
        locale={props.locale}
        instanceId={props.instanceId}
      />
    </section>
  )
}
