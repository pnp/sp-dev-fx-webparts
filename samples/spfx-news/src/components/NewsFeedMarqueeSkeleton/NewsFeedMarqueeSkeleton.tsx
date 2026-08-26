import * as React from "react";
import { Skeleton, SkeletonItem } from "@fluentui/react-components";
import { StackV2 } from "@spteck/react-controls-v2";

interface INewsFeedMarqueeSkeletonProps {
  height: number | string | undefined;
}

/**
 * marquee — vertical direction (default) uses NewsCardCompact: image 140×140 on left, text on right.
 * Mirrors: imageWidth={140} height={140} in NewsFeedMarquee.tsx (vertical orientation).
 * size=128 ensures SkeletonItem renders; style overrides both width and height.
 */
export const NewsFeedMarqueeSkeleton: React.FC<INewsFeedMarqueeSkeletonProps> = ({ height }) => (
  <Skeleton animation="wave" appearance="opaque">
    <StackV2 direction="vertical" gap="none" style={{ height, overflow: "hidden" }}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <StackV2 key={i} direction="horizontal" alignItems="stretch" style={{ height: 140, flexShrink: 0 }}>
          {/* image: 140×140 — size=128 so SkeletonItem renders; style overrides */}
          <SkeletonItem shape="rectangle" size={128} style={{ width: 140, height: 140, flexShrink: 0 }} />
          <StackV2
            direction="vertical"
            gap="xs"
            justifyContent="center"
            style={{ flex: 1, paddingLeft: 12, paddingRight: 12 }}
          >
            <SkeletonItem shape="rectangle" size={16} />
            <SkeletonItem shape="rectangle" size={14} style={{ width: "85%" }} />
            <SkeletonItem shape="rectangle" size={12} style={{ width: "50%" }} />
          </StackV2>
        </StackV2>
      ))}
    </StackV2>
  </Skeleton>
);

export default NewsFeedMarqueeSkeleton;
