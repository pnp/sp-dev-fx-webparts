import * as React from "react"

// import styles from "./ReactEngageHub.module.scss"
import type { IReactEngageHubProps } from "./IReactEngageHubProps"
import { FluentProvider, webLightTheme } from "@fluentui/react-components"
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle"
import { AdvancedTextArea } from "./AdvancedTextArea"
import { useEffect } from "react"
import { ensureFolder, getCurrentUserDetails } from "../services/SPService"

export const ReactEngageHub = (props: IReactEngageHubProps) => {
  useEffect(() => {
    checkFolderExists()
  }, [])

  const checkFolderExists = async () => {
    let userInfo = await getCurrentUserDetails()

    const url = `${props.context.pageContext.site.serverRelativeUrl}/Discussion Point Gallery/${userInfo.UserId.NameId}`

    await ensureFolder(url)
  }

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
