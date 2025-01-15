import { useQuery } from "@tanstack/react-query";
import request from "../config/request";
import { API_ENDPOINTS } from "../constants/endpoints";
import useGlobalMutation from "./useGlobalMutation";
import {
  ExpenseClass,
  ExpenseClassCore,
  ExpenseName,
  ExpenseNameCore,
} from "../types/models";
import { QUERY_KEYS } from "../constants/query-keys";
import { GENERAL_CONFIGS } from "../config/app";

export function useExpenseNamesListData() {
  return useQuery<any>({
    queryKey: ["expense-names-list-data"],
    queryFn: () =>
      request({
        url: API_ENDPOINTS.expense_names,
      }),
    staleTime: GENERAL_CONFIGS.stale_time,
    refetchOnWindowFocus: false,
    select: (data: any): any[] => data?.data,
  });
}

export const useCreateExpenseClass = () => {
  return useGlobalMutation({
    mutationFn: ({ newData }: { newData: ExpenseClassCore }) =>
      request({
        url: API_ENDPOINTS.expense_classes,
        method: "POST",
        data: newData,
      }),
  });
};

export const useEditExpenseClass = () => {
  return useGlobalMutation({
    mutationFn: ({ newData }: { newData: ExpenseClass }) => {
      const { id, ...data } = newData;
      return request({
        url: API_ENDPOINTS.expense_classes + "/" + id,
        method: "PUT",
        data: data,
      });
    },
  });
};

export function useExpenseClassesListData() {
  return useQuery<any>({
    queryKey: [QUERY_KEYS.expenseClasses],
    queryFn: () =>
      request({
        url: API_ENDPOINTS.expense_classes,
      }),
    staleTime: GENERAL_CONFIGS.stale_time,
    refetchOnWindowFocus: false,
    select: (data: any): any[] => data?.data,
  });
}

export const useCreateExpenseName = () => {
  return useGlobalMutation({
    mutationFn: ({ newData }: { newData: ExpenseNameCore }) =>
      request({
        url: API_ENDPOINTS.expense_names,
        method: "POST",
        data: newData,
      }),
  });
};
export const useEditExpenseName = () => {
  return useGlobalMutation({
    mutationFn: ({ newData }: { newData: ExpenseName }) => {
      const { id, ...data } = newData;
      return request({
        url: API_ENDPOINTS.expense_names + "/" + id,
        method: "PUT",
        data: data,
      });
    },
  });
};
