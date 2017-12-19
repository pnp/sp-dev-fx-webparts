interface IImageMagnifierLensProps { 
        // the size of the magnifier window
        size?: number,
        
        // the offset of the zoom bubble from the cursor
        cursorOffset?:({
            x?: number,
            y?: number
        }),

        // the size of the non-zoomed-in image
        image?: ({
            src?: string,
            width?: number,
            height?: number
        }),

        // the size of the zoomed-in image
        zoomImage?: ({
            src?: string,
            width?: number,
            height?: number
        })
}

export default IImageMagnifierLensProps;