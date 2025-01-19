import z from "zod";
import { DefSelectOption, phoneRegEx, positiveAmount } from "../../utils/form";
import dayjs from "dayjs";

export const employeeRoles = [
  { id: "Operations Manager", label: "Operations Manager" },
  { id: "Resident Caregiver", label: "Resident Caregiver" },
  { id: "Wellness Nurse", label: "Wellness Nurse" },
  { id: "Medical Consultant", label: "Medical Consultant" },
  { id: "Culinary Specialist", label: "Culinary Specialist" },
  {
    id: "Facilities Maintainer",
    label: "Facilities Maintainer",
  },
  {
    id: "General Support",
    label: "General Support",
  },
  { id: "Transportation Coordinator", label: "Transportation Coordinator" },
];

export const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: "First Name is required" })
      .max(50, { message: "First Name cannot be longer than 50 characters" }),

    lastName: z
      .string()
      .min(1, { message: "Last Name is required" })
      .max(50, { message: "Last Name cannot be longer than 50 characters" }),

    contactNumber: z
      .string()
      .min(1, "Contact Number is required")
      .regex(phoneRegEx, { message: "Invalid Contact Number" }),
    joiningDate: z
      .any()
      .refine((val) => val?.isValid?.(), {
        message: "Joining Date is required",
      })
      .refine((val) => val?.isBefore(dayjs().add(1, "day"), "day"), {
        message: "Joining Date cannot be in the future",
      }),
    employeeRole: z
      .any()
      .optional()
      .transform((v) => v as DefSelectOption)
      .nullable(),
    salary: z
      .string()
      .min(1, { message: "Salary is required" })
      .max(9, { message: "Maximum amount: 99 thousands" })
      .refine(positiveAmount, { message: "Salary must be positive" }),
    notes: z
      .string()
      .max(500, { message: "Notes cannot be longer than 500 characters" })
      .optional(),
    active: z.boolean(),
    leavingDate: z.any(),
  })
  .superRefine((data, ctx) => {
    if (
      data.active === false &&
      (!data.leavingDate || !data.leavingDate.isValid())
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["leavingDate"],
        message: "Leaving Date is required when the employee is inactive",
      });
    }
  });

export const formFields = {
  firstName: {
    name: "firstName",
    label: "First Name",
    control: "text-input" as const,
  },
  lastName: {
    name: "lastName",
    label: "Last Name",
    control: "text-input" as const,
  },
  contactNumber: {
    name: "contactNumber",
    label: "Contact Number",
    control: "text-input" as const,
    type: "number",
  },
  employeeRole: {
    name: "employeeRole",
    label: "Role",
    control: "select-input" as const,
    options: employeeRoles,
  },
  salary: {
    name: "salary",
    label: "Salary*",
    control: "amount-input" as const,
  },
  notes: {
    name: "notes",
    label: "Notes",
    control: "text-input" as const,
  },
  joiningDate: {
    name: "joiningDate",
    label: "Date of Joining",
    control: "date-input" as const,
  },
  active: {
    name: "active",
    label: "Active",
    control: "switch-input" as const,
  },
  leavingDate: {
    name: "leavingDate",
    label: "Date of Leaving",
    control: "date-input" as const,
  },
};
