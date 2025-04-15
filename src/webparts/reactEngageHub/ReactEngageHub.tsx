import * as React from "react"

// import styles from "./ReactEngageHub.module.scss"
import type { IReactEngageHubProps } from "./IReactEngageHubProps"
import {
  FluentProvider,
  IdPrefixProvider,
  makeStyles,
  webLightTheme,
} from "@fluentui/react-components"
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle"
import { AdvancedTextArea } from "./components/AdvancedTextArea"
import { useEffect } from "react"
import { ensureFolder, getCurrentUserDetails } from "./services/SPService"
import { Posts } from "./components/Posts"

const useStyles = makeStyles({
  fluentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    height: "100%",
  },
  container: {
    height: "calc(100vh - 100px)",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingTop: "1rem",
    overflow: "hidden",
  },
})

export const ReactEngageHub = (props: IReactEngageHubProps) => {
  useEffect(() => {
    checkFolderExists()
  }, [])

  const checkFolderExists = async () => {
    let userInfo = await getCurrentUserDetails()

    const url = `${props.context.pageContext.site.serverRelativeUrl}/Discussion Point Gallery/${userInfo.UserId.NameId}`

    await ensureFolder(url)
  }

  const fluentStyles = useStyles()

  return (
    <div className={fluentStyles.container}>
      <WebPartTitle
        displayMode={props.displayMode}
        title={props.title}
        updateProperty={props.updateProperty}
      />
      <IdPrefixProvider value='react-engage-hub-'>
        <FluentProvider
          theme={webLightTheme}
          className={fluentStyles.fluentWrapper}
        >
          <AdvancedTextArea props={props} />
          <Posts props={props} />
        </FluentProvider>
      </IdPrefixProvider>
    </div>
  )
}
