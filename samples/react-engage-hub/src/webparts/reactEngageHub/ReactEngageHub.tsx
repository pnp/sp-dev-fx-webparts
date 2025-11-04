import * as React from "react"
import { useState, useEffect } from "react"
import {
  FluentProvider,
  IdPrefixProvider,
  makeStyles,
  Theme,
} from "@fluentui/react-components"
import { Placeholder, WebPartTitle } from "@pnp/spfx-controls-react"

import { Posts } from "./components/Posts"
import { CompactTextArea } from "./components/CompactTextArea"
import { RichTextEditor } from "./components/RichTextEditor"

import { ensureFolder, getCurrentUserDetails } from "./services/SPService"

import { WEBPARTCONTEXT } from "./context/webPartContext"
import type { IReactEngageHubProps } from "./IReactEngageHubProps"
import { createV9Theme } from "@fluentui/react-migration-v8-v9"

const useStyles = makeStyles({
  fluentWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    height: "100%",
    backgroundColor: "transparent",
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
  const [shouldRefreshPosts, setShouldRefreshPosts] = useState(false)
  const [isCompactView, setIsCompactView] = useState(true)

  const handlePostSubmitted = () => {
    setShouldRefreshPosts((prev) => !prev)
  }

  useEffect(() => {
    checkFolderExists()
  }, [])

  const checkFolderExists = async () => {
    let userInfo = await getCurrentUserDetails()

    const url = `${props.context.pageContext.site.serverRelativeUrl}/Discussion Point Gallery/${userInfo.UserId.NameId}`

    await ensureFolder(url)
  }

  const fluentStyles = useStyles()

  const computedTheme = React.useMemo<Partial<Theme>>(() => {
    return createV9Theme(props.theme as never)
  }, [props.theme])

  return (
    <div className={fluentStyles.container}>
      <WebPartTitle
        displayMode={props.displayMode}
        title={props.title}
        updateProperty={props.updateProperty}
      />
      {props.apiEndpoint && props.apiKey && props.deploymentName ? (
        <IdPrefixProvider value='react-engage-hub-'>
          <FluentProvider
            theme={computedTheme}
            className={fluentStyles.fluentWrapper}
          >
            <WEBPARTCONTEXT.Provider value={props}>
              <CompactTextArea
                isCompactView={isCompactView}
                setIsCompactView={setIsCompactView}
              />
              <RichTextEditor
                isCompactView={isCompactView}
                setIsCompactView={setIsCompactView}
                onPostSubmit={handlePostSubmitted}
              />
              <Posts webpartProps={props} refreshTrigger={shouldRefreshPosts} />
            </WEBPARTCONTEXT.Provider>
          </FluentProvider>
        </IdPrefixProvider>
      ) : (
        <Placeholder
          iconName='Edit'
          iconText='Configure your web part'
          description='Please configure the web part.'
          buttonLabel='Configure'
          onConfigure={() => props.context.propertyPane.open()}
        />
      )}
    </div>
  )
}
