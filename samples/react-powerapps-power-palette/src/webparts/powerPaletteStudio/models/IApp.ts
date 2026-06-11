import { IReadonlyTheme } from "@microsoft/sp-component-base"

export interface IAppProps {
  description: string
  isDarkTheme: boolean
  hasTeamsContext: boolean
  userDisplayName: string
  theme: IReadonlyTheme | undefined
}
