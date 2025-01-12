import { useQuery } from "@tanstack/react-query";
import request from "../config/request";
import { API_ENDPOINTS } from "../constants/endpoints";
import { QUERY_KEYS } from "../constants/query-keys";

export function useBoardersGridData() {
  return useQuery<any>({
    queryKey: [QUERY_KEYS.boarders],
    queryFn: () =>
      request({
        url: API_ENDPOINTS.boarders,
      }),
    staleTime: 1000 * 60 ** 2,
    refetchOnWindowFocus: false,
    select: (data: any): any[] => data?.data,
  });
}
