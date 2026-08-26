import * as React from "react"
import { useMemo } from "react"
import {
  FluentProvider,
  IdPrefixProvider,
  makeStyles,
  Theme,
} from "@fluentui/react-components"
import { createV9Theme } from "@fluentui/react-migration-v8-v9"
import { IAppProps } from "./models/IApp"
import { Header } from "./components/Header"
import { ChooseColors } from "./components/ChooseColors"

const useStyles = makeStyles({
  fluentContainer: {
    boxSizing: "border-box",
    display: "grid",
    rowGap: "1.2rem",
  },
})

export const App = (props: IAppProps) => {
  const { theme } = props

  const computedTheme = useMemo<Partial<Theme>>(() => {
    return createV9Theme(theme as never)
  }, [theme])

  const styles = useStyles()

  return (
    <IdPrefixProvider value='react-ai-powerpalette-'>
      <FluentProvider theme={computedTheme} className={styles.fluentContainer}>
        <Header />
        <ChooseColors />
      </FluentProvider>
    </IdPrefixProvider>
  )
}
