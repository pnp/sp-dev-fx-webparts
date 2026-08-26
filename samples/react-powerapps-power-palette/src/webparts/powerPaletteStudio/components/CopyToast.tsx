import * as React from "react"
import {
  Toast,
  ToastTitle,
  Toaster,
  useToastController,
} from "@fluentui/react-components"

const TOASTER_ID = "copy-toaster"

export const CopyToast: React.FC = () => {
  return <Toaster toasterId={TOASTER_ID} position='top-end' />
}

export const useCopyToast = () => {
  const { dispatchToast } = useToastController(TOASTER_ID)

  const showCopyToast = () => {
    dispatchToast(
      <Toast>
        <ToastTitle>Copied to clipboard</ToastTitle>
      </Toast>,
      { intent: "success" }
    )
  }

  return { showCopyToast }
}
