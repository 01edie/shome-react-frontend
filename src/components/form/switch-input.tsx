import React from "react";
import { useController } from "react-hook-form";

import { SwitchInputProps, TextInputProps } from "../../types/form";
import { FormControlLabel, FormGroup, Switch, TextField } from "@mui/material";

function AppSwitchInput(props: SwitchInputProps) {
  const { name, label, ...attr } = props;
  const {
    field: { value, ...restField },
    fieldState: { error: fieldError },
  } = useController({ name });

  return (
    <FormGroup>
      {/* error not implemented */}
      {/* error={Boolean(fieldError)} helperText={fieldError?.message} */}
      <FormControlLabel
        sx={{ pb: 0, pt: 0 }}
        control={<Switch checked={value} {...restField} {...attr} />}
        label={label}
      />
    </FormGroup>
  );
}

export default AppSwitchInput;
