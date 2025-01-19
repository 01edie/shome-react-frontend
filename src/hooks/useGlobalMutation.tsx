import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { AxiosResponse } from "axios";
import { notifyError, notifySuccess } from "../utils/notifications";

function useGlobalMutation<T>(
  options: UseMutationOptions<any, Error, T, unknown>
) {
  return useMutation({
    ...options,
    onSuccess: (res) => {
      notifySuccess(res?.message);
    },
    onError: (err) => {
      if (typeof err === "string") {
        notifyError(err);
      } else if (typeof err === "object") {
        // @ts-ignore
        notifyError(err?.response?.data?.error);
      } else {
        notifyError("Something went wrong");
      }
    },
  });
}

export default useGlobalMutation;
