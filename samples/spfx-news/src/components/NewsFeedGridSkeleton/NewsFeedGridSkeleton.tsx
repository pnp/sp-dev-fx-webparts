import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface INewsFeedGridSkeletonProps {
  height: number | string | undefined;
}

/**
 * grid | mosaic — 3-column CSS grid of NewsCard, 2 rows.
 * Mirrors: minItemWidth={280}, gridAutoRows='minmax(400px, auto)', AspectRatio ratio={16/9}
 * Image height: 280px wide × 16/9 ≈ 158px. size=128 ensures SkeletonItem renders; style overrides.
 */
export const NewsFeedGridSkeleton: React.FC<INewsFeedGridSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="vertical" gap="m" style={{ height, overflow: "hidden" }}>
      {[0, 1].map((row) => (
        <StackV2 key={row} direction="horizontal" gap="m">
          {[0, 1, 2].map((col) => (
            <StackV2 key={col} direction="vertical" gap="xs" style={{ flex: 1, minWidth: 0 }}>
              {/* 16:9 image: size=128 so component renders; width/height style overrides */}
              <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: 158 }} />
              <SkeletonItem shape="rectangle" size={12} style={{ width: "40%" }} />
              <SkeletonItem shape="rectangle" size={20} />
              <SkeletonItem shape="rectangle" size={16} style={{ width: "90%" }} />
              <SkeletonItem shape="rectangle" size={14} style={{ width: "70%" }} />
              <SkeletonItem shape="rectangle" size={14} style={{ width: "55%" }} />
              <SkeletonItem shape="rectangle" size={12} style={{ width: "45%" }} />
            </StackV2>
          ))}
        </StackV2>
      ))}
    </StackV2>
  </Skeleton>
);

export default NewsFeedGridSkeleton;
