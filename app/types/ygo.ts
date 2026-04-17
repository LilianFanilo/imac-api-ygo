// types/ygo.ts

export interface CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
}

export interface YgoCard {
  id: number;
  name: string;
  type: string;
  desc: string;
  race: string;
  attribute?: string;
  atk?: number;
  def?: number;
  level?: number;
  linkval?: number;
  card_images: CardImage[];
}

export interface ApiResponse {
  data: YgoCard[];
}
