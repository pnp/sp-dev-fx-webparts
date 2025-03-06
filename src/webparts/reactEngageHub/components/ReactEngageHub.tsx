import * as React from "react"

// import styles from "./ReactEngageHub.module.scss"
import type { IReactEngageHubProps } from "./IReactEngageHubProps"
import { FluentProvider, webLightTheme } from "@fluentui/react-components"
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle"
import { AdvancedTextArea } from "./AdvancedTextArea"

export const ReactEngageHub = (props: IReactEngageHubProps) => {
  return (
    <>
      <WebPartTitle
        displayMode={props.displayMode}
        title={props.title}
        updateProperty={props.updateProperty}
      />
      <FluentProvider theme={webLightTheme}>
        <AdvancedTextArea context={props.context} />
      </FluentProvider>
    </>
  )
}
