import React, { useEffect, useRef } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Paper,
} from "@mui/material";

import ParticleBackground from "../../components/particle-background/particle-background";

const NotFoundPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        zIndex: 10,
        // position:'relative',
        // backgroundColor: "#0093E9",
        // backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
      }}
      // onContextMenu={(e) => {
      //   e.preventDefault();
      // }}
    >
      <ParticleBackground />
      <Container component="main">
        <CssBaseline />
        <Typography variant="h4" color="white" textAlign='center'>
          Ops :( &nbsp;the page you're looking for doesn't exist yet
        </Typography>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
