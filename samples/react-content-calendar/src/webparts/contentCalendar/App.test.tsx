const mockPlaceholder = jest.fn()
const mockCalendar = jest.fn()

jest.mock("@pnp/spfx-controls-react/lib/Placeholder", () => ({
  Placeholder: mockPlaceholder,
}))
jest.mock("@pnp/spfx-controls-react/lib/WebPartTitle", () => ({
  WebPartTitle: () => null,
}))
jest.mock("./components/ContentCalendar", () => ({
  ContentCalendar: mockCalendar,
}))
jest.mock("ContentCalendarWebPartStrings", () => ({
  ConfigureCalendarTitle: "Configure your content calendar",
  ConfigureCalendarDescription: "Choose a page content type.",
  ConfigureCalendarButtonLabel: "Configure",
}), { virtual: true })
jest.mock("@microsoft/sp-core-library", () => ({
  DisplayMode: { Read: 1, Edit: 2 },
}))

import * as React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { DisplayMode } from "@microsoft/sp-core-library"
import { WebPartContext } from "@microsoft/sp-webpart-base"
import { App } from "./App"
import { IContentCalendarProps } from "./interfaces/IContentCalendarProps"
import { getDefaultConfig } from "./models"

describe("Content calendar configuration placeholder", () => {
  let props: IContentCalendarProps

  beforeEach(() => {
    jest.clearAllMocks()
    mockPlaceholder.mockImplementation(() => React.createElement("div", null, "Configure calendar"))
    mockCalendar.mockImplementation(() => React.createElement("div", null, "Live calendar"))
    props = {
      isDarkTheme: false,
      hasTeamsContext: false,
      userDisplayName: "Author",
      context: {} as WebPartContext,
      appMode: 0,
      title: "Content Calendar",
      displayMode: DisplayMode.Edit,
      onConfigure: jest.fn(),
      updateProperty: jest.fn(),
      service: {
        getPageContentTypes: jest.fn(),
        getSitePagesListId: jest.fn(),
        getItems: jest.fn(),
        createItem: jest.fn(),
        updateItem: jest.fn(),
        deleteItem: jest.fn(),
        createPage: jest.fn(),
      },
      config: getDefaultConfig(),
      locale: "en-US",
      instanceId: "test-instance",
    }
  })

  it("shows a configure placeholder instead of mounting an unconfigured calendar", () => {
    expect(renderToStaticMarkup(<App {...props} />)).toContain("Configure calendar")
    expect(mockPlaceholder.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        hideButton: false,
        onConfigure: props.onConfigure,
        buttonLabel: "Configure",
      }),
    )
    expect(mockCalendar).not.toHaveBeenCalled()
    expect(props.service.getItems).not.toHaveBeenCalled()
  })

  it("hides the configure button in read mode", () => {
    props.displayMode = DisplayMode.Read
    renderToStaticMarkup(<App {...props} />)

    expect(mockPlaceholder.mock.calls[0][0]).toEqual(
      expect.objectContaining({ hideButton: true }),
    )
  })

  it("mounts the calendar when a content list is selected", () => {
    props.config.listId = "site-pages-id"

    expect(renderToStaticMarkup(<App {...props} />)).toContain("Live calendar")
    expect(mockCalendar).toHaveBeenCalled()
    expect(mockPlaceholder).not.toHaveBeenCalled()
  })
})
