import type { ApiResponse } from "~/types/ygo";

export const fetchCardsByDate = async (
  start: string,
  end: string,
): Promise<ApiResponse> => {
  const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?startdate=${start}&enddate=${end}`;

  return await $fetch<ApiResponse>(url);
};
