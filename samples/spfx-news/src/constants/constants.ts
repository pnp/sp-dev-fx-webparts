import * as strings from 'NewsFeedWebPartStrings';

/**
 * Inline SVG thumbnails for each NewsFeed layout — used in the property pane ChoiceGroup.
 * Follows the same pattern as the Hero webpart LAYOUT_SVG constants.
 */
export const LAYOUT_SVG: Record<string, string> = {
  // Grid — responsive 3-column card grid
  grid: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='1' y1='0' x2='0' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23e2ddd8'/%3E%3Cstop offset='1' stop-color='%23bcb5ae'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='11.75' y='.75' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='22.75' y='.75' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='13.25' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='11.75' y='13.25' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='22.75' y='13.25' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='2' width='6' height='7' rx='.75' fill='url(%23a)'/%3E%3Crect x='13' y='2' width='6' height='7' rx='.75' fill='url(%23b)'/%3E%3Crect x='24' y='2' width='6' height='7' rx='.75' fill='url(%23a)'/%3E%3Crect x='2' y='14.5' width='6' height='7' rx='.75' fill='url(%23b)'/%3E%3Crect x='13' y='14.5' width='6' height='7' rx='.75' fill='url(%23a)'/%3E%3Crect x='24' y='14.5' width='6' height='7' rx='.75' fill='url(%23b)'/%3E%3C/svg%3E`,

  // List — vertical stack of compact cards
  list: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='30.5' height='5.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='8.75' width='30.5' height='5.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='16.75' width='30.5' height='5.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='2' width='5' height='3.5' rx='.5' fill='url(%23a)'/%3E%3Crect x='2' y='10' width='5' height='3.5' rx='.5' fill='url(%23a)'/%3E%3Crect x='2' y='18' width='5' height='3.5' rx='.5' fill='url(%23a)'/%3E%3Crect x='9' y='2.5' width='10' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='9' y='4.5' width='6' height='1' rx='.5' fill='%23c8cacc'/%3E%3Crect x='9' y='10.5' width='10' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='9' y='12.5' width='6' height='1' rx='.5' fill='%23c8cacc'/%3E%3Crect x='9' y='18.5' width='10' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='9' y='20.5' width='6' height='1' rx='.5' fill='%23c8cacc'/%3E%3C/svg%3E`,

  // Filmstrip — horizontally scrollable strip
  filmstrip: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='1' y1='0' x2='0' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23e2ddd8'/%3E%3Cstop offset='1' stop-color='%23bcb5ae'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='2.75' width='8.5' height='18.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='11.75' y='2.75' width='8.5' height='18.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='22.75' y='2.75' width='8.5' height='18.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='4' width='6' height='8' rx='.75' fill='url(%23a)'/%3E%3Crect x='13' y='4' width='6' height='8' rx='.75' fill='url(%23b)'/%3E%3Crect x='24' y='4' width='6' height='8' rx='.75' fill='url(%23a)'/%3E%3Crect x='2' y='13.5' width='6' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='2' y='16' width='4' height='1' rx='.5' fill='%23c8cacc'/%3E%3Crect x='13' y='13.5' width='6' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='13' y='16' width='4' height='1' rx='.5' fill='%23c8cacc'/%3E%3Crect x='24' y='13.5' width='6' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='24' y='16' width='4' height='1' rx='.5' fill='%23c8cacc'/%3E%3C/svg%3E`,

  // Marquee — auto-scrolling vertical strip
  marquee: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='30.5' height='4.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='7.25' width='30.5' height='4.5' rx='2' fill='%23f4f5f6' fill-opacity='.6' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='13.75' width='30.5' height='4.5' rx='2' fill='%23f4f5f6' fill-opacity='.8' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='20.25' width='30.5' height='3' rx='2' fill='%23f4f5f6' fill-opacity='.3' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='1.5' width='4' height='3' rx='.5' fill='url(%23a)'/%3E%3Crect x='7.5' y='2' width='10' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='7.5' y='4' width='6' height='1' rx='.5' fill='%23c8cacc'/%3E%3Crect x='2' y='8' width='4' height='3' rx='.5' fill='url(%23a)'/%3E%3Crect x='7.5' y='8.5' width='10' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='7.5' y='10.5' width='6' height='1' rx='.5' fill='%23c8cacc'/%3E%3Crect x='2' y='14.5' width='4' height='3' rx='.5' fill='url(%23a)'/%3E%3Crect x='7.5' y='15' width='10' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='7.5' y='17' width='6' height='1' rx='.5' fill='%23c8cacc'/%3E%3C/svg%3E`,

  // Carousel — Embla carousel of full cards
  carousel: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='16' y1='11' x2='16' y2='18.25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23202428' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23202428' stop-opacity='.45'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='4.75' y='.75' width='22.5' height='17.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='3.25' width='3' height='12' rx='1.5' fill='%23ececec' stroke='%23c4ccd4' stroke-width='.75'/%3E%3Crect x='28.25' y='3.25' width='3' height='12' rx='1.5' fill='%23ececec' stroke='%23c4ccd4' stroke-width='.75'/%3E%3Crect x='6' y='2' width='20' height='10' rx='1.5' fill='url(%23a)'/%3E%3Crect x='6' y='11' width='20' height='6.25' fill='url(%23b)'/%3E%3Crect x='8' y='13' width='10' height='1.5' rx='.75' fill='%23ffffff' opacity='.85'/%3E%3Crect x='8' y='15.5' width='7' height='1' rx='.5' fill='%23ffffff' opacity='.55'/%3E%3Ccircle cx='13' cy='21.5' r='1.25' fill='%23c0c4c8'/%3E%3Ccircle cx='16' cy='21.5' r='1.5' fill='%23808890'/%3E%3Ccircle cx='19' cy='21.5' r='1.25' fill='%23c0c4c8'/%3E%3Cpath d='M2.25 9.25 L3.5 8 L3.5 10.5 Z' fill='%23909498'/%3E%3Cpath d='M29.75 9.25 L28.5 8 L28.5 10.5 Z' fill='%23909498'/%3E%3C/svg%3E`,

  // Masonry — Pinterest-style variable-height columns
  masonry: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='1' y1='0' x2='0' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23e2ddd8'/%3E%3Cstop offset='1' stop-color='%23bcb5ae'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='8.5' height='14' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='16.75' width='8.5' height='6.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='11.75' y='.75' width='8.5' height='7.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='11.75' y='10.25' width='8.5' height='13' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='22.75' y='.75' width='8.5' height='10' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='22.75' y='12.75' width='8.5' height='10.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='2' width='6' height='11.5' rx='.75' fill='url(%23a)'/%3E%3Crect x='2' y='17.5' width='6' height='5' rx='.75' fill='url(%23b)'/%3E%3Crect x='13' y='2' width='6' height='5.5' rx='.75' fill='url(%23b)'/%3E%3Crect x='13' y='11' width='6' height='11.5' rx='.75' fill='url(%23a)'/%3E%3Crect x='24' y='2' width='6' height='7.5' rx='.75' fill='url(%23a)'/%3E%3Crect x='24' y='13.5' width='6' height='8.5' rx='.75' fill='url(%23b)'/%3E%3C/svg%3E`,

  // Bento — hero + side tiles asymmetric grid
  bento: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='1' y1='0' x2='0' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23e2ddd8'/%3E%3Cstop offset='1' stop-color='%23bcb5ae'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='19.5' height='14' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='22.25' y='.75' width='9' height='6.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='22.25' y='9.25' width='9' height='5.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='16.75' width='9.5' height='6.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='12.25' y='16.75' width='8' height='6.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='22.25' y='16.75' width='9' height='6.5' rx='2' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='2' width='17' height='11.5' rx='.75' fill='url(%23a)'/%3E%3Crect x='23.5' y='2' width='6.5' height='4' rx='.75' fill='url(%23b)'/%3E%3Crect x='23.5' y='10.5' width='6.5' height='3' rx='.75' fill='url(%23a)'/%3E%3Crect x='2' y='18' width='7' height='4' rx='.75' fill='url(%23b)'/%3E%3Crect x='13.5' y='18' width='5.5' height='4' rx='.75' fill='url(%23a)'/%3E%3Crect x='23.5' y='18' width='6.5' height='4' rx='.75' fill='url(%23b)'/%3E%3C/svg%3E`,

  // Feature — alternating BigCard + 2 NewsCards rows
  feature: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='1' y1='0' x2='0' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23e2ddd8'/%3E%3Cstop offset='1' stop-color='%23bcb5ae'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='18.5' height='10.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='21.75' y='.75' width='9.5' height='10.5' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='.75' y='13.25' width='9.5' height='10' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='12.75' y='13.25' width='18.5' height='10' rx='2.25' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='1'/%3E%3Crect x='2' y='2' width='16' height='8.5' rx='1' fill='url(%23a)'/%3E%3Crect x='23' y='2' width='7' height='8.5' rx='1' fill='url(%23b)'/%3E%3Crect x='2' y='14.5' width='7' height='7.5' rx='1' fill='url(%23b)'/%3E%3Crect x='14' y='14.5' width='16' height='7.5' rx='1' fill='url(%23a)'/%3E%3C/svg%3E`,

  // Trending — ranked list with highlighted #1 item
  trending: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='24' viewBox='0 0 32 24' fill='none'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23dce3ea'/%3E%3Cstop offset='1' stop-color='%23b0bbc6'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='0' y1='0' x2='1' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%23f97316'/%3E%3Cstop offset='1' stop-color='%23ef4444'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect x='.75' y='.75' width='30.5' height='4.5' rx='1.5' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='.75'/%3E%3Crect x='.75' y='6.75' width='30.5' height='4.5' rx='1.5' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='.75'/%3E%3Crect x='.75' y='12.75' width='30.5' height='4.5' rx='1.5' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='.75'/%3E%3Crect x='.75' y='18.75' width='30.5' height='4.5' rx='1.5' fill='%23f4f5f6' fill-opacity='.4' stroke='%23c4ccd4' stroke-width='.75'/%3E%3Crect x='2' y='1.5' width='4' height='3' rx='.5' fill='url(%23c)'/%3E%3Crect x='2' y='7.5' width='4' height='3' rx='.5' fill='url(%23a)'/%3E%3Crect x='2' y='13.5' width='4' height='3' rx='.5' fill='url(%23a)'/%3E%3Crect x='2' y='19.5' width='4' height='3' rx='.5' fill='url(%23a)'/%3E%3Crect x='8' y='2' width='12' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='8' y='4' width='7' height='1' rx='.5' fill='%23c8cacc'/%3E%3Crect x='8' y='8' width='10' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='8' y='10' width='6' height='1' rx='.5' fill='%23c8cacc'/%3E%3Crect x='8' y='14' width='11' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='8' y='16' width='5' height='1' rx='.5' fill='%23c8cacc'/%3E%3Crect x='8' y='20' width='9' height='1.5' rx='.75' fill='%23b4b8bc'/%3E%3Crect x='8' y='22' width='5' height='1' rx='.5' fill='%23c8cacc'/%3E%3C/svg%3E`,
};

