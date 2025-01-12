import { z } from "zod";

export const formSchema = z.object({
  className: z
    .string()
    .min(1, { message: "Class name is required" })
    .max(50, { message: "Maximum characters allowed is 50" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(250, { message: "Maximum characters allowed is 250" }),
});

export const formFields = {
  className: {
    name: "className",
    label: "Class Name",
    control: "text-input" as const,
  },
  description: {
    name: "description",
    label: "Description",
    control: "text-input" as const,
    multiline:true,
    rows: 3,
  },
};
