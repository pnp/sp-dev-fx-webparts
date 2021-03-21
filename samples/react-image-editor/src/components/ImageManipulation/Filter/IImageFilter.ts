export interface IImageFilter {
  // describing function,
  // parameters are in left side parenthesis,
  // right side 'string' is return type
  process(imageData: ImageData, width: number, height: number, nvalue?: number, svalue?: string): ImageData;
}
