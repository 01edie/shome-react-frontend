import { Box, Divider, Paper, Typography } from "@mui/material";
import React, { JSX } from "react";

function FormWrapper<T>(Component: React.ComponentType<T>, title: string) {
  return (props: T & JSX.IntrinsicAttributes) => (
    <Paper
      sx={{ p: 2, borderRadius: 2, width: { xs: "100%", md:'75%' }, marginX: "auto" }}
      elevation={2}
    >
      <Typography variant="h5">{title}</Typography>
      <Divider sx={{ my: 1 }} />
      <Component {...props} />
    </Paper>
  );
}

export default FormWrapper;
