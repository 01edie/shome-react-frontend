import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import theme from "./config/theme";
import { router } from "./config/router";
import { AuthProvider } from "./context/auth-context";

const queryClient = new QueryClient();

function Main() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <RouterProvider router={router} />
            </ThemeProvider>
          </LocalizationProvider>
          <ToastContainer />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(<Main />);
