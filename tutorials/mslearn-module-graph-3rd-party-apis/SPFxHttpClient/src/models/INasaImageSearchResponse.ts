export interface INasaItemData {
  title: string;
  keywords: string[];
  description: string;
}

export interface INasaItemLink {
  href: string;
}

export interface INasaItem {
  data: INasaItemData[];
  links: INasaItemLink[];
}

export interface INasaItemCollection {
  items: INasaItem[];
}

export interface INasaImageSearchResponse {
  collection: INasaItemCollection;
}
