import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import WcIcon from "@mui/icons-material/Wc";
import BadgeIcon from "@mui/icons-material/Badge";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import SettingsIcon from "@mui/icons-material/Settings";
import FolderIcon from "@mui/icons-material/Folder";

import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import Dashboard from "../views/dashboard/dashboard";
import Boarders from "../views/boarders/boarders";
import Employees from "../views/employees/employees";
import Expenses from "../views/expenses/expenses";
import Income from "../views/income/income";
import Billing from "../views/billing/billing";
import Inventory from "../views/inventory/inventory";
import Analytics from "../views/analytics/analytics";
import Settings from "../views/settings/settings";
import Documents from "../views/documents/documents";
import { JSX } from "react";
import ExpenseClass from "../views/settings/expense-classes/expense-classes";
import ExpenseName from "../views/settings/expense-names/expense-names";
import SettingsTabLayout from "../views/settings/settings-tab-layout";
import { RouteObject } from "react-router-dom";
import ExpenseNames from "../views/settings/expense-names/expense-names";
import ExpenseClasses from "../views/settings/expense-classes/expense-classes";
import DashboardRoot from "../views/dashboard/dashboard-root";

type MenuConfig = {
  name: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  path: string;
  index?: boolean;
  element: (props: JSX.IntrinsicAttributes) => JSX.Element;
  children?: {
    index?: boolean;
    path: string;
    element: (props: JSX.IntrinsicAttributes) => JSX.Element;
  }[];
};

const utilityRoutes = [
  {
    // index app route
    index: true,
    name: "App Index Reroute",
    icon: DashboardIcon,
    path: "/app",
    element: DashboardRoot,
  },
];

export const menuList: MenuConfig[] = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/app/dashboard",
    element: Dashboard,
  },
  {
    name: "Boarders",
    icon: WcIcon,
    path: "/app/boarders",
    element: Boarders,
  },
  {
    name: "Employees",
    icon: BadgeIcon,
    path: "/app/employees",
    element: Employees,
  },
  {
    name: "Expenses",
    icon: ReceiptIcon,
    path: "/app/expenses",
    element: Expenses,
  },
  {
    name: "Income",
    icon: CurrencyRupeeIcon,
    path: "/app/income",
    element: Income,
  },
  {
    name: "Billing",
    icon: ReceiptLongIcon,
    path: "/app/billing",
    element: Billing,
  },
  {
    name: "Inventory",
    icon: WarehouseIcon,
    path: "/app/inventory",
    element: Inventory,
  },
  {
    name: "Analytics",
    icon: BarChartIcon,
    path: "/app/analytics",
    element: Analytics,
  },
  {
    name: "Documents",
    icon: FolderIcon,
    path: "/app/documents",
    element: Documents,
  },
  {
    name: "Settings",
    icon: SettingsIcon,
    path: "/app/settings",
    element: SettingsTabLayout,
    children: [
      {
        path: "/app/settings",
        element: ExpenseClasses,
        index: true,
      },
      {
        path: "/app/settings/expense-names",
        element: ExpenseNames,
      },
    ],
  },
];

export const routeList = menuList.concat(utilityRoutes);

export const domSensitivePaths = ["/entry-graphs", "/charts"];
