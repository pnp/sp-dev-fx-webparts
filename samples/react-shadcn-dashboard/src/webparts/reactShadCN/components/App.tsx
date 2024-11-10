import * as React from "react"
import styles from "./app.module.scss"
import { IAppProps } from "./IAppProps"
import ProjectDashboard from "./Dashboard"

export default function App({ userDisplayName }: IAppProps) {
  return (
    <main
      className={`${styles.main}grid min-h-full place-items-center bg-white px-6  lg:px-8`}
    >
      <ProjectDashboard />
    </main>
  )
}
