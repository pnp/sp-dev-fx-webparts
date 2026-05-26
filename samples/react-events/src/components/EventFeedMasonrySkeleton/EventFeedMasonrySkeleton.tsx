import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface IEventFeedMasonrySkeletonProps {
  height?: number | string;
}

export const EventFeedMasonrySkeleton: React.FC<IEventFeedMasonrySkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="horizontal" gap="m" style={{ height, overflow: "hidden" }}>
      {/* Column 1 */}
      <StackV2 direction="vertical" gap="m" style={{ flex: 1, minWidth: 0 }}>
        <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 180 }} />
        <SkeletonItem shape="rectangle" size={16} />
        <SkeletonItem shape="rectangle" size={12} style={{ width: "60%" }} />
        <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 100 }} />
        <SkeletonItem shape="rectangle" size={16} style={{ width: "80%" }} />
      </StackV2>
      {/* Column 2 */}
      <StackV2 direction="vertical" gap="m" style={{ flex: 1, minWidth: 0 }}>
        <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 120 }} />
        <SkeletonItem shape="rectangle" size={16} />
        <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 160 }} />
        <SkeletonItem shape="rectangle" size={16} style={{ width: "70%" }} />
      </StackV2>
      {/* Column 3 */}
      <StackV2 direction="vertical" gap="m" style={{ flex: 1, minWidth: 0 }}>
        <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 140 }} />
        <SkeletonItem shape="rectangle" size={16} style={{ width: "85%" }} />
        <SkeletonItem shape="rectangle" size={12} style={{ width: "55%" }} />
        <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 130 }} />
      </StackV2>
    </StackV2>
  </Skeleton>
);

export default EventFeedMasonrySkeleton;
