import { useCallback, useEffect, useState } from "react"
import { IContentCalendarConfig, IContentItem, IDateRange } from "../models"
import { IContentService } from "../services"

export interface IUseCalendarData {
  items: IContentItem[]
  loading: boolean
  error: string | undefined
  reload: () => void
}

// Fetches items for the visible range through the service and manages
// loading/error state. Re-runs when the range or relevant config changes.
// Presentation stays in components; all I/O stays in the service.
export function useCalendarData(
  service: IContentService,
  config: IContentCalendarConfig,
  range: IDateRange,
): IUseCalendarData {
  const [items, setItems] = useState<IContentItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | undefined>(undefined)
  // Bumped by reload() to force a refetch (e.g. after create/reschedule).
  const [nonce, setNonce] = useState<number>(0)

  // Primitive deps so the effect doesn't refire on new-but-equal object refs.
  const rangeKey = `${range.start.getTime()}-${range.end.getTime()}`

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(undefined)

    service
      .getItems(range, config)
      .then((result) => {
        if (cancelled) return
        setItems(result)
        setLoading(false)
      })
      .catch((e: Error) => {
        if (cancelled) return
        setItems([])
        setError(e.message)
        setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [service, config, rangeKey, nonce])

  const reload = useCallback(() => setNonce((n) => n + 1), [])

  return { items, loading, error, reload }
}
