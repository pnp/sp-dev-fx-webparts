import { useEffect } from "react"

export const useInfiniteScroll = (
  loaderRef: React.RefObject<HTMLDivElement>,
  isLoaderRef: boolean,
  hasMore: boolean,
  nextLink: string | undefined,
  fetchMorePosts: () => void
) => {
  useEffect(() => {
    const current = loaderRef.current
    if (!current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting && hasMore && nextLink) {
          fetchMorePosts()
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(current)

    return () => {
      observer.disconnect()
    }
  }, [isLoaderRef, hasMore, nextLink])
}
