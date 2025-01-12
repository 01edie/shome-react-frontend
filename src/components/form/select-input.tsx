import React, { useState } from "react";
import { useController } from "react-hook-form";

import { SelectInputProps } from "../../types/form";
import { Autocomplete, TextField } from "@mui/material";

function AppSelectInput(props: SelectInputProps) {
  const { name, label, ...attr } = props;
  const {
    field: { value, onChange, ...restField },
    fieldState: { error: fieldError },
  } = useController({ name });

  return (
    <Autocomplete
      disablePortal
      value={value}
      onChange={(_, v) => {
        onChange(v);
      }}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      getOptionLabel={(opt) => opt?.label ?? ""}
      {...restField}
      {...attr}
      renderInput={(params) => (
        <TextField
          {...params}
          error={Boolean(fieldError)}
          helperText={fieldError?.message}
          label={label}
          size="small"
          fullWidth
        />
      )}
    />
  );
}

export default AppSelectInput;
