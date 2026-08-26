import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface INewsFeedFeatureSkeletonProps {
  height: number | string | undefined;
}

/**
 * feature — 7-column CSS grid, two alternating rows per chunk.
 *   Row A: NewsBigCard overlay (flex 3) | NewsCard (flex 2) | NewsCard (flex 2)
 *   Row B: NewsCard (flex 2) | NewsCard (flex 2) | NewsBigCard overlay (flex 3)
 * size=128 ensures SkeletonItem renders; style overrides both width and height.
 */
export const NewsFeedFeatureSkeleton: React.FC<INewsFeedFeatureSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="vertical" gap="m" style={{ height, overflow: "hidden" }}>
      {/* Row A: BigCard left (flex 3), two NewsCards right (flex 2 each) */}
      <StackV2 direction="horizontal" gap="m" alignItems="stretch">
        <StackV2 direction="vertical" style={{ flex: 3, minWidth: 0 }}>
          <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 260 }} />
        </StackV2>
        {[0, 1].map((j) => (
          <StackV2 key={j} direction="vertical" gap="xs" style={{ flex: 2, minWidth: 0 }}>
            <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 158 }} />
            <SkeletonItem shape="rectangle" size={12} style={{ width: "40%" }} />
            <SkeletonItem shape="rectangle" size={16} />
            <SkeletonItem shape="rectangle" size={14} style={{ width: "75%" }} />
            <SkeletonItem shape="rectangle" size={12} style={{ width: "50%" }} />
          </StackV2>
        ))}
      </StackV2>
      {/* Row B: two NewsCards left (flex 2 each), BigCard right (flex 3) */}
      <StackV2 direction="horizontal" gap="m" alignItems="stretch">
        {[0, 1].map((j) => (
          <StackV2 key={j} direction="vertical" gap="xs" style={{ flex: 2, minWidth: 0 }}>
            <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 158 }} />
            <SkeletonItem shape="rectangle" size={12} style={{ width: "40%" }} />
            <SkeletonItem shape="rectangle" size={16} />
            <SkeletonItem shape="rectangle" size={14} style={{ width: "75%" }} />
            <SkeletonItem shape="rectangle" size={12} style={{ width: "50%" }} />
          </StackV2>
        ))}
        <StackV2 direction="vertical" style={{ flex: 3, minWidth: 0 }}>
          <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 260 }} />
        </StackV2>
      </StackV2>
    </StackV2>
  </Skeleton>
);

export default NewsFeedFeatureSkeleton;
