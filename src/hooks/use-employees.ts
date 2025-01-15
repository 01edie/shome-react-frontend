import { useQuery } from "@tanstack/react-query";
import request from "../config/request";
import { API_ENDPOINTS } from "../constants/endpoints";
import { QUERY_KEYS } from "../constants/query-keys";
import { GENERAL_CONFIGS } from "../config/app";

export function useEmployeesGridData() {
  return useQuery<any>({
    queryKey: [QUERY_KEYS.employees],
    queryFn: () =>
      request({
        url: API_ENDPOINTS.employees,
      }),
      staleTime: GENERAL_CONFIGS.stale_time,
    refetchOnWindowFocus: false,
    select: (data: any): any[] => data?.data,
  });
}
