import type { ApiResponse } from "~/types/ygo";

const YGOAPI_BASE_URL = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

export const fetchCardsByDate = async (
  start: string,
  end: string,
): Promise<ApiResponse> => {
  return await $fetch<ApiResponse>(YGOAPI_BASE_URL, {
    query: { startdate: start, enddate: end },
  });
};

export const fetchCardById = async (id: string): Promise<ApiResponse> => {
  return await $fetch<ApiResponse>(YGOAPI_BASE_URL, { query: { id } });
};
