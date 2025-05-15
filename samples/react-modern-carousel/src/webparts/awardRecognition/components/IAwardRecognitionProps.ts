import { WebPartContext } from "@microsoft/sp-webpart-base"

export interface IAwardRecognitionProps {
  mainHeading: string
  subHeading: string
  subHeadingDescription: string
  isDarkTheme: boolean
  environmentMessage: string
  hasTeamsContext: boolean
  userDisplayName: string
  animationChoice: string
  cardType: string
  cardStyle: string
  context: WebPartContext
}
