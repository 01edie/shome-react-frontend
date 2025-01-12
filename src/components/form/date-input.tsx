import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";
import { DatePickerProps } from "../../types/form";
import { DatePicker } from "@mui/x-date-pickers";

function AppDatePicker(props: DatePickerProps) {
  const { name, ...attr } = props;
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name });
  return (
    <DatePicker
      {...field}
      slotProps={{
        textField: {
          size: "small",
          error: Boolean(fieldError),
          helperText: fieldError?.message,
          fullWidth: true,
        },
      }}
      format="DD/MM/YYYY"
      {...attr}
    />
  );
}

export default AppDatePicker;
