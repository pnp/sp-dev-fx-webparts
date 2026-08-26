import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface IEventFeedGridSkeletonProps {
  height?: number | string;
}

export const EventFeedGridSkeleton: React.FC<IEventFeedGridSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="vertical" gap="m" style={{ height, overflow: "hidden" }}>
      {[0, 1].map((row) => (
        <StackV2 key={row} direction="horizontal" gap="m">
          {[0, 1, 2].map((col) => (
            <StackV2 key={col} direction="vertical" gap="xs" style={{ flex: 1, minWidth: 0 }}>
              <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 140 }} />
              <SkeletonItem shape="rectangle" size={12} style={{ width: "40%" }} />
              <SkeletonItem shape="rectangle" size={20} />
              <SkeletonItem shape="rectangle" size={16} style={{ width: "85%" }} />
              <SkeletonItem shape="rectangle" size={12} style={{ width: "50%" }} />
            </StackV2>
          ))}
        </StackV2>
      ))}
    </StackV2>
  </Skeleton>
);

export default EventFeedGridSkeleton;
