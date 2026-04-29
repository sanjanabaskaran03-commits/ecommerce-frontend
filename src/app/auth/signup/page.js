"use client";

import AuthCard from "@/src/app/components/auth/AuthCard";
import AuthHeader from "@/src/app/components/auth/AuthHeader";
import SignupForm from "@/src/app/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <>
    <AuthCard>
      <AuthHeader title="Sign Up" />
      <SignupForm />
    </AuthCard>
    </>
  );
}
