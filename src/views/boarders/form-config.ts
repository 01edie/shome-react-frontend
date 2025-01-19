import dayjs, { Dayjs } from "dayjs";
import { ExpenseTypeOption } from "../../constants/modules";
import {
  Boarder,
  Employee,
  ExpenseClass,
  ExpenseNameGridItem,
} from "../../types/models";
import z from "zod";
import {
  DefSelectOption,
  phoneRegEx,
  validateObjectWithId,
} from "../../utils/form";

export const bloodGroups = [
  { id: "A+", label: "A+" },
  { id: "A-", label: "A-" },
  { id: "B+", label: "B+" },
  { id: "B-", label: "B-" },
  { id: "AB+", label: "AB+" },
  { id: "AB-", label: "AB-" },
  { id: "O+", label: "O+" },
  { id: "O-", label: "O-" },
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

    dob: z
      .any()
      .refine((val) => val?.isValid(), {
        message: "Date of Birth is required",
      })
      .refine((val) => val?.isBefore(dayjs().add(1, "day"), "day"), {
        message: "Date of Birth cannot be in the future",
      }),

    contactNumber: z
      .string()
      .regex(phoneRegEx, { message: "Invalid Contact Number" })
      .optional(),

    guardianName: z.string().min(1, { message: "Guardian Name is required" }),

    emergencyContact: z
      .string()
      .regex(phoneRegEx, { message: "Invalid Emergency Contact Number" })
      .min(1, { message: "Emergency Contact is required" }),

    bloodGroup: validateObjectWithId("Blood Group").transform(
      (value) => value as DefSelectOption
    ),
    medicalCondition: z.string().optional(),
    specialNeeds: z.string().optional(),
    allergies: z.string().optional(),
    notes: z
      .string()
      .max(500, { message: "Notes cannot be longer than 500 characters" })
      .optional(),

    joiningDate: z
      .any()
      .refine((val) => val?.isValid(), {
        message: "Joining Date is required",
      })
      .refine((val) => val?.isBefore(dayjs().add(1, "day"), "day"), {
        message: "Joining Date cannot be in the future",
      }),
    roomNo: z
      .string()
      .max(3, { message: "Room number cannot be longer than 3 characters" })
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
        message: "Leaving Date is required when the boarder is inactive",
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
  dob: {
    name: "dob",
    label: "Date Of Birth",
    control: "date-input" as const,
  },
  bloodGroup: {
    name: "bloodGroup",
    label: "Blood Group*",
    control: "select-input" as const,
    options: bloodGroups,
  },
  contactNumber: {
    name: "contactNumber",
    label: "Contact Number",
    control: "text-input" as const,
    type: "number",
  },
  emergencyContact: {
    name: "emergencyContact",
    label: "Emergency Contact",
    control: "text-input" as const,
    type: "number",
  },
  guardianName: {
    name: "guardianName",
    label: "Guardian Name",
    control: "text-input" as const,
  },
  medicalCondition: {
    name: "medicalCondition",
    label: "Medical Condition",
    control: "text-input" as const,
  },
  specialNeeds: {
    name: "specialNeeds",
    label: "Special Needs",
    control: "text-input" as const,
  },
  allergies: {
    name: "allergies",
    label: "Allergies",
    control: "text-input" as const,
  },
  notes: {
    name: "notes",
    label: "Notes",
    control: "text-input" as const,
  },
  joiningDate: {
    name: "joiningDate",
    label: "Date of Joining*",
    control: "date-input" as const,
  },

  roomNo: {
    name: "roomNo",
    label: "Assigned Room",
    control: "text-input" as const,
    type: "number",
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
