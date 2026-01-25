import * as htmlToImage from "html-to-image";

export type CaptureFormat = "png" | "webp";

export type CaptureOptions = {
    format: CaptureFormat;
    filenameBase?: string;
    pixelRatio?: number;          // 2 for sharper
    tileHeightPx?: number;        // e.g. 2500-4000 is safe
    backgroundColor?: string;     // e.g. "#ffffff"
    webpQuality?: number;         // 0..1
};

function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function getFullDocumentHeight(): number {
    const doc = document.documentElement;
    const body = document.body;

    return Math.max(
        body.scrollHeight,
        doc.scrollHeight,
        body.offsetHeight,
        doc.offsetHeight,
        body.clientHeight,
        doc.clientHeight
    );
}

export async function captureFullDocument(opts: CaptureOptions): Promise<void> {
    const {
        format,
        filenameBase = "snapshot",
        pixelRatio = 2,
        tileHeightPx = 3000,
        backgroundColor = "#ffffff",
        webpQuality = 0.92,
    } = opts;

    // For whole-page capture, body is usually better than documentElement
    const node = document.body as HTMLElement;

    // Ensure we're at top so fixed headers behave consistently
    const originalScrollY = window.scrollY;
    window.scrollTo(0, 0);

    // Give layout a moment to settle after scroll
    await new Promise((r) => setTimeout(r, 50));

    try {
        const fullWidth = Math.max(
            document.documentElement.clientWidth,
            document.body.scrollWidth,
            document.documentElement.scrollWidth
        );

        const fullHeight = getFullDocumentHeight();

        // Create a canvas big enough for the final stitched image.
        // Note: This is why we tile the capture, but still stitch into a big canvas.
        // If fullHeight is enormous, even the final canvas can exceed limits.
        const outCanvas = document.createElement("canvas");
        outCanvas.width = Math.round(fullWidth * pixelRatio);
        outCanvas.height = Math.round(fullHeight * pixelRatio);
        const outCtx = outCanvas.getContext("2d");
        if (!outCtx) throw new Error("Could not create 2D context");

        // Fill background so transparent areas aren't black in some viewers
        outCtx.fillStyle = backgroundColor;
        outCtx.fillRect(0, 0, outCanvas.width, outCanvas.height);

        // Tile loop
        let y = 0;
        while (y < fullHeight) {
            const tileHeight = Math.min(tileHeightPx, fullHeight - y);

            // Capture the visible portion by asking html-to-image to crop.
            // style.transform moves the page up so the y-section is at the top of the capture.
            const canvas = await htmlToImage.toCanvas(node, {
                backgroundColor,
                pixelRatio,
                width: fullWidth,
                height: tileHeight,
                style: {
                    transform: `translateY(-${y}px)`,
                    transformOrigin: "top left",
                },
                // Helpful for images/fonts that might otherwise fail:
                cacheBust: true,
            });

            // Draw tile onto final canvas
            outCtx.drawImage(
                canvas,
                0,
                0,
                canvas.width,
                canvas.height,
                0,
                Math.round(y * pixelRatio),
                canvas.width,
                canvas.height
            );

            y += tileHeight;
            // Small pause helps avoid locking up the UI
            await new Promise((r) => setTimeout(r, 0));
        }

        // Export final image
        const blob: Blob | null = await new Promise((resolve) => {
            const mime = format === "png" ? "image/png" : "image/webp";
            const quality = format === "webp" ? webpQuality : undefined;
            outCanvas.toBlob((b) => resolve(b), mime, quality);
        });

        if (!blob) throw new Error("Failed to export image blob");

        downloadBlob(blob, `${filenameBase}.${format}`);
    } finally {
        window.scrollTo(0, originalScrollY);
    }
}
