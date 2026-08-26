import * as React from "react"
import { tinycolor } from "@ctrl/tinycolor"
import {
  Popover,
  PopoverTrigger,
  PopoverSurface,
  makeStyles,
  ColorArea,
  ColorPicker as FluentColorPicker,
  ColorSlider,
} from "@fluentui/react-components"
import type { ColorPickerProps as FluentColorPickerProps } from "@fluentui/react-components"

const useStyles = makeStyles({
  popoverContent: {
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "12px",
  },
  colorArea: {
    width: "280px",
    height: "280px",
  },
})

export interface ColorPickerProps {
  color: string
  onColorChange: (color: string) => void
  children: React.ReactElement
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color: initialColor,
  onColorChange,
  children,
}) => {
  const styles = useStyles()
  const [color, setColor] = React.useState(() =>
    tinycolor(initialColor).toHsv()
  )
  const [namedColor, setNamedColor] = React.useState("")
  const [open, setOpen] = React.useState(false)
  const isChangingColor = React.useRef(false)

  React.useEffect(() => {
    if (!isChangingColor.current) {
      setColor(tinycolor(initialColor).toHsv())
    }
  }, [initialColor])

  const handleOpenChange = (_: unknown, data: { open: boolean }) => {
    // Only allow closing if we're not in the middle of a color change
    if (!isChangingColor.current || data.open) {
      setOpen(data.open)
    }
  }

  const handleChange: FluentColorPickerProps["onColorChange"] = (_, data) => {
    isChangingColor.current = true
    const newColor = { ...data.color, a: data.color.a ?? 1 }
    setColor(newColor)
    const _namedColor = tinycolor(`hsl(${data.color.h},100%,50%)`).toName()
    if (_namedColor) {
      setNamedColor(_namedColor)
    }
    onColorChange(tinycolor(newColor).toHexString())

    // Reset the flag after a short delay
    setTimeout(() => {
      isChangingColor.current = false
    }, 100)
  }

  const colorAriaAttributes = {
    "aria-roledescription": "2D slider",
    "aria-valuetext": `Saturation ${color.s * 100}, Brightness: ${
      color.v * 100
    }, ${namedColor}`,
  }

  return (
    <Popover
      open={open}
      onOpenChange={handleOpenChange}
      withArrow
      positioning='below-start'
    >
      <PopoverTrigger disableButtonEnhancement>{children}</PopoverTrigger>
      <PopoverSurface tabIndex={-1}>
        <div className={styles.popoverContent}>
          <FluentColorPicker color={color} onColorChange={handleChange}>
            <ColorArea
              className={styles.colorArea}
              inputX={{ "aria-label": "Saturation", ...colorAriaAttributes }}
              inputY={{ "aria-label": "Brightness", ...colorAriaAttributes }}
            />
            <ColorSlider
              aria-label='Hue'
              aria-valuetext={`${color.h}°, ${namedColor}`}
            />
          </FluentColorPicker>
        </div>
      </PopoverSurface>
    </Popover>
  )
}