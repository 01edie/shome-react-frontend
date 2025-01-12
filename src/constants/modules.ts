import { ExpenseType } from "../types/models";

export const ExpenseTypes = {
  internal: "internal_expense",
  boarder: "boarder_expense",
  employee: "employee_expense",
} as const;

export interface AppSelectInputOption {
  id: string;
  label: string;
}
export interface ExpenseTypeOption {
  id: ExpenseType;
  label: string;
}

export const ExpenseTypeOptions: ExpenseTypeOption[] = [
  { id: "internal_expense", label: "Internal Expense" },
  { id: "boarder_expense", label: "Boarder Expense" },
  { id: "employee_expense", label: "Employee Expense" },
];
