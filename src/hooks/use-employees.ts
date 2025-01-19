import { useQuery } from "@tanstack/react-query";
import request from "../config/request";
import { API_ENDPOINTS } from "../constants/endpoints";
import { QUERY_KEYS } from "../constants/query-keys";
import { GENERAL_CONFIGS } from "../config/app";
import { EmployeeCore } from "../types/models";
import useGlobalMutation from "./useGlobalMutation";

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

export const useAddEmployee = () => {
  return useGlobalMutation({
    mutationFn: ({ newData }: { newData: EmployeeCore }) =>
      request({
        url: API_ENDPOINTS.employees,
        method: "POST",
        data: newData,
      }),
  });
};

export const useEditEmployee = () => {
  return useGlobalMutation({
    mutationFn: ({ newData, id }: { newData: EmployeeCore; id: string }) =>
      request({
        url: API_ENDPOINTS.employees + "/" + id,
        method: "PUT",
        data: newData,
      }),
  });
};
