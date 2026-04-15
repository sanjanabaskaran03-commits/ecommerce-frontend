import AuthCard from "@/src/app/components/auth/AuthCard";
import AuthHeader from "@/src/app/components/auth/AuthHeader";
import LoginForm from "@/src/app/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard>
      <AuthHeader title="Login" />
      <LoginForm />
    </AuthCard>
  );
}