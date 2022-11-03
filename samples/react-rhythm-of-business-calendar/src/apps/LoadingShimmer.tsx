import React, { memo } from "react";
import { ShimmerElementsGroup, ShimmerElementType, Stack, StackItem } from "@fluentui/react";

export const LoadingShimmer = memo(() => {
    if (window.outerWidth >= 640) {
        return (
            <Stack horizontal>
                <StackItem>
                    <ShimmerElementsGroup shimmerElements={[
                        // refiner rail
                        { type: ShimmerElementType.gap, width: 20, height: 456 }, // outer margin
                        { type: ShimmerElementType.line, width: 150, height: 444, verticalAlign: 'bottom' },
                    ]} />
                </StackItem>
                <StackItem grow>
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // command bar
                        { type: ShimmerElementType.gap, width: 20, height: 48 + 12 }, // outer margin
                        { type: ShimmerElementType.line, width: '25%', height: 32 },
                        { type: ShimmerElementType.gap, width: '75%', height: 1 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // date rotator and view nav
                        { type: ShimmerElementType.gap, width: 20, height: 32 + 12 }, // outer margin
                        { type: ShimmerElementType.line, width: '15%', height: 32 },
                        { type: ShimmerElementType.gap, width: '60%', height: 1 },
                        { type: ShimmerElementType.line, width: '25%', height: 32 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // weekdays header
                        { type: ShimmerElementType.gap, width: 20, height: 16 + 12 }, // outer margin
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // week 1
                        { type: ShimmerElementType.gap, width: 20, height: 75 + 6 }, // outer margin
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // week 2
                        { type: ShimmerElementType.gap, width: 20, height: 75 + 6 }, // outer margin
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // week 3
                        { type: ShimmerElementType.gap, width: 20, height: 75 + 6 }, // outer margin
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // week 4
                        { type: ShimmerElementType.gap, width: 20, height: 75 + 6 }, // outer margin
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 20, height: 1 } // outer margin
                    ]} />
                </StackItem>
            </Stack>
        );
    } else {
        return (
            <Stack horizontal>
                <StackItem>
                    <ShimmerElementsGroup shimmerElements={[
                        // refiner rail
                        { type: ShimmerElementType.gap, width: 10, height: 448 }, // outer margin
                        { type: ShimmerElementType.line, width: 40, height: 440, verticalAlign: 'bottom' },
                    ]} />
                </StackItem>
                <StackItem grow>
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // command bar
                        { type: ShimmerElementType.gap, width: 10, height: 48 + 12 }, // outer margin
                        { type: ShimmerElementType.line, width: '90%', height: 32 },
                        { type: ShimmerElementType.gap, width: '10%', height: 1 },
                        { type: ShimmerElementType.gap, width: 10, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // date rotator
                        { type: ShimmerElementType.gap, width: 10, height: 32 + 12 }, // outer margin
                        { type: ShimmerElementType.line, width: '50%', height: 32 },
                        { type: ShimmerElementType.gap, width: '50%', height: 1 },
                        { type: ShimmerElementType.gap, width: 10, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // view nav
                        { type: ShimmerElementType.gap, width: 10, height: 32 + 12 }, // outer margin
                        { type: ShimmerElementType.line, width: '75%', height: 32 },
                        { type: ShimmerElementType.gap, width: '25%', height: 1 },
                        { type: ShimmerElementType.gap, width: 10, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // weekdays header
                        { type: ShimmerElementType.gap, width: 10, height: 16 + 12 }, // outer margin
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 16 },
                        { type: ShimmerElementType.gap, width: 10, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // week 1
                        { type: ShimmerElementType.gap, width: 10, height: 75 + 4 }, // outer margin
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 10, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // week 2
                        { type: ShimmerElementType.gap, width: 10, height: 75 + 4 }, // outer margin
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 10, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // week 3
                        { type: ShimmerElementType.gap, width: 10, height: 75 + 4 }, // outer margin
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 10, height: 1 } // outer margin
                    ]} />
                    <ShimmerElementsGroup width="100%" shimmerElements={[
                        // week 4
                        { type: ShimmerElementType.gap, width: 10, height: 75 + 4 }, // outer margin
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 5, height: 1 },
                        { type: ShimmerElementType.line, width: '14%', height: 75 },
                        { type: ShimmerElementType.gap, width: 10, height: 1 } // outer margin
                    ]} />
                </StackItem>
            </Stack>
        );
    }
});