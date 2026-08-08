import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Waves, UserPlus, Eye, EyeOff } from "lucide-react";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      await registerUser(values);
      toast.success("Account created — please sign in");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
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
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-ink-500 dark:text-ink-400">
            Start organizing your work with Flow
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4 p-6">
          <Input
            id="name"
            label="Full name"
            placeholder="Jane Doe"
            error={errors.name?.message}
            {...register("name")}
          />
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
              placeholder="At least 6 characters"
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

          <Button type="submit" className="w-full" loading={isSubmitting} icon={UserPlus}>
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-500 dark:text-ink-400">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-cobalt-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
