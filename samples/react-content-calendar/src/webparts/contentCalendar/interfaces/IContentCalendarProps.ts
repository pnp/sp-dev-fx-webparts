import { WebPartContext } from "@microsoft/sp-webpart-base"
import { AppMode } from "../ContentCalendarWebPart"
import { DisplayMode } from "@microsoft/sp-core-library"
import { IContentCalendarConfig } from "../models"
import { IContentService } from "../services"

export interface IContentCalendarProps {
  isDarkTheme: boolean
  hasTeamsContext: boolean
  userDisplayName: string
  context: WebPartContext
  appMode: AppMode
  title: string
  displayMode: DisplayMode
  onConfigure: () => void
  updateProperty: (value: string) => void
  // Data layer + resolved settings + locale, injected by the web part shell.
  service: IContentService
  config: IContentCalendarConfig
  locale: string
  // Web part instance id, used to scope placeholder localStorage.
  instanceId: string
}
