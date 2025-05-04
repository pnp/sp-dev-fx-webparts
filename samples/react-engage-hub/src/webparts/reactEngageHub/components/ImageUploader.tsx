import * as React from "react"
import { ToolbarButton } from "@fluentui/react-components"
import { ImageAddIcon } from "../../constants/icons"

export interface IImageUploaderProps {
  imageCount: number
  maxFileLimit: number
  setAlert: (isOpen: boolean) => void
  addImages: (files: File[]) => void
}

export const ImageUploader = (props: IImageUploaderProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const { imageCount, setAlert, maxFileLimit, addImages } = props

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const remainingSlots = maxFileLimit - imageCount
      if (remainingSlots <= 0) {
        setAlert(true)
        return
      }
      const fileArray = Array.from(files).slice(0, remainingSlots)
      addImages(fileArray)
      if (files.length > remainingSlots) {
        setAlert(true)
      }
    }
  }

  return (
    <>
      <input
        type='file'
        accept='image/*'
        multiple
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <ToolbarButton icon={<ImageAddIcon />} onClick={handleImageClick} />
    </>
  )
}
