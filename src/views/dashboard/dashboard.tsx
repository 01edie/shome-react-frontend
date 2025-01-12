import { Box, Typography } from "@mui/material";
import ViewWrapper from "../../components/page/view-wrapper";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { notifySuccess } from "../../utils/notifications";
import ComingSoon from "../coming-soon";

function Dashboard() {
  return (
    <Box>
      <Typography>Standard stats and analytics here</Typography>
      <ComingSoon />
    </Box>
  );
}

export default ViewWrapper(Dashboard, "Dashboard");
