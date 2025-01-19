import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import type { LoadingButtonProps } from "@mui/lab/LoadingButton";

function AppButton(props: LoadingButtonProps) {
  const { sx, ...restProps } = props;
  return (
    <LoadingButton sx={{ minWidth: 120, ...sx }} {...restProps} size="medium" />
  );
}

export default AppButton;
