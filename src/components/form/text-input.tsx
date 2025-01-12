import React from "react";
import { useController } from "react-hook-form";

import { TextInputProps } from "../../types/form";
import { TextField } from "@mui/material";

function AppTextInput(props: TextInputProps) {
  const { name, ...attr } = props;
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name });

  return (
    <TextField
      fullWidth
      size="small"
      {...field}
      {...attr}
      error={Boolean(fieldError)}
      helperText={fieldError?.message}
    />
  );
}

export default AppTextInput;
