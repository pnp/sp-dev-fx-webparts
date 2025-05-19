import * as React from "react"
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  CodeBlockIcon,
  TextBoldIcon,
  TextBulletListIcon,
  TextItalicIcon,
  TextNumberListIcon,
  TextStrikethroughIcon,
  TextUnderlineIcon,
  FontIncreaseIcon,
  FontDecreaseIcon,
} from "../../constants/icons"
import {
  toggleBold,
  toggleItalic,
  toggleUnderline,
  toggleBullet,
  toggleNumbering,
  toggleCode,
  setAlignment,
  toggleStrikethrough,
} from "roosterjs-content-model-api"
import { IEditor } from "roosterjs-content-model-types"
import { increaseFontSize, decreaseFontSize } from "./FontIncreaseDecrease"

export type ToolbarItem =
  | {
      type: "button"
      icon: React.ReactNode
      handler: (editor: IEditor) => void
      label: string
      overflowId: string
    }
  | {
      type: "button"
      render: (editor: IEditor | null) => React.ReactNode
      key: string
      overflowId: string
    }

export const toolbarItems: ToolbarItem[] = [
  {
    type: "button",
    icon: <TextBoldIcon />,
    handler: toggleBold,
    label: "Bold",
    overflowId: "bold",
  },
  {
    type: "button",
    icon: <TextItalicIcon />,
    handler: toggleItalic,
    label: "Italic",
    overflowId: "italic",
  },
  {
    type: "button",
    icon: <TextUnderlineIcon />,
    handler: toggleUnderline,
    label: "Underline",
    overflowId: "underline",
  },
  {
    type: "button",
    icon: <TextStrikethroughIcon />,
    handler: toggleStrikethrough,
    label: "Strike Through",
    overflowId: "strikethrough",
  },
  {
    type: "button",
    icon: <TextBulletListIcon />,
    handler: toggleBullet,
    label: "Bullet List",
    overflowId: "bullet",
  },
  {
    type: "button",
    icon: <TextNumberListIcon />,
    handler: toggleNumbering,
    label: "Number List",
    overflowId: "number",
  },
  {
    type: "button",
    icon: <CodeBlockIcon />,
    handler: toggleCode,
    label: "Code Block",
    overflowId: "code",
  },
  {
    type: "button",
    icon: <AlignLeftIcon />,
    handler: (editor) => setAlignment(editor, "left"),
    label: "Align Left",
    overflowId: "alignLeft",
  },
  {
    type: "button",
    icon: <AlignCenterIcon />,
    handler: (editor) => setAlignment(editor, "center"),
    label: "Align Center",
    overflowId: "alignCenter",
  },
  {
    type: "button",
    icon: <AlignRightIcon />,
    handler: (editor) => setAlignment(editor, "right"),
    label: "Align Right",
    overflowId: "alignRight",
  },
  {
    type: "button",
    key: "font-increase",
    icon: <FontIncreaseIcon />,
    handler: increaseFontSize,
    label: "Increase Font Size",
    overflowId: "fontIncrease",
  },
  {
    type: "button",
    key: "font-decrease",
    icon: <FontDecreaseIcon />,
    handler: decreaseFontSize,
    label: "Decrease Font Size",
    overflowId: "fontDecrease",
  },
]
