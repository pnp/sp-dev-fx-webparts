import * as React from "react"
import { Card, Textarea, makeStyles } from "@fluentui/react-components"

import { ADVANCEDTEXTAREAPLACEHOLDER } from "../../constants/constants"

const useStyles = makeStyles({
  compactTextArea: {
    width: "inherit",
    height: "34px",
    border: "none",
    "&::after": {
      borderBottom: "none",
    },
    ":hover": {
      border: "none",
      outline: "none",
    },
    ":focus": {
      border: "none",
      outline: "none",
    },
    ":focus-within": {
      border: "none",
      outline: "none",
    },
    ":active": {
      border: "none",
      outline: "none",
    },
    "&:focus-visible": {
      outline: "none",
    },
  },
})

interface IAdvancedTextAreaCompactInterface {
  exitCompactView: boolean
  setExitCompactView: React.Dispatch<React.SetStateAction<boolean>>
}

export const AdvancedTextAreaCompact = ({
  exitCompactView,
  setExitCompactView,
}: IAdvancedTextAreaCompactInterface) => {
  const fluentStyles = useStyles()

  if (!exitCompactView) return null

  return (
    <Card>
      <Textarea
        className={fluentStyles.compactTextArea}
        placeholder={ADVANCEDTEXTAREAPLACEHOLDER}
        onClick={() => setExitCompactView(!exitCompactView)}
      />
    </Card>
  )
}
