import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface INewsFeedMasonrySkeletonProps {
  height: number | string | undefined;
}

/**
 * masonry — 3 CSS columns of NewsCard at staggered heights.
 * Mirrors: columnCount=3 (desktop), breakInside='avoid', NewsCard with AspectRatio 16/9.
 * Staggered image heights simulate the natural masonry column-break layout.
 */
export const NewsFeedMasonrySkeleton: React.FC<INewsFeedMasonrySkeletonProps> = ({ height }) => {
  const imgHeights = [
    [180, 130, 210],
    [140, 220, 155],
    [200, 145, 180],
  ];

  return (
    <Skeleton animation="wave" appearance="opaque">
      <StackV2 direction="horizontal" gap="m" style={{ height, overflow: "hidden", alignItems: "flex-start" }}>
        {[0, 1, 2].map((col) => (
          <StackV2 key={col} direction="vertical" gap="m" style={{ flex: 1, minWidth: 0 }}>
            {imgHeights[col].map((imgH, row) => (
              <StackV2 key={row} direction="vertical" gap="xs">
                {/* size=128 so SkeletonItem renders; style overrides dimensions */}
                <SkeletonItem shape="rectangle" size={128} style={{ width: "100%", height: imgH }} />
                <SkeletonItem shape="rectangle" size={16} />
                <SkeletonItem shape="rectangle" size={14} style={{ width: "80%" }} />
                <SkeletonItem shape="rectangle" size={12} style={{ width: "55%" }} />
              </StackV2>
            ))}
          </StackV2>
        ))}
      </StackV2>
    </Skeleton>
  );
};

export default NewsFeedMasonrySkeleton;
