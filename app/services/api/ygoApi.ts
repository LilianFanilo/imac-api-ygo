// services/api/ygoApi.ts
import type { ApiResponse } from "~/types/ygo";

// Note le ": Promise<ApiResponse>" explicite ici
export const fetchCardsByDate = async (
  start: string,
  end: string,
): Promise<ApiResponse> => {
  // Remplace cette URL par la tienne
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?startdate=${start}&enddate=${end}`;

  return await $fetch<ApiResponse>(url);
};
