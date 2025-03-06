import { DisplayMode } from "@microsoft/sp-core-library"
import { WebPartContext } from "@microsoft/sp-webpart-base"

export interface IReactEngageHubProps {
  description: string
  isDarkTheme: boolean
  environmentMessage: string
  hasTeamsContext: boolean
  userDisplayName: string
  context: WebPartContext
  title: string
  displayMode: DisplayMode
  updateProperty: (value: string) => void
}
