import {
  Button,
  ColorSwatch,
  makeStyles,
  SwatchPicker,
  SwatchPickerOnSelectEventHandler,
  Text,
} from "@fluentui/react-components"
import * as React from "react"
import { ColorPicker } from "./ColorPicker"
import { IColor } from "../models/IColors"
import { CopyToast, useCopyToast } from "./CopyToast"

export interface SwatchesProps {
  colors: { color: string; value: string; "aria-label": string }[]
  setColors: React.Dispatch<React.SetStateAction<IColor[]>>
}

const useStyles = makeStyles({
  swatchPicker: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    paddingTop: "1rem",
  },
  swatchContainer: {
    display: "grid",
    justifyItems: "center",
    rowGap: "4px",
  },
  customSwatch: {
    width: "96px",
    height: "96px",
    cursor: "pointer",
  },
})

export const Swatches: React.FC<SwatchesProps> = ({ colors, setColors }) => {
  const handleColorChange = (index: number, newColor: string) => {
    setColors((prevColors) =>
      prevColors.map((color, i) =>
        i === index
          ? { ...color, color: newColor, value: newColor.replace("#", "") }
          : color
      )
    )
  }
  const { showCopyToast } = useCopyToast()

  const styles = useStyles()

  return (
    <>
      <CopyToast />
      <SwatchPicker
        aria-label='SwatchPicker row layout'
        shape='circular'
        size='large'
        spacing='medium'
        className={styles.swatchPicker}
      >
        {colors.map((color, index) => {
          return (
            <section className={styles.swatchContainer} key={color.value}>
              <ColorPicker
                color={color.color}
                onColorChange={(newColor) => handleColorChange(index, newColor)}
              >
                <ColorSwatch
                  key={color.value}
                  {...color}
                  className={styles.customSwatch}
                />
              </ColorPicker>
              <Text weight='semibold'>{color["aria-label"]}</Text>
              <Button
                appearance='transparent'
                size='small'
                shape='circular'
                onClick={() => {
                  navigator.clipboard.writeText(color.color)
                  showCopyToast()
                }}
              >
                {color.color}
              </Button>
            </section>
          )
        })}
      </SwatchPicker>
    </>
  )
}