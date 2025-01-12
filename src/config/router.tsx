import {
  createBrowserRouter,
  IndexRouteObject,
  NonIndexRouteObject,
  RouteObject,
} from "react-router-dom";

import { routeList } from "./menu-config";
import Login from "../views/auth/log-in";
import ProtectedRoute from "../components/auth/protected-route";
import Layout from "../layout/layout";
import Preview from "../views/preview/preview";
import TestComponent from "../views/test";
import ErrorBoundary from "../components/error-boundary/error-boundary";
import NotFoundPage from "../components/not-found/not-found";

const routes: RouteObject[] = routeList.map((e) => {
  if (e.index) {
    const indexedRoute: IndexRouteObject = {
      path: e.path,
      index: true,
      element: (
        <ProtectedRoute>
          <e.element />
        </ProtectedRoute>
      ),
    };
    return indexedRoute;
  }
  const nonIndexedRoute: NonIndexRouteObject = {
    path: e.path,
    element: (
      <ProtectedRoute>
        <e.element />
      </ProtectedRoute>
    ),
    children: e?.children?.map((c) => ({
      path: c.path,
      element: <c.element />,
      index: c.index,
    })),
  };
  return nonIndexedRoute;
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Preview />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: routes,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/test",
    element: <TestComponent />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
