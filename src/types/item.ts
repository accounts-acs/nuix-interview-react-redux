export type ItemProperties = Record<string, string | number>;

export interface Item {
  guid: string;
  name: string;
  path: string[];
  properties: ItemProperties;
}
