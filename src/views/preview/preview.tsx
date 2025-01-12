import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ParticleBackground from "../../components/particle-background/particle-background";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

type Props = {};

function Preview({}: Props) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        zIndex: 10,
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      <ParticleBackground />
    </Box>
  );
}

export default Preview;
