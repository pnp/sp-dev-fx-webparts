jest.mock("@fluentui/react-components", () => {
  const actual = jest.requireActual("@fluentui/react-components")
  return {
    ...actual,
    Popover: ({ children }: { children: React.ReactNode }) => children,
    PopoverSurface: ({ children }: { children: React.ReactNode }) => children,
    PopoverTrigger: ({ children }: { children: React.ReactNode }) => children,
  }
})
jest.mock("./ItemIcon", () => ({ ItemIcon: () => null }))
jest.mock("ContentCalendarWebPartStrings", () => ({
  PublishedDateTimeLabel: "Published",
  ScheduledDateTimeLabel: "Scheduled for",
}), { virtual: true })

import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { ContentStatus, IContentItem } from "../models"
import { EventDetailPopover } from "./EventDetailPopover"

describe("publication date and time in item details", () => {
  const item: IContentItem = {
    id: 1,
    title: "Page",
    contentType: "Page",
    start: new Date("2030-02-12T09:30:00Z"),
    status: ContentStatus.Scheduled,
    color: "#000000",
    icon: "Page",
    isPlaceholder: false,
  }

  const render = (changes: Partial<IContentItem>): string =>
    renderToStaticMarkup(
      <EventDetailPopover item={{ ...item, ...changes }} locale="en-US">
        <button>Open</button>
      </EventDetailPopover>,
    )

  it("shows SharePoint-formatted scheduled date and time", () => {
    const html = render({ scheduledDateText: "12 February 2030 09:30" })
    expect(html).toContain("Scheduled for")
    expect(html).toContain("12 February 2030 09:30")
  })

  it("shows SharePoint-formatted published date and time", () => {
    const html = render({
      status: ContentStatus.Published,
      published: new Date("2030-01-15T15:45:00Z"),
      publishedDateText: "15 January 2030 15:45",
    })
    expect(html).toContain("15 January 2030 15:45")
    expect(html).not.toContain("Scheduled for")
  })

  it("formats a raw timestamp with time when formatted text is missing", () => {
    const html = render({})
    const expected = item.start.toLocaleString("en-US", {
      year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
    })
    expect(html).toContain(expected)
  })

  it("does not label drafts or placeholders as published", () => {
    expect(render({ status: ContentStatus.Draft })).not.toContain("Scheduled for")
    expect(render({
      status: ContentStatus.Published,
      isPlaceholder: true,
      publishedDateText: "15 January 2030 15:45",
    })).not.toContain("15 January 2030 15:45")
  })
})
