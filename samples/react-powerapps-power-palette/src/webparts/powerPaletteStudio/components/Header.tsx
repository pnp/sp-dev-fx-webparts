import * as React from "react"
import { makeStyles, Text, Title1, tokens } from "@fluentui/react-components"

const useStyles = makeStyles({
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  gradientTitle: {
    background: `linear-gradient(90deg, ${tokens.colorBrandForeground1} 0%, ${tokens.colorBrandForeground2} 50%, ${tokens.colorPalettePurpleForeground2} 100%)`,

    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
})

export const Header: React.FC = () => {
  const styles = useStyles()

  return (
    <header className={styles.header}>
      <Title1 className={styles.gradientTitle}>Power Palette Studio</Title1>
      <Text>
        Generate stunning color palettes with AI-powered intelligence. Click any
        color to copy, compare desktop and mobile previews, or export your
        palette as code.
      </Text>
    </header>
  )
}
