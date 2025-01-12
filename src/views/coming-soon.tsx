import React from "react";
import { Typography, Box } from "@mui/material";

function ComingSoon() {
  return (
    <Box
      style={{
        textAlign: "center",
        padding: "2rem",
        border: "1px solid #eaeaea",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" style={{ color: "#333", marginBottom: "0.5rem" }}>
        Coming Soon...
      </Typography>
      <Typography color="text.secondary">Stay tuned!</Typography>
    </Box>
  );
}

export default ComingSoon;
