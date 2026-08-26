import * as React from "react"

export type ImageUploadState = {
  imageUrls: File[]
  previewUrls: string[]
}

export const useImageUpload = () => {
  const [images, setImages] = React.useState<ImageUploadState>({
    imageUrls: [],
    previewUrls: [],
  })
  const addImages = (files: File[]) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file))
    setImages((prev) => ({
      imageUrls: [...prev.imageUrls, ...files],
      previewUrls: [...prev.previewUrls, ...newPreviews],
    }))
  }

  const clearImages = () => {
    images.previewUrls.forEach((url) => URL.revokeObjectURL(url))
    setImages({ imageUrls: [], previewUrls: [] })
  }

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images.previewUrls[index])
    setImages((prev) => {
      const newImageUrls = [...prev.imageUrls]
      const newPreviewUrls = [...prev.previewUrls]
      newImageUrls.splice(index, 1)
      newPreviewUrls.splice(index, 1)
      return {
        imageUrls: newImageUrls,
        previewUrls: newPreviewUrls,
      }
    })
  }

  // Clean up URLs when component unmounts
  React.useEffect(() => {
    return () => {
      images.previewUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  return { images, addImages, clearImages, removeImage }
}
