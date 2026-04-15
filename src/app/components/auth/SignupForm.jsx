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
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();

 const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
});

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

 const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name:form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("Signup successful");
      router.push("/auth/login");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
  label="Name"
  name="name"
  fullWidth
  onChange={handleChange}
/>
      <TextField
        label="Email"
        name="email"
        fullWidth
        onChange={handleChange}
      />

      {/* PASSWORD */}
      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        fullWidth
        onChange={handleChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirm ? "text" : "password"}
        fullWidth
        onChange={handleChange}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
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

      <Button variant="contained" onClick={handleSignup}>
        Sign Up
      </Button>

      <Typography variant="body2" sx={{textAlign:"center"}}>
        Already have an account?{" "}
        <Link href="/auth/login" style={{ color: "#0D6EFD", fontWeight: 500 }}>
          Login
        </Link>
      </Typography>
    </Stack>
  );
}