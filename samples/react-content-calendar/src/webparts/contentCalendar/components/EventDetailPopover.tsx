import * as React from "react"
import {
  Avatar,
  Badge,
  Button,
  Divider,
  makeStyles,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  Text,
  tokens,
} from "@fluentui/react-components"
import { bundleIcon, Open24Filled, Open24Regular } from "@fluentui/react-icons"
import { IContentItem, IPersonRef } from "../models"
import { statusBadgeColor } from "../utils/statusUtils"
import { ItemIcon } from "./ItemIcon"

const OpenIcon = bundleIcon(Open24Filled, Open24Regular)

const useStyles = makeStyles({
  surface: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalM,
    minWidth: "240px",
    maxWidth: "320px",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    columnGap: tokens.spacingHorizontalS,
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalXS,
    minWidth: 0,
  },
  title: {
    wordBreak: "break-word",
  },
  icon: {
    display: "flex",
    fontSize: "18px",
    lineHeight: 0,
    flexShrink: 0,
  },
  facts: {
    display: "grid",
    gridTemplateColumns: "auto 1fr",
    columnGap: tokens.spacingHorizontalM,
    rowGap: tokens.spacingVerticalXS,
  },
  muted: {
    color: tokens.colorNeutralForeground3,
  },
  people: {
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalS,
  },
  person: {
    display: "flex",
    alignItems: "center",
    columnGap: tokens.spacingHorizontalS,
  },
  personText: {
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  // Button forces its icon slot to a fixed size; override width/height (not
  // just font-size) on the svg to actually shrink the Open icon.
  openBtn: {
    "& svg": {
      fontSize: "16px",
      width: "16px",
      height: "16px",
    },
  },
})

export interface IEventDetailPopoverProps {
  item: IContentItem
  locale: string
  // The trigger element (chip or card) that opens the popover on click.
  children: React.ReactElement
}

// SharePoint user photo endpoint; falls back to Avatar initials when the image
// can't load (e.g. workbench / sample data).
function userPhoto(email?: string): { src: string } | undefined {
  if (!email) return undefined
  return {
    src: `/_layouts/15/userphoto.aspx?size=S&accountname=${encodeURIComponent(email)}`,
  }
}

// One "Created by / Modified by" line with an avatar and timestamp. Renders
// nothing when there's neither a person nor a timestamp.
const PersonLine: React.FC<{
  action: string
  person?: IPersonRef
  when?: Date
  format: (d: Date) => string
  styles: { person: string; personText: string; muted: string }
}> = ({ action, person, when, format, styles }) => {
  if (!person && !when) return null
  return (
    <div className={styles.person}>
      <Avatar name={person?.name} image={userPhoto(person?.email)} size={28} />
      <div className={styles.personText}>
        <Text size={200} weight='semibold'>
          {person?.name ?? "Unknown"}
        </Text>
        {when && (
          <Text size={100} className={styles.muted}>
            {`${action} ${format(when)}`}
          </Text>
        )}
      </div>
    </div>
  )
}

// Wraps a clickable item and shows its full details in a Popover on click,
// including author/editor avatars and created/modified timestamps. Fluent's
// Popover provides the enter/exit motion for free.
export const EventDetailPopover: React.FC<IEventDetailPopoverProps> = ({
  item,
  locale,
  children,
}) => {
  const styles = useStyles()

  const dateFmt: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }
  const startLabel = item.start.toLocaleDateString(locale, dateFmt)
  const endLabel = item.end
    ? item.end.toLocaleDateString(locale, dateFmt)
    : undefined

  const fmtDateTime = (d: Date): string =>
    d.toLocaleString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })

  const hasPeople =
    !!item.author || !!item.editor || !!item.created || !!item.modified

  return (
    <Popover withArrow positioning='above' size='small'>
      <PopoverTrigger disableButtonEnhancement>{children}</PopoverTrigger>
      <PopoverSurface aria-label={`Details for ${item.title}`}>
        <div className={styles.surface}>
          <div className={styles.header}>
            <div className={styles.titleRow}>
              <span className={styles.icon}>
                <ItemIcon item={item} color={item.color} />
              </span>
              <Text weight='semibold' className={styles.title}>
                {item.title}
              </Text>
            </div>
            <Badge
              color={statusBadgeColor(item.status)}
              appearance='tint'
              style={{ flexShrink: 0 }}
            >
              {item.status}
            </Badge>
          </div>

          <Divider />

          <div className={styles.facts}>
            <Text size={200} className={styles.muted}>
              Type
            </Text>
            <Text size={200}>{item.contentType}</Text>

            <Text size={200} className={styles.muted}>
              {endLabel ? "Start" : "Date"}
            </Text>
            <Text size={200}>{startLabel}</Text>

            {endLabel && (
              <>
                <Text size={200} className={styles.muted}>
                  End
                </Text>
                <Text size={200}>{endLabel}</Text>
              </>
            )}

            {item.owner && (
              <>
                <Text size={200} className={styles.muted}>
                  Owner
                </Text>
                <Text size={200}>{item.owner}</Text>
              </>
            )}
          </div>

          {hasPeople && (
            <>
              <Divider />
              <div className={styles.people}>
                <PersonLine
                  action='Created'
                  person={item.author}
                  when={item.created}
                  format={fmtDateTime}
                  styles={styles}
                />
                <PersonLine
                  action='Modified'
                  person={item.editor}
                  when={item.modified}
                  format={fmtDateTime}
                  styles={styles}
                />
              </div>
            </>
          )}

          {item.url && (
            <>
              <Divider />
              <div className={styles.footer}>
                <Button
                  as='a'
                  href={item.url}
                  target='_blank'
                  rel='noreferrer'
                  appearance='subtle'
                  shape='circular'
                  size='small'
                  className={styles.openBtn}
                  icon={<OpenIcon />}
                >
                  Open page
                </Button>
              </div>
            </>
          )}
        </div>
      </PopoverSurface>
    </Popover>
  )
}
