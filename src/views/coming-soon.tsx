import React from "react";
import { Title, Text, Box } from "@mantine/core";

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
      <Title order={2} style={{ color: "#333", marginBottom: "0.5rem" }}>
        Coming Soon...
      </Title>
      <Text size="sm" color="dimmed">
        Stay tuned!
      </Text>
    </Box>
  );
}

export default ComingSoon;
