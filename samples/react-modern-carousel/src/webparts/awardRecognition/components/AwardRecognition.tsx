import * as React from "react"
import {
  FluentProvider,
  IdPrefixProvider,
  makeStyles,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components"
import { Carousel } from "../../../components/Carousel"

import { createContext } from "react"
import { IAwardRecognitionProps } from "./IAwardRecognitionProps"

export const WebpartContext = createContext<IAwardRecognitionProps>(null)

const useStyles = makeStyles({
  root: {
    width: "100%",
    background: "none",
    margin: "0 2rem",
  },
})

export const AwardRecognition = (
  props: IAwardRecognitionProps
): JSX.Element => {
  const fluentStyles = useStyles()
  return (
    <WebpartContext.Provider value={props}>
      <IdPrefixProvider value='award-recognition-'>
        <FluentProvider
          theme={props.isDarkTheme ? webDarkTheme : webLightTheme}
          className={fluentStyles.root}
        >
          <Carousel />
        </FluentProvider>
      </IdPrefixProvider>
    </WebpartContext.Provider>
  )
}
