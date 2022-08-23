
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
  "itunes:image": {
    href: string;
  };
  "media:thumbnail": {
    url: string;
  };
}

export type IFeedMapping = {
  [key: string]: IFeed;
}