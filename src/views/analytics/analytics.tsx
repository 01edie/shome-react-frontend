import React from "react";
import ViewWrapper from "../../components/page/view-wrapper";
import { Box, Typography } from "@mui/material";
import ComingSoon from "../coming-soon";

type Props = {};

function Analytics({}: Props) {
  return (
    <Box>
      <Typography>Main analytics here</Typography>
      <ComingSoon />
    </Box>
  );
}

export default ViewWrapper(Analytics, "Analytics");
