import { z } from "zod";
import { ExpenseClass } from "../../../types/models";
import { AppSelectInputOption, ExpenseTypeOption } from "../../../constants/modules";

const validateObjectWithId = (fieldName: string) =>
  z
    .object({
      id: z.string(),
    })
    .superRefine((data, ctx) => {
      if (!data.id || data.id.trim().length === 0) {
        ctx.addIssue({
          code: "custom",
          path: [],
          message: `${fieldName} is required`,
        });
      }
    });

export const formSchema = z.object({
  expenseName: z
    .string()
    .min(1, { message: "Expense name is required" })
    .max(50, { message: "Maximum characters allowed is 50" }),
  unit: z
    .string()
    .min(1, { message: "Unit is required" })
    .max(10, { message: "Maximum characters allowed is 10" }),
  expenseType: validateObjectWithId("Expense type").transform(
    (value) => value as ExpenseTypeOption
  ),
  expenseClass: validateObjectWithId("Expense class").transform(
    (value) => value as ExpenseClass
  ),
  isInventoryItem: z.boolean(),
});

export const formFields = {
  expenseName: {
    name: "expenseName",
    label: "Expense Name",
    control: "text-input" as const,
  },
  expenseType: {
    name: "expenseType",
    label: "Expense Type",
    control: "select-input" as const,
  },
  expenseClass: {
    name: "expenseClass",
    label: "Expense Class",
    control: "select-input" as const,
  },
  unit: {
    name: "unit",
    label: "Unit",
    control: "text-input" as const,
  },
  isInventoryItem: {
    name: "isInventoryItem",
    label: "Inventory Item",
    control: "switch-input" as const,
  },
};
