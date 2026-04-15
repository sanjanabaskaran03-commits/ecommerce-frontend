"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth/login");
  };

  return (
    <Box
      sx={{
        height: 60,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        px: 3,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography fontWeight={600}>Admin Dashboard</Typography>

      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
}