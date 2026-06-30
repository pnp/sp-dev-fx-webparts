import { type IOption } from "@spteck/react-controls-v2";
export const LAYOUT_SVG: Record<string, string> = {
  // Full-width hero — neutral gray gradient + dark overlay bar with white text lines
  fullscreen: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='16' y1='13' x2='16' y2='22' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23202428' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23202428' stop-opacity='.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='30.5' height='22.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='2' width='28' height='20' rx='1.5' fill='url(%23a)'/%3E%3Crect x='2' y='13' width='28' height='9' fill='url(%23b)'/%3E%3Crect x='4' y='15.5' width='12' height='1.5' rx='.75' fill='%23ffffff' opacity='.85'/%3E%3Crect x='4' y='18' width='7' height='1' rx='.5' fill='%23ffffff' opacity='.55'/%3E%3C/svg%3E`,

  // Two equal columns — cool neutral image areas + gray text lines
  split: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='13.5' height='22.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='17.75' y='.75' width='13.5' height='22.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='2' width='11' height='9' rx='1' fill='url(%23a)'/%3E%3Crect x='19' y='2' width='11' height='9' rx='1' fill='url(%23a)'/%3E%3Crect x='2' y='13' width='7' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='2' y='15.5' width='5' height='1' rx='.5' fill='%23c8cacc'/%3E%3Crect x='19' y='13' width='7' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='19' y='15.5' width='5' height='1' rx='.5' fill='%23c8cacc'/%3E%3C/svg%3E`,

  // Large left + two stacked right — cool and warm neutral alternating
  featured: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='1' y1='0' x2='0' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23e2ddd8'/%3E%3Cstop offset='1' stop-color='%23bcb5ae'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='18.5' height='22.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='21.75' y='.75' width='9.5' height='10.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='21.75' y='12.75' width='9.5' height='10.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='2' width='16' height='11' rx='1' fill='url(%23a)'/%3E%3Crect x='23' y='2' width='7' height='4' rx='.75' fill='url(%23b)'/%3E%3Crect x='23' y='14' width='7' height='4' rx='.75' fill='url(%23b)'/%3E%3Crect x='2' y='15' width='10' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='2' y='17.5' width='7' height='1' rx='.5' fill='%23c8cacc'/%3E%3C/svg%3E`,

  // Asymmetric mosaic — cool main + warm secondary zones
  mosaic: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='1' y1='0' x2='0' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23e2ddd8'/%3E%3Cstop offset='1' stop-color='%23bcb5ae'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='13.5' height='13.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='16.75' y='.75' width='14.5' height='6' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='16.75' y='8.25' width='14.5' height='6' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='16.25' width='30.5' height='7' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='2' width='11' height='11' rx='1' fill='url(%23a)'/%3E%3Crect x='18' y='2' width='12' height='3.5' rx='.75' fill='url(%23b)'/%3E%3Crect x='18' y='9.5' width='12' height='3.5' rx='.75' fill='url(%23b)'/%3E%3Crect x='2' y='17.5' width='28' height='4.5' rx='.75' fill='url(%23a)'/%3E%3C/svg%3E`,

  // 3×2 grid — alternating cool/warm neutral for visual rhythm
  grid: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='1' y1='0' x2='0' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23e2ddd8'/%3E%3Cstop offset='1' stop-color='%23bcb5ae'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='11.75' y='.75' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='22.75' y='.75' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='13.25' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='11.75' y='13.25' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='22.75' y='13.25' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='2' width='6' height='7' rx='.75' fill='url(%23a)'/%3E%3Crect x='13' y='2' width='6' height='7' rx='.75' fill='url(%23b)'/%3E%3Crect x='24' y='2' width='6' height='7' rx='.75' fill='url(%23a)'/%3E%3Crect x='2' y='14.5' width='6' height='7' rx='.75' fill='url(%23b)'/%3E%3Crect x='13' y='14.5' width='6' height='7' rx='.75' fill='url(%23a)'/%3E%3Crect x='24' y='14.5' width='6' height='7' rx='.75' fill='url(%23b)'/%3E%3C/svg%3E`,

  // Main stage neutral gradient + dark overlay + warm neutral thumbnails
  filmstrip: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='16' y1='7' x2='16' y2='15.25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23202428' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23202428' stop-opacity='.45'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='1' y1='0' x2='0' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23e2ddd8'/%3E%3Cstop offset='1' stop-color='%23bcb5ae'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='30.5' height='13.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='16.75' width='8.5' height='6.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='11.75' y='16.75' width='8.5' height='6.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='22.75' y='16.75' width='8.5' height='6.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='2' width='28' height='11' rx='1.5' fill='url(%23a)'/%3E%3Crect x='2' y='7' width='28' height='6.25' fill='url(%23b)'/%3E%3Crect x='2' y='18' width='6' height='4' rx='.75' fill='url(%23c)'/%3E%3Crect x='13' y='18' width='6' height='4' rx='.75' fill='url(%23c)'/%3E%3Crect x='24' y='18' width='6' height='4' rx='.75' fill='url(%23c)'/%3E%3Crect x='4' y='8' width='10' height='1.5' rx='.75' fill='%23ffffff' opacity='.85'/%3E%3Crect x='4' y='10.5' width='7' height='1' rx='.5' fill='%23ffffff' opacity='.55'/%3E%3C/svg%3E`,

  // Carousel — neutral center panel + peeking sides + overlay + gray dots + arrows
  carousel: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='16' y1='11' x2='16' y2='18.25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23202428' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23202428' stop-opacity='.45'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='4.75' y='.75' width='22.5' height='17.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='3.25' width='3' height='12' rx='1.5' fill='%23ececec' stroke='%23c4ccd4' stroke-width='.75'/%3E%3Crect x='28.25' y='3.25' width='3' height='12' rx='1.5' fill='%23ececec' stroke='%23c4ccd4' stroke-width='.75'/%3E%3Crect x='6' y='2' width='20' height='10' rx='1.5' fill='url(%23a)'/%3E%3Crect x='6' y='11' width='20' height='6.25' fill='url(%23b)'/%3E%3Crect x='8' y='13' width='10' height='1.5' rx='.75' fill='%23ffffff' opacity='.85'/%3E%3Crect x='8' y='15.5' width='7' height='1' rx='.5' fill='%23ffffff' opacity='.55'/%3E%3Ccircle cx='13' cy='21.5' r='1.25' fill='%23c0c4c8'/%3E%3Ccircle cx='16' cy='21.5' r='1.5' fill='%23808890'/%3E%3Ccircle cx='19' cy='21.5' r='1.25' fill='%23c0c4c8'/%3E%3Cpath d='M2.25 9.25 L3.5 8 L3.5 10.5 Z' fill='%23909498'/%3E%3Cpath d='M29.75 9.25 L28.5 8 L28.5 10.5 Z' fill='%23909498'/%3E%3C/svg%3E`,
};

