import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface IEventFeedMarqueeSkeletonProps {
  height?: number | string;
}

export const EventFeedMarqueeSkeleton: React.FC<IEventFeedMarqueeSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="vertical" gap="s" style={{ height, overflow: "hidden" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StackV2 key={i} direction="horizontal" gap="s" alignItems="center">
          <SkeletonItem shape="rectangle" size={40} style={{ width: 56, height: 40, flexShrink: 0 }} />
          <StackV2 direction="vertical" gap="xs" style={{ flex: 1, minWidth: 0 }}>
            <SkeletonItem shape="rectangle" size={16} style={{ width: "65%" }} />
            <SkeletonItem shape="rectangle" size={12} style={{ width: "40%" }} />
          </StackV2>
        </StackV2>
      ))}
    </StackV2>
  </Skeleton>
);

export default EventFeedMarqueeSkeleton;
