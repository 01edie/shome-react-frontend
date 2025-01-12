import React from "react";
import { useController } from "react-hook-form";

import { TextInputProps } from "../../types/form";
import { TextField, InputAdornment } from "@mui/material";

function AppAmountInput(props: TextInputProps) {
  const { name, ...attr } = props;
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name });

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value.replace(/,/g, ""));
    if (!isNaN(value)) {
      field.onChange(value.toLocaleString(undefined,{maximumFractionDigits:2,minimumFractionDigits:2}));
    } else {
      field.onChange("");
    }
  };

  return (
    <TextField
      fullWidth
      size="small"
      {...field}
      {...attr}
      error={Boolean(fieldError)}
      helperText={fieldError?.message}
      slotProps={{
        input: {
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
        },
      }}
      onBlur={handleBlur}
    />
  );
}

export default AppAmountInput;
