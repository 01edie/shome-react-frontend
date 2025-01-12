import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const formFields = {
  username: {
    name: "username",
    label: "Username",
    control: "text-input" as const,
    size: "small" as const,
    fullWidth: true,
    autoFocus: true,
    autoComplete: "username",
  },
  password: {
    name: "password",
    label: "Password",
    control: "text-input" as const,
    type: "password",
    size: "small" as const,
    fullWidth: true,
    // autoFocus: true,
    autoComplete: "current-password",
  },
};
