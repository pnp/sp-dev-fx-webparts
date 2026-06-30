import * as React from "react"
import {
  Button,
  Card,
  CardHeader,
  makeStyles,
  Subtitle1,
  tokens,
} from "@fluentui/react-components"
import { Swatches } from "./Swatches"
import {
  ArrowSync20Filled,
  ArrowSync20Regular,
  bundleIcon,
  Code24Filled,
  Code24Regular,
} from "@fluentui/react-icons"
import { PreviewCode } from "./PreviewCode"
import { DashboardPreview } from "./DashboardPreview"
import { generateColors, generatePowerAppsFormula } from "../utils/color"
import { defaultColors, IColor } from "../models/IColors"

const useStyles = makeStyles({
  card: {
    padding: "1.6rem",
    borderTop: `4px solid ${tokens.colorBrandForeground1}`,
  },
  body: {
    display: "flex",
    alignItems: "stretch",
    marginTop: "0.5rem",
    "@media (max-width: 1100px)": {
      flexDirection: "column",
    },
  },
  paletteSection: {
    flex: "0 0 auto",
    maxWidth: "520px",
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 1100px)": {
      maxWidth: "100%",
    },
  },
  divider: {
    width: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    margin: "0 1.5rem",
    flexShrink: 0,
    "@media (max-width: 1100px)": {
      width: "auto",
      height: "1px",
      margin: "1.2rem 0",
    },
  },
  previewSection: {
    flex: 1,
    minWidth: 0,
  },
  actions: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "auto",
    paddingTop: "2rem",
  },
})

const ArrowSync = bundleIcon(ArrowSync20Filled, ArrowSync20Regular)
const Code = bundleIcon(Code24Filled, Code24Regular)

export const ChooseColors: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [colors, setColors] = React.useState<IColor[]>(defaultColors)
  const [generatedCode, setGeneratedCode] = React.useState("")

  const handleGenerateColors = () => {
    const newColors = generateColors()
    console.log("Generated colors:", newColors)
    setColors(newColors)
  }

  const handleCopyCode = () => {
    const formula = generatePowerAppsFormula(colors)
    setGeneratedCode(formula)
    setIsOpen(true)
  }

  const styles = useStyles()

  return (
    <>
      <Card className={styles.card}>
        <CardHeader header={<Subtitle1>Color Palette</Subtitle1>} />
        <div className={styles.body}>
          <div className={styles.paletteSection}>
            <Swatches colors={colors} setColors={setColors} />
            <div className={styles.actions}>
              <Button
                appearance='primary'
                icon={<ArrowSync />}
                onClick={handleGenerateColors}
              >
                Generate colors
              </Button>
              <Button
                appearance='secondary'
                icon={<Code />}
                onClick={handleCopyCode}
              >
                Copy code
              </Button>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.previewSection}>
            <DashboardPreview colors={colors} />
          </div>
        </div>
      </Card>
      <PreviewCode
        generatedCode={generatedCode}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}
