import { useQuery } from "@tanstack/react-query";
import request from "../config/request";
import { API_ENDPOINTS } from "../constants/endpoints";
import useGlobalMutation from "./useGlobalMutation";
import { ExpenseCore } from "../types/models";
import { QUERY_KEYS } from "../constants/query-keys";

export function useExpensesGridData() {
  return useQuery<any>({
    queryKey: [QUERY_KEYS.expenses],
    queryFn: () =>
      request({
        url: API_ENDPOINTS.expenses,
      }),
    staleTime: 1000 * 60 ** 2,
    refetchOnWindowFocus: false,
    select: (data: any): any[] => data?.data,
  });
}

export const useAddExpense = () => {
  return useGlobalMutation({
    mutationFn: ({ newData }: { newData: ExpenseCore }) =>
      request({
        url: API_ENDPOINTS.expenses,
        method: "POST",
        data: newData,
      }),
  });
};
