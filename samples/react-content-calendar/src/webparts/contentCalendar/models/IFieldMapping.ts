// Maps the domain model to the actual internal column names of the source list,
// so the web part works across differently-schema'd lists without code changes.
export interface IFieldMapping {
  title: string
  start: string
  end?: string
  contentType?: string
  status?: string
  owner?: string
  thumbnail?: string
  url?: string
}
