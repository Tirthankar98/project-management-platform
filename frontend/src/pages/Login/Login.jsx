import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Waves, Mail, Eye, EyeOff } from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      await login(values);
      toast.success("Welcome back!");
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4 dark:bg-ink-950">
      <div className="w-full max-w-sm animate-fadeIn">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-cobalt-500 text-white shadow-pop">
            <Waves size={22} />
          </div>
          <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">
            Sign in to continue to Flow
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4 p-6">
          <Input
            id="email"
            label="Email"
            type="email"
            placeholder="you@company.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <div className="relative">
            <Input
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-[34px] text-ink-400 hover:text-ink-600"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <Button type="submit" className="w-full" loading={isSubmitting} icon={Mail}>
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="font-medium text-cobalt-600 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
