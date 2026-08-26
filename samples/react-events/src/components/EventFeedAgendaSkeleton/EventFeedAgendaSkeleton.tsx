import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface IEventFeedAgendaSkeletonProps {
  height?: number | string;
}

export const EventFeedAgendaSkeleton: React.FC<IEventFeedAgendaSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="horizontal" gap="m" style={{ height, overflow: "hidden" }}>
      {/* Date column */}
      <StackV2 direction="vertical" gap="m" style={{ width: 56, flexShrink: 0 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <StackV2 key={i} direction="vertical" gap="xs" alignItems="center">
            <SkeletonItem shape="rectangle" size={12} style={{ width: 32 }} />
            <SkeletonItem shape="rectangle" size={20} style={{ width: 40 }} />
          </StackV2>
        ))}
      </StackV2>
      {/* Event rows */}
      <StackV2 direction="vertical" gap="s" style={{ flex: 1, minWidth: 0 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <StackV2 key={i} direction="vertical" gap="xs" style={{ paddingBottom: 8 }}>
            <SkeletonItem shape="rectangle" size={20} style={{ width: "60%" }} />
            <SkeletonItem shape="rectangle" size={14} style={{ width: "40%" }} />
            <SkeletonItem shape="rectangle" size={12} style={{ width: "50%" }} />
          </StackV2>
        ))}
      </StackV2>
    </StackV2>
  </Skeleton>
);

export default EventFeedAgendaSkeleton;
