
export interface IFeed {
  channel: IChannel;
}

export interface IChannel {
  title: string;
  link: string;
  description: string;
  item: IItem[];
}

export interface IItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  enclosure: {
    url: string;
  };
  imageurl?: string;
  "content:encoded"?: string;
  "media:content"?: {
    url: string;
    height?: number;
    width?: number;
    medium?: "image";
  };
  "itunes:image"?: {
    href: string;
  };
  "media:thumbnail"?: {
    url: string;
  };
}

export type IFeedMapping = {
  [key: string]: IFeed;
}