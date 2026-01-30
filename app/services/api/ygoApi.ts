// services/yugiohApi.ts

const BASE_URL = 'https://db.ygoprodeck.com/api/v7';

export interface YgoCard {
  id: number;
  name: string;
  type: string;
  desc: string;
  race: string;
  card_images: { image_url: string }[];
}

export interface CardResponse {
  data: YgoCard[];
}

/**
 * Récupère les cartes par date de sortie
 */
export const fetchCardsByDate = (
  startDate: string,
  endDate: string,
  region: 'tcg' | 'ocg' = 'tcg'
) => {
  return useFetch<CardResponse>(
    `${BASE_URL}/cardinfo.php`,
    {
      query: {
        startdate: startDate,
        enddate: endDate,
        dateregion: region
      }
    }
  );
};

/**
 * Récupère une carte par ID
 */
export const fetchCardById = (id: string | number) => {
  return useFetch<CardResponse>(
    `${BASE_URL}/cardinfo.php`,
    {
      query: { id }
    }
  );
};
