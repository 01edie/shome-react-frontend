import { useQuery } from "@tanstack/react-query";
import request from "../config/request";
import { API_ENDPOINTS } from "../constants/endpoints";
import useGlobalMutation from "./useGlobalMutation";
import { InventoryAssignment } from "../types/models";
import { QUERY_KEYS } from "../constants/query-keys";

export function useInventoryGridData() {
  return useQuery<any>({
    queryKey: [QUERY_KEYS.inventory],
    queryFn: () =>
      request({
        url: API_ENDPOINTS.inventory,
      }),
    staleTime: 1000 * 60 ** 2,
    refetchOnWindowFocus: false,
    select: (data: any): any[] => data?.data,
  });
}

export const useAssignInventoryItem = () => {
  return useGlobalMutation({
    mutationFn: ({
      id,
      newData,
    }: {
      id: string;
      newData: InventoryAssignment;
    }) =>
      request({
        url: API_ENDPOINTS.inventory + "/" + id,
        method: "PUT",
        data: newData,
      }),
  });
};
