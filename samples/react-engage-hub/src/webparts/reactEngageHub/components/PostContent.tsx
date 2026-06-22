import * as React from "react"
import { useState } from "react"
import { Link } from "@fluentui/react-components"
import TruncateMarkup from "react-truncate-markup"
import parse from "html-react-parser"

interface ShowMoreProps {
  html: string
}

export const PostContent: React.FC<ShowMoreProps> = ({ html }) => {
  const [expanded, setExpanded] = useState(false)
  const [isTruncated, setIsTruncated] = useState(false)

  return (
    <div>
      {expanded ? (
        <div>{parse(html)}</div>
      ) : (
        <TruncateMarkup
          lines={4}
          onTruncate={(wasTruncated) => setIsTruncated(wasTruncated)}
        >
          <div>{parse(html)}</div>
        </TruncateMarkup>
      )}
      {isTruncated && (
        <Link onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Show less" : "Show more"}
        </Link>
      )}
    </div>
  )
}
