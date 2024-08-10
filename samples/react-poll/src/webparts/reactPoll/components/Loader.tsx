import * as React from "react";
import {
  Shimmer,
  ShimmerElementType,
  mergeStyles,
} from "@fluentui/react";

const ShimmerLoadder: React.FunctionComponent = () => {
  const wrapperClass = mergeStyles({
    padding: 2,
    selectors: {
      "& > .ms-Shimmer-container": {
        margin: "10px 0",
      },
    },
  });

  const shimmerWithElements = [
    { type: ShimmerElementType.circle },
    { type: ShimmerElementType.gap, width: "2%" },
    { type: ShimmerElementType.line },
  ];
  return (
    <div className={wrapperClass}>
      <Shimmer shimmerElements={shimmerWithElements} />
      <Shimmer width="80%" shimmerElements={shimmerWithElements} />
      <Shimmer width="60%" shimmerElements={shimmerWithElements} />

      <Shimmer shimmerElements={shimmerWithElements} />
      <Shimmer width="80%" shimmerElements={shimmerWithElements} />
      <Shimmer width="60%" shimmerElements={shimmerWithElements} />

      <Shimmer shimmerElements={shimmerWithElements} />
      <Shimmer width="80%" shimmerElements={shimmerWithElements} />
      <Shimmer width="60%" shimmerElements={shimmerWithElements} />
    </div>
  );
};

export { ShimmerLoadder };
