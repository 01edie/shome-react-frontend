import { toast, ToastOptions } from "react-toastify";

const toastDefConfig: ToastOptions<unknown> = {
  autoClose: 2500,
};

export const notifySuccess = (
  message: string,
  options?: ToastOptions<unknown>
) => {
  const style = {
    width: message?.length > 34 ? "400px" : "350px",
  };
  return toast.success(message, { ...toastDefConfig, ...options });
};

export const notifyInfo = (
  message: string,
  options?: ToastOptions<unknown>
) => {
  const style = {
    width: message?.length > 34 ? "400px" : "350px",
  };
  return toast.info(message, { ...toastDefConfig, style, ...options });
};

export const notifyError = (
  message: string,
  options?: ToastOptions<unknown>
) => {
  const style = {
    width: message?.length > 34 ? "400px" : "350px",
  };
  return toast.error(message, { ...toastDefConfig, style, ...options });
};
