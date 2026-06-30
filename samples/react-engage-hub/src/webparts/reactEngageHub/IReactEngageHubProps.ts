import { Theme } from "@fluentui/react"
import { DisplayMode } from "@microsoft/sp-core-library"
import { WebPartContext } from "@microsoft/sp-webpart-base"

export interface IReactEngageHubProps {
  isDarkTheme: boolean
  theme: Theme | undefined
  environmentMessage: string
  hasTeamsContext: boolean
  userDisplayName: string
  context: WebPartContext
  title: string
  displayMode: DisplayMode
  updateProperty: (value: string) => void
  maxFileLimit: number
  apiKey: string
  apiEndpoint: string
  deploymentName: string
}
