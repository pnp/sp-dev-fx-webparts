import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface IEventFeedFilmstripSkeletonProps {
  height?: number | string;
}

export const EventFeedFilmstripSkeleton: React.FC<IEventFeedFilmstripSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="horizontal" gap="m" style={{ height, overflow: "hidden" }}>
      {[0, 1, 2, 3].map((i) => (
        <StackV2 key={i} direction="vertical" gap="xs" style={{ flex: 1, minWidth: 0 }}>
          <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 120 }} />
          <SkeletonItem shape="rectangle" size={12} style={{ width: "40%" }} />
          <SkeletonItem shape="rectangle" size={16} />
          <SkeletonItem shape="rectangle" size={14} style={{ width: "70%" }} />
        </StackV2>
      ))}
    </StackV2>
  </Skeleton>
);

export default EventFeedFilmstripSkeleton;
