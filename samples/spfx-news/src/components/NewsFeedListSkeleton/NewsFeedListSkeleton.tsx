import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface INewsFeedListSkeletonProps {
  height: number | string | undefined;
}

/**
 * list | trending — NewsCardCompact rows: image 140×140 on left, text column on right.
 * Mirrors: imageWidth={140} height={140} in NewsFeedList.tsx / NewsFeedTrending.tsx
 */
export const NewsFeedListSkeleton: React.FC<INewsFeedListSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="vertical" gap="none" style={{ height, overflow: "hidden" }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StackV2 key={i} direction="horizontal" alignItems="stretch" style={{ height: 140, flexShrink: 0 }}>
          {/* image: 140×140 — size=128 so the component renders; style overrides both dimensions */}
          <SkeletonItem shape="rectangle" size={128} style={{ width: 140, height: 140, flexShrink: 0 }} />
          <StackV2
            direction="vertical"
            gap="xs"
            justifyContent="center"
            style={{ flex: 1, paddingLeft: 12, paddingRight: 12 }}
          >
            <SkeletonItem shape="rectangle" size={12} style={{ width: "35%" }} />
            <SkeletonItem shape="rectangle" size={16} />
            <SkeletonItem shape="rectangle" size={14} style={{ width: "85%" }} />
            <SkeletonItem shape="rectangle" size={12} style={{ width: "50%" }} />
          </StackV2>
        </StackV2>
      ))}
    </StackV2>
  </Skeleton>
);

export default NewsFeedListSkeleton;
