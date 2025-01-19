import { Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
};

function FormLegend({ title }: Props) {
  return (
    <Typography
      variant="h6"
      sx={{ backgroundColor: "#efefef", p: 1, borderRadius: 1, mt:1, mb:0.5 }}
    >
      {title}
    </Typography>
  );
}

export default FormLegend;