const IMAGE_SIZE = { width: 48, height: 36 };

export const LAYOUT_OPTIONS = [
  {
    key: "fullscreen",
    text: "Fullscreen",
    imageSrc: LAYOUT_SVG.fullscreen,
    selectedImageSrc: LAYOUT_SVG.fullscreen,
    imageSize: IMAGE_SIZE,
  },
  {
    key: "split",
    text: "Split",
    imageSrc: LAYOUT_SVG.split,
    selectedImageSrc: LAYOUT_SVG.split,
    imageSize: IMAGE_SIZE,
  },
  {
    key: "featured",
    text: "Featured",
    imageSrc: LAYOUT_SVG.featured,
    selectedImageSrc: LAYOUT_SVG.featured,
    imageSize: IMAGE_SIZE,
  },
  {
    key: "mosaic",
    text: "Mosaic",
    imageSrc: LAYOUT_SVG.mosaic,
    selectedImageSrc: LAYOUT_SVG.mosaic,
    imageSize: IMAGE_SIZE,
  },
  {
    key: "grid",
    text: "Grid",
    imageSrc: LAYOUT_SVG.grid,
    selectedImageSrc: LAYOUT_SVG.grid,
    imageSize: IMAGE_SIZE,
  },
  {
    key: "filmstrip",
    text: "Filmstrip",
    imageSrc: LAYOUT_SVG.filmstrip,
    selectedImageSrc: LAYOUT_SVG.filmstrip,
    imageSize: IMAGE_SIZE,
  },
  {
    key: "carousel",
    text: "Carousel",
    imageSrc: LAYOUT_SVG.carousel,
    selectedImageSrc: LAYOUT_SVG.carousel,
    imageSize: IMAGE_SIZE,
  },
];

export enum EMediaType {
  Image = "image",
  Video = "video",
}

export const TEXT_POSITION_OPTIONS: IOption[] = [
  { value: "top-left", text: "Top left" },
  { value: "top-center", text: "Top center" },
  { value: "top-right", text: "Top right" },
  { value: "center-left", text: "Center left" },
  { value: "center", text: "Center" },
  { value: "center-right", text: "Center right" },
  { value: "bottom-left", text: "Bottom left" },
  { value: "bottom-center", text: "Bottom center" },
  { value: "bottom-right", text: "Bottom right" },
];
