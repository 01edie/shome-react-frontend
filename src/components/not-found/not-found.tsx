import React, { useEffect, useRef } from "react";
import { Box, Typography, Container, CssBaseline } from "@mui/material";

import ParticleBackground from "../../components/particle-background/particle-background";
import AppButton from "../form/app-button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        background: "black",
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

        <Typography variant="h4" color="white" textAlign="center">
          You’ve Entered the Void Between Realities!
        </Typography>
        <Typography variant="h6" color="white" textAlign="center">
          This space exists and doesn’t exist, all at once. Welcome to
          <span style={{ color: "wheat" }}> now</span>here
        </Typography>
        <Typography color="white" textAlign="center">
          Somehow, you’ve slipped past the boundaries of the known world and
          arrived in a place where nothing exists
        </Typography>

        <Box className="center-width" mt={2}>
          <AppButton
            onClick={() => {
              navigate("/");
            }}
            variant="outlined"
            sx={{ color: "white", borderColor: "white" }}
          >
            Home
          </AppButton>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
