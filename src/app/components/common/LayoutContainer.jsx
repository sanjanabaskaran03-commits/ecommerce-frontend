"use client";

import { Container } from "@mui/material";

const LayoutContainer = ({ children }) => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        maxWidth: "1280px",
        margin: "0 auto",
        px: 2
      }}
    >
      {children}
    </Container>
  );
};

export default LayoutContainer; 
