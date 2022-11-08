import { useCallback, useEffect, useState } from "react"

export const useWindowSize = () => {
    const [width, setWidth] = useState(innerWidth);
    const [height, setHeight] = useState(innerHeight);

    const handleWindowResize = useCallback(() => {
        setWidth(innerWidth);
        setHeight(innerHeight);
    }, [setWidth, setHeight]);

    useEffect(() => {
        addEventListener('resize', handleWindowResize);
        return () => removeEventListener('resize', handleWindowResize);
    }, [handleWindowResize]);

    return {
        width,
        height
    } as const;
};