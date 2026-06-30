import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface IEventFeedListSkeletonProps {
  height?: number | string;
}

export const EventFeedListSkeleton: React.FC<IEventFeedListSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="vertical" gap="s" style={{ height, overflow: "hidden" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StackV2 key={i} direction="horizontal" gap="m" alignItems="center">
          <SkeletonItem shape="rectangle" size={56} style={{ width: 88, height: 64, flexShrink: 0 }} />
          <StackV2 direction="vertical" gap="xs" style={{ flex: 1, minWidth: 0 }}>
            <SkeletonItem shape="rectangle" size={12} style={{ width: "30%" }} />
            <SkeletonItem shape="rectangle" size={20} style={{ width: "70%" }} />
            <SkeletonItem shape="rectangle" size={14} style={{ width: "50%" }} />
          </StackV2>
        </StackV2>
      ))}
    </StackV2>
  </Skeleton>
);

export default EventFeedListSkeleton;
