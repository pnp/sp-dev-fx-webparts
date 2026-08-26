import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface INewsFeedFilmstripSkeletonProps {
  height: number | string | undefined;
}

/**
 * filmstrip | carousel — horizontal row of 280px-wide NewsCards.
 * Mirrors: filmstripItem / carouselSlide width=280px, NewsCard AspectRatio ratio={16/9} → 280×158px image.
 * size=128 ensures SkeletonItem renders; style overrides both width and height.
 */
export const NewsFeedFilmstripSkeleton: React.FC<INewsFeedFilmstripSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="horizontal" gap="m" style={{ height, overflow: "hidden" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StackV2 key={i} direction="vertical" gap="xs" style={{ width: 280, flexShrink: 0 }}>
          {/* 280 × 158 = 16:9; size=128 so SkeletonItem renders */}
          <SkeletonItem shape="rectangle" size={128} style={{ width: 280, height: 158 }} />
          <SkeletonItem shape="rectangle" size={12} style={{ width: "40%" }} />
          <SkeletonItem shape="rectangle" size={16} />
          <SkeletonItem shape="rectangle" size={14} style={{ width: "75%" }} />
          <SkeletonItem shape="rectangle" size={12} style={{ width: "50%" }} />
        </StackV2>
      ))}
    </StackV2>
  </Skeleton>
);

export default NewsFeedFilmstripSkeleton;
