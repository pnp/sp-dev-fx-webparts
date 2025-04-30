export type CardLayout = "coverflow" | "cards"

export function getCardLayoutType(cardType: string): CardLayout | undefined {
  if (cardType === "coverEffect") return "coverflow"
  if (cardType === "cardEffect") return "cards"
  return undefined
}
