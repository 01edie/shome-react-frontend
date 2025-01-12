import { z } from "zod";
import { ExpenseTypeOption } from "../../constants/modules";
import {
  Boarder,
  Employee,
  ExpenseClass,
  ExpenseNameGridItem,
} from "../../types/models";

const validateObjectWithId = (fieldName: string) =>
  z.any().superRefine((data, ctx) => {
    if (!data.id || data.id.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        path: [],
        message: `${fieldName} is required`,
      });
    }
  });

export const formSchema = z
  .object({
    expenseName: validateObjectWithId("Expense Name").transform(
      (value) => value as ExpenseNameGridItem
    ),
    quantity: z
      .string()
      .min(1, { message: "Quantity is required" })
      .max(3, { message: "Maximum quantity: 999" })
      .refine(
        (value) => {
          const parsedValue = parseInt(value, 10);
          return parsedValue >= 1;
        },
        { message: "Quantity must be at least 1" }
      ),

    totalAmount: z
      .string()
      .min(1, { message: "Total amount is required" })
      .max(12, { message: "Maximum amount: 99 lakhs" }),

    userUnitAmount: z
      .string()
      .max(9, { message: "Maximum amount: 99 thousands" }),

    transactionDate: z
      .any()
      .refine((v) => v, { message: "Transaction date is required" }),

    isAssignLater: z.boolean().optional(),

    boarder: z
      .any()
      .optional()
      .transform((value) => value as Boarder),
    employee: z
      .any()
      .optional()
      .transform((value) => value as Employee),
    description: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.expenseName?.transactionType === "boarder_expense" &&
        !data.isAssignLater
      ) {
        return !!data.boarder?.id;
      }
      return true;
    },
    { message: "Boarder is required", path: ["boarder"] }
  )
  .refine(
    (data) => {
      if (
        data.expenseName?.transactionType === "employee_expense" &&
        !data.isAssignLater
      ) {
        return !!data.employee?.id;
      }
      return true;
    },
    { message: "Employee is required", path: ["employee"] }
  );

export const formFields = {
  expenseName: {
    name: "expenseName",
    label: "Expense Name",
    control: "select-input" as const,
  },
  transactionDate: {
    name: "transactionDate",
    label: "Transaction Date",
    control: "date-input" as const,
  },
  description: {
    name: "description",
    label: "Description",
    control: "text-input" as const,
  },
  quantity: {
    name: "quantity",
    label: "Quantity",
    control: "text-input" as const,
    type: "number",
  },
  totalAmount: {
    name: "totalAmount",
    label: "Total Amount",
    control: "amount-input" as const,
  },
  userUnitAmount: {
    name: "userUnitAmount",
    label: "User Amount (Per Unit)",
    control: "amount-input" as const,
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
  notes: {
    name: "notes",
    label: "Notes",
    control: "text-input" as const,
  },

  isAssignLater: {
    name: "isAssignLater",
    label: "Assign Later",
    control: "switch-input" as const,
  },
};
