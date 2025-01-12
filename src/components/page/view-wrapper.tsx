import { Box, Divider, Paper, Typography } from "@mui/material";
import React, { JSX } from "react";

function ViewWrapper<T>(Component: React.ComponentType<T>, title: string) {
  return (props: T & JSX.IntrinsicAttributes) => (
    <Paper sx={{ p: 2, borderRadius: 2 }} elevation={2}>
      <Typography variant="h5">{title}</Typography>
      <Divider sx={{ my: 1 }} />
      <Component {...props} />
    </Paper>
  );
}

export default ViewWrapper;
