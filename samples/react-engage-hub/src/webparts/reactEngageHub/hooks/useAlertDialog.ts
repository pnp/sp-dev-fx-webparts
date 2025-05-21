import * as React from "react"

export const useAlertDialog = (initialState = false) => {
  const [isOpen, setIsOpen] = React.useState(initialState)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  return { isOpen, open, close, setIsOpen }
}
