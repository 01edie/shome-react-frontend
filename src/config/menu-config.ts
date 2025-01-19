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
import BorderForm from "../views/boarders/boarders-form";
import EmployeeForm from "../views/employees/employee-form";
import ExpenseForm from "../views/expenses/expense-form";
import { APP_ROUTES } from "../constants/routes";

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

// routes not in menu
const otherRoutes = [
  {
    // index app route
    index: true,
    path: APP_ROUTES.appRoot,
    element: DashboardRoot,
  },
  {
    path: APP_ROUTES.boarderNew,
    element: BorderForm,
  },
  {
    path: APP_ROUTES.boarderEdit + "/:id",
    element: BorderForm,
  },
  {
    path: APP_ROUTES.employeeNew,
    element: EmployeeForm,
  },
  {
    path: APP_ROUTES.employeeEdit + "/:id",
    element: EmployeeForm,
  },
  {
    path: APP_ROUTES.expenseNew,
    element: ExpenseForm,
  },
  {
    path: APP_ROUTES.expenseEdit + "/:id",
    element: ExpenseForm,
  },
];

export const menuList: MenuConfig[] = [
  // {
  //   name: "Dashboard",
  //   icon: DashboardIcon,
  //   path: APP_ROUTES.dashboard,
  //   element: Dashboard,
  // },
  {
    name: "Boarders",
    icon: WcIcon,
    path: APP_ROUTES.boarders,
    element: Boarders,
  },
  {
    name: "Employees",
    icon: BadgeIcon,
    path: APP_ROUTES.employees,
    element: Employees,
  },
  {
    name: "Expenses",
    icon: ReceiptIcon,
    path: APP_ROUTES.expenses,
    element: Expenses,
  },
  // {
  //   name: "Income",
  //   icon: CurrencyRupeeIcon,
  //   path: APP_ROUTES.income,
  //   element: Income,
  // },
  // {
  //   name: "Billing",
  //   icon: ReceiptLongIcon,
  //   path: APP_ROUTES.billing,
  //   element: Billing,
  // },
  {
    name: "Inventory",
    icon: WarehouseIcon,
    path: APP_ROUTES.inventory,
    element: Inventory,
  },
  // {
  //   name: "Analytics",
  //   icon: BarChartIcon,
  //   path: APP_ROUTES.analytics,
  //   element: Analytics,
  // },
  // {
  //   name: "Documents",
  //   icon: FolderIcon,
  //   path: APP_ROUTES.documents,
  //   element: Documents,
  // },
  {
    name: "Settings",
    icon: SettingsIcon,
    path: APP_ROUTES.settings,
    element: SettingsTabLayout,
    children: [
      {
        path: APP_ROUTES.settings,
        element: ExpenseClasses,
        index: true,
      },
      {
        path: APP_ROUTES.settingsExpenseName,
        element: ExpenseNames,
      },
    ],
  },
];

// @ts-ignore
export const routeList = menuList.concat(otherRoutes);

export const domSensitivePaths = ["/entry-graphs", "/charts"];