const IMAGE_SIZE = { width: 48, height: 36 };

export const LAYOUT_OPTIONS = [
  
  {
    key: 'grid',
    text: strings.LayoutGridLabel,
    imageSrc: LAYOUT_SVG.grid,
    selectedImageSrc: LAYOUT_SVG.grid,
    imageSize: IMAGE_SIZE,
  },
  {
    key: 'list',
    text: strings.LayoutListLabel,
    imageSrc: LAYOUT_SVG.list,
    selectedImageSrc: LAYOUT_SVG.list,
    imageSize: IMAGE_SIZE,
  },
  {
    key: 'filmstrip',
    text: strings.LayoutFilmstripLabel,
    imageSrc: LAYOUT_SVG.filmstrip,
    selectedImageSrc: LAYOUT_SVG.filmstrip,
    imageSize: IMAGE_SIZE,
  },
  {
    key: 'marquee',
    text: strings.LayoutMarqueeLabel,
    imageSrc: LAYOUT_SVG.marquee,
    selectedImageSrc: LAYOUT_SVG.marquee,
    imageSize: IMAGE_SIZE,
  },
  {
    key: 'carousel',
    text: strings.LayoutCarouselLabel,
    imageSrc: LAYOUT_SVG.carousel,
    selectedImageSrc: LAYOUT_SVG.carousel,
    imageSize: IMAGE_SIZE,
  },
  {
    key: 'feature',
    text: strings.LayoutFeatureLabel,
    imageSrc: LAYOUT_SVG.feature,
    selectedImageSrc: LAYOUT_SVG.feature,
    imageSize: IMAGE_SIZE,
  },
  {
    key: 'masonry',
    text: strings.LayoutMasonryLabel,
    imageSrc: LAYOUT_SVG.masonry,
    selectedImageSrc: LAYOUT_SVG.masonry,
    imageSize: IMAGE_SIZE,
  },
  /* {
    key: 'trending',
    text: strings.LayoutTrendingLabel,
    imageSrc: LAYOUT_SVG.trending,
    selectedImageSrc: LAYOUT_SVG.trending,
    imageSize: IMAGE_SIZE,
  }, */
 
];
