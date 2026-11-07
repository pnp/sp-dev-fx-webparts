import * as React from "react"
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from "@fluentui/react-components"
import {
  Add24Filled,
  Add24Regular,
  bundleIcon,
  CalendarAdd24Filled,
  CalendarAdd24Regular,
  DocumentAdd24Filled,
  DocumentAdd24Regular,
} from "@fluentui/react-icons"
import * as strings from "ContentCalendarWebPartStrings"

const AddIcon = bundleIcon(Add24Filled, Add24Regular)
const ContentIcon = bundleIcon(DocumentAdd24Filled, DocumentAdd24Regular)
const PlaceholderIcon = bundleIcon(CalendarAdd24Filled, CalendarAdd24Regular)

export interface IQuickAddMenuProps {
  date: Date
  locale: string
  onCreateContent: (date: Date) => void
  onCreatePlaceholder: (date: Date) => void
}

// The "+" flyout shown on a day cell: a Menu offering Create content / Create
// placeholder for that date.
export const QuickAddMenu: React.FC<IQuickAddMenuProps> = ({
  date,
  locale,
  onCreateContent,
  onCreatePlaceholder,
}) => {
  const dateLabel = date.toLocaleDateString(locale, {
    weekday: "long",
    month: "long",
    day: "numeric",
  })

  return (
    <Menu positioning="below-start">
      <MenuTrigger disableButtonEnhancement>
        <Button
          size="small"
          shape="circular"
          appearance="subtle"
          icon={<AddIcon />}
          aria-label={`${strings.QuickAddAria} ${dateLabel}`}
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          <MenuItem
            icon={<ContentIcon />}
            onClick={() => onCreateContent(date)}
          >
            {strings.MenuCreateContent}
          </MenuItem>
          <MenuItem
            icon={<PlaceholderIcon />}
            onClick={() => onCreatePlaceholder(date)}
          >
            {strings.MenuCreatePlaceholder}
          </MenuItem>
        </MenuList>
      </MenuPopover>
    </Menu>
  )
}
