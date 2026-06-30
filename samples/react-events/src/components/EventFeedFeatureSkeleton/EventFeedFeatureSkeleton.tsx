import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface IEventFeedFeatureSkeletonProps {
  height?: number | string;
}

export const EventFeedFeatureSkeleton: React.FC<IEventFeedFeatureSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="horizontal" gap="m" style={{ height, overflow: "hidden" }}>
      {/* Main feature card */}
      <StackV2 direction="vertical" gap="xs" style={{ flex: 2, minWidth: 0 }}>
        <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 220 }} />
        <SkeletonItem shape="rectangle" size={12} style={{ width: "30%" }} />
        <SkeletonItem shape="rectangle" size={24} style={{ width: "85%" }} />
        <SkeletonItem shape="rectangle" size={16} style={{ width: "70%" }} />
      </StackV2>
      {/* Secondary cards */}
      <StackV2 direction="vertical" gap="m" style={{ flex: 1, minWidth: 0 }}>
        {[0, 1].map((i) => (
          <StackV2 key={i} direction="vertical" gap="xs">
            <SkeletonItem shape="rectangle" size={64} style={{ width: "100%", height: 90 }} />
            <SkeletonItem shape="rectangle" size={12} style={{ width: "35%" }} />
            <SkeletonItem shape="rectangle" size={16} style={{ width: "80%" }} />
          </StackV2>
        ))}
      </StackV2>
    </StackV2>
  </Skeleton>
);

export default EventFeedFeatureSkeleton;
