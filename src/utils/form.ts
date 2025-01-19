import z from "zod";

export const phoneRegEx = /^[6-9]\d{9}$/;

export const validateObjectWithId = (fieldName: string) =>
  z.any().superRefine((data, ctx) => {
    if (!data.id || data.id.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        path: [],
        message: `${fieldName} is required`,
      });
    }
  });

// for zod refine
export const positiveAmount = (value: string) => {
  const parsedValue = parseInt(value, 10);
  return value ? parsedValue >= 1 : true;
};

export type DefSelectOption = { id: string; label: string };
