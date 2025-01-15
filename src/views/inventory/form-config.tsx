import z from "zod";
import { Boarder, Employee, ExpenseType } from "../../types/models";

export const formSchema = z
  .object({
    quantityToAssign: z
      .string()
      .min(1, { message: "Quantity is required" })
      .max(4, { message: "Maximum quantity: 9999" })
      .refine(
        (value) => {
          const parsedValue = parseInt(value, 10);
          return parsedValue >= 1;
        },
        { message: "Quantity must be at least 1" }
      ),
    boarder: z
      .any()
      .optional()
      .transform((value) => value as Boarder),
    employee: z
      .any()
      .optional()
      .transform((value) => value as Employee),
    transactionType: z
      .string()
      .optional()
      .transform((value) => value as ExpenseType),
  })
  .refine(
    (data) => {
      if (data.transactionType === "boarder_expense") {
        return !!data.boarder?.id;
      }
      return true;
    },
    { message: "Boarder is required", path: ["boarder"] }
  )
  .refine(
    (data) => {
      if (data.transactionType === "employee_expense") {
        return !!data.employee?.id;
      }
      return true;
    },
    { message: "Employee is required", path: ["employee"] }
  );

export const formFields = {
  quantityToAssign: {
    name: "quantityToAssign",
    label: "Quantity",
    control: "text-input" as const,
    type: "number",
  },
  boarder: {
    name: "boarder",
    label: "Boarder",
    control: "select-input" as const,
  },
  employee: {
    name: "employee",
    label: "Employee",
    control: "select-input" as const,
  },
};
