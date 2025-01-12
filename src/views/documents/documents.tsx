import React from "react";
import ViewWrapper from "../../components/page/view-wrapper";
import { Box, Typography } from "@mui/material";
import ComingSoon from "../coming-soon";

type Props = {};

function Documents({}: Props) {
  return (
    <Box>
      <Typography>
        Collective Boarder documents, Employee documents and Internal documents
        here{" "}
      </Typography>
      <ComingSoon />
    </Box>
  );
}

export default ViewWrapper(Documents, "Documents");
