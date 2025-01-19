import { Box, Container, CssBaseline, Typography } from "@mui/material";
import React from "react";
import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import ParticleBackground from "../particle-background/particle-background";
import AppButton from "../form/app-button";

// TODO change
function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error)) {
    return (
      <div
        style={{
          padding: "1rem",
          height: "100vh",
          display: "grid",
          placeItems: "center",
          color: "white",
          backgroundColor: "black",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Error</h1>
          <p>Status: {error.status}</p>
          <p>{error.statusText || "An unknown error occurred"}</p>
        </div>
      </div>
    );
  }

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
      }}
    >
      <ParticleBackground />
      <Container component="main">
        <CssBaseline />

        <Typography variant="h4" color="white" textAlign="center">
          Anomaly detected in this space!
        </Typography>
        <Typography color="white" textAlign="center">
          It seems a rift in the fabric of space has occurred. Please contact
          the aliens 🛸 to check on it
        </Typography>
        <Typography color="white" textAlign="center">
          While the anomaly is being resolved or stabilized, try refreshing the
          page or navigating back to safety
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
          <AppButton
            onClick={() => {
              navigate(0);
            }}
            variant="outlined"
            sx={{ color: "white", borderColor: "white", ml: 2 }}
          >
            Reload
          </AppButton>
        </Box>
      </Container>
    </Box>
  );
}

export default ErrorBoundary;
