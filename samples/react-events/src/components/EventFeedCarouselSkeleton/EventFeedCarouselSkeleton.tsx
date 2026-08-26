import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface IEventFeedCarouselSkeletonProps {
  height?: number | string;
}

export const EventFeedCarouselSkeleton: React.FC<IEventFeedCarouselSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="vertical" gap="m" style={{ height, overflow: "hidden" }}>
      <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 260 }} />
      <SkeletonItem shape="rectangle" size={12} style={{ width: "25%" }} />
      <SkeletonItem shape="rectangle" size={24} style={{ width: "75%" }} />
      <SkeletonItem shape="rectangle" size={16} style={{ width: "55%" }} />
    </StackV2>
  </Skeleton>
);

export default EventFeedCarouselSkeleton;
