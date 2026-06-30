export interface IColor {
  color: string
  value: string
  "aria-label": string
}

export const defaultColors: IColor[] = [
  {
    color: "#0078d4",
    value: "0078d4",
    "aria-label": "Primary",
  },
  {
    color: "#2b88d8",
    value: "2b88d8",
    "aria-label": "Secondary",
  },
  {
    color: "#e81123",
    value: "e81123",
    "aria-label": "Accent",
  },
  {
    color: "#107c10",
    value: "107c10",
    "aria-label": "Success",
  },
  {
    color: "#ffb900",
    value: "ffb900",
    "aria-label": "Warning",
  },
  {
    color: "#d13438",
    value: "d13438",
    "aria-label": "Error",
  },
  {
    color: "#005a9e",
    value: "005a9e",
    "aria-label": "Info",
  },
]
