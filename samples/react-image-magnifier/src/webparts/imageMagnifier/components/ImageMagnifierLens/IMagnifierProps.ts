interface IMagnifierProps { 
    // the size of the magnifier window
    size?: number,
    
    // x position on screen
    x?: number,

    // y position on screen
    y?: number,

    // x position relative to the image
    offsetX?: number,

    // y position relative to the image
    offsetY?: number,

    // the offset of the zoom bubble from the cursor
    cursorOffset?: ({
        x?: number,
        y?: number
    }),

    // the size of the non-zoomed-in image
    smallImage?: ({
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

export default IMagnifierProps;