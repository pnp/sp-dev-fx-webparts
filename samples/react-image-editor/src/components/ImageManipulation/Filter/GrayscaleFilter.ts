import { IImageFilter } from './IImageFilter';

export class GrayscaleFilter implements IImageFilter {
 public process(imageData: ImageData, width: number, height: number, nvalue?: number, svalue?: string): ImageData {
    const data: Uint8ClampedArray = imageData.data;

    // Get length of all pixels in image each pixel made up of
    // 4 elements for each pixel, one for Red, Green, Blue and Alpha
    const arraylength: number = width * height * 4;
    // Common formula for converting to grayscale.
    // gray = 0.3*R + 0.59*G + 0.11*B
    for (let i: number = arraylength - 1; i > 0; i -= 4) {
      // R= i-3, G = i-2 and B = i-1
      // Get our gray shade using the formula
      const gray: number = 0.3 * data[i - 3] + 0.59 * data[i - 2] + 0.11 * data[i - 1];
      data[i - 3] = gray;
      data[i - 2] = gray;
      data[i - 1] = gray;
    }

    return (imageData);
  }
}
