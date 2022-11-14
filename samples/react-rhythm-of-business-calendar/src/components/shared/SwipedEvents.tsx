import 'swiped-events';
import React, { forwardRef, ReactNode, useEffect, useRef } from "react";
import { useMergedRefs } from '@fluentui/react-hooks';

export interface SwipeEventDetails {
    dir: 'up' | 'down' | 'left' | 'right',  // swipe direction (up,down,left,right)
    touchType: 'direct' | 'stylus',         // touch type (stylus,direct) - stylus=apple pencil and direct=finger
    xStart: number,                         // x coords of swipe start
    xEnd: number,                           // x coords of swipe end
    yStart: number,                         // y coords of swipe start
    yEnd: number                            // y coords of swipe end
}

export type SwipeEventListener = (evt: Event & {
    detail: SwipeEventDetails;
}) => void;

interface IProps {
    threshold?: number;
    timeout?: number;
    handler: SwipeEventListener;
    children: ReactNode;
}

const SwipedEvents = forwardRef<HTMLDivElement, IProps>(({ threshold = 20, timeout = 500, handler, children }: IProps, forwardRef) => {
    const longPressRef = useRef<HTMLDivElement>();
    const ref = useMergedRefs(longPressRef, forwardRef);

    useEffect(
        () => {
            const element = longPressRef.current;
            element?.addEventListener("swiped", handler);
            return () => {
                element?.removeEventListener("swiped", handler);
            };
        },
        [handler]
    );

    return (
        <div ref={ref} data-swipe-threshold={threshold.toString()} data-swipe-timeout={timeout.toString()}>
            {children}
        </div>
    );
});

export default SwipedEvents;