const appRoot = "/app";

export const APP_ROUTES = {
  root: "/",
  appRoot,
  login: "/login",
  dashboard: `${appRoot}/dashboard`,
  boarders: `${appRoot}/boarders`,
  boarderNew: `${appRoot}/boarders/new`,
  boarderEdit: `${appRoot}/boarders/edit`,
  employees: `${appRoot}/employees`,
  employeeNew: `${appRoot}/employees/new`,
  employeeEdit: `${appRoot}/employees/edit`,
  expenses: `${appRoot}/expenses`,
  expenseNew: `${appRoot}/expenses/new`,
  expenseEdit: `${appRoot}/expenses/edit`,
  income: `${appRoot}/income`,
  billing: `${appRoot}/billing`,
  inventory: `${appRoot}/inventory`,
  analytics: `${appRoot}/analytics`,
  documents: `${appRoot}/documents`,
  settings: `${appRoot}/settings`,
  settingsExpenseName: `${appRoot}/settings/expense-names`,
} as const;

export const homeRoute = APP_ROUTES.boarders;
