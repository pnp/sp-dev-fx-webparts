import { IContentTypeConfig } from "../models"

const FALLBACK: IContentTypeConfig = {
  enabled: true,
  name: "Other",
  sourceValue: "",
  color: "#8a8886",
  icon: "Page",
}

// Resolves a raw source value (Content Type column value or list title) to its
// configured type, matching case-insensitively against both `sourceValue` and
// `name`. Returns a neutral fallback so an unmapped row still renders.
export function resolveContentType(
  raw: string | undefined,
  contentTypes: IContentTypeConfig[],
): IContentTypeConfig {
  if (!raw) return FALLBACK
  const needle = raw.trim().toLowerCase()
  const match = contentTypes.find(
    (t) =>
      t.sourceValue.trim().toLowerCase() === needle ||
      t.name.trim().toLowerCase() === needle,
  )
  return match ?? { ...FALLBACK, name: raw }
}
