import * as React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  makeStyles,
  tokens,
} from "@fluentui/react-components"
import {
  bundleIcon,
  Copy24Filled,
  Copy24Regular,
  Dismiss24Regular,
} from "@fluentui/react-icons"
import { CopyToast, useCopyToast } from "./CopyToast"

interface PreviewCodeProps {
  generatedCode: string
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const Copy = bundleIcon(Copy24Filled, Copy24Regular)

const useStyles = makeStyles({
  codeBlock: {
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "16px",
    borderRadius: tokens.borderRadiusMedium,
    fontFamily: "Consolas, Monaco, 'Courier New', monospace",
    fontSize: "14px",
    overflowX: "auto",
    whiteSpace: "pre",
    color: tokens.colorNeutralForeground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  dialogSurface: {
    borderTop: `4px solid ${tokens.colorBrandForeground1}`,
  },
})

export const PreviewCode: React.FC<PreviewCodeProps> = ({
  generatedCode,
  isOpen,
  setIsOpen,
}) => {
  const { showCopyToast } = useCopyToast()

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode)
    showCopyToast()
  }

  const styles = useStyles()

  return (
    <>
      <CopyToast />
      <Dialog
        open={isOpen}
        onOpenChange={(event, data) => setIsOpen(data.open)}
      >
        <DialogSurface className={styles.dialogSurface}>
          <DialogBody>
            <DialogTitle
              action={
                <DialogTrigger action='close'>
                  <Button
                    appearance='subtle'
                    aria-label='close'
                    icon={<Dismiss24Regular />}
                  />
                </DialogTrigger>
              }
            >
              Power Apps Color Theme
            </DialogTitle>
            <DialogContent>
              <pre className={styles.codeBlock}>
                <code>{generatedCode}</code>
              </pre>
            </DialogContent>
            <DialogActions>
              <Button appearance='primary' onClick={handleCopy} icon={<Copy />}>
                Copy
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  )
}
