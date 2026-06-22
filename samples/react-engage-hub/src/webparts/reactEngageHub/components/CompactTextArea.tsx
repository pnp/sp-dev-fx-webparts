import * as React from "react"
import { Card, Textarea, makeStyles } from "@fluentui/react-components"

import {
  ADVANCEDTEXTAREAPLACEHOLDER,
  COMMENTEXTAREAPLACEHOLDER,
} from "../constants/posts"

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
  compactTextAreaCard: {
    flexShrink: 0,
  },
  newcommentTextAreaCard: {
    boxShadow: "none",
    border: "1px solid rgb(155, 155, 155)",
    borderRadius: "50px",
  },
  compactCommentTextArea: {
    width: "inherit",
    height: "18px",
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

interface ICompactTextAreaInterface {
  isCompactView: boolean
  setIsCompactView: React.Dispatch<React.SetStateAction<boolean>>
  mode?: string
}

export const CompactTextArea = ({
  isCompactView,
  setIsCompactView,
  mode,
}: ICompactTextAreaInterface) => {
  const fluentStyles = useStyles()

  if (!isCompactView) return null

  return (
    <>
      {mode === "Comment" ? (
        <Card
          className={
            (fluentStyles.compactTextAreaCard,
            fluentStyles.newcommentTextAreaCard)
          }
          size='small'
        >
          <Textarea
            size='small'
            textarea={{ style: { marginTop: "-4px" } }}
            className={fluentStyles.compactCommentTextArea}
            placeholder={COMMENTEXTAREAPLACEHOLDER}
            onClick={() => setIsCompactView(false)}
          />
        </Card>
      ) : (
        <Card className={fluentStyles.compactTextAreaCard}>
          <Textarea
            className={fluentStyles.compactTextArea}
            placeholder={ADVANCEDTEXTAREAPLACEHOLDER}
            onClick={() => setIsCompactView(!isCompactView)}
          />
        </Card>
      )}
    </>
  )
}
