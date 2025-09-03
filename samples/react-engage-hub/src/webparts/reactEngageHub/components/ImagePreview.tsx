import { Button, Image, makeStyles } from "@fluentui/react-components"
import { Delete24Regular, Eye24Regular } from "@fluentui/react-icons"
import * as React from "react"

export interface IImagePreviewProps {
  preview: any
  index?: number
  handleRemoveImageFromPreview?: (index: number) => void
}

const useStyles = makeStyles({
  image: {
    width: "inherit",
    height: "inherit",
    objectFit: "cover",
    borderRadius: "8px",
  },
  imageContainer: {
    position: "relative",
    width: "96px",
    height: "96px",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark transparent overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    opacity: 0,
    transition: "opacity 0.3s ease",
    borderRadius: "8px",
    "&:hover": {
      opacity: 1,
    },
  },
  button: {
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
})

export const ImagePreview: React.FunctionComponent<IImagePreviewProps> = (
  props: React.PropsWithChildren<IImagePreviewProps>
) => {
  const fluentStyles = useStyles()

  return (
    <div className={fluentStyles.imageContainer}>
      <Image src={props.preview} className={fluentStyles.image} />
      <div className={fluentStyles.overlay}>
        <Button
          icon={<Eye24Regular />}
          appearance='transparent'
          className={fluentStyles.button}
          onClick={() => {
            window.open(props.preview, "_blank")
          }}
        />
        {props.handleRemoveImageFromPreview && (
          <Button
            icon={<Delete24Regular />}
            appearance='transparent'
            className={fluentStyles.button}
            onClick={() =>
              props.handleRemoveImageFromPreview?.(props.index ?? -1)
            }
          />
        )}
      </div>
    </div>
  )
}
