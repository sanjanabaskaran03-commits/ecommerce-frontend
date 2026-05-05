"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      if (data.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        const next = searchParams.get("next");
        if (next) {
          router.push(next);
        } else {
          router.push("/");
        }
      }

      window.dispatchEvent(new Event("auth-changed"));
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Email"
        name="email"
        value={form.email}
        fullWidth
        onChange={handleChange}
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        fullWidth
        onChange={handleChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleTogglePassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  {showPassword ? <VisibilityOff sx={{ fontSize: '1.25rem' }} /> : <Visibility sx={{ fontSize: '1.25rem' }} />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>

      <Typography variant="body2">
        Don&apos;t have an account?{" "}
        <Link href="/auth/signup" style={{ color: "#0D6EFD", fontWeight: 500 }}>
          Signup
        </Link>
      </Typography>
    </Stack>
  );
}
