import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageCircle } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isGuestLoggingIn, setIsGuestLoggingIn] = useState(false);

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  const handleGuestLogin = async () => {
    setIsGuestLoggingIn(true);
    try {
      await login({
        email: "guest@gmail.com",
        password: "guest@123",
      });
    } finally {
      setIsGuestLoggingIn(false);
    }
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center sm:px-4 px-0 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />

      {/* Card */}
      <div className="relative w-full sm:h-full h-[100svh] max-w-md bg-base-100/80 backdrop-blur border border-primary/10 rounded-none sm:rounded-2xl shadow-xl sm:p-8 px-2 py-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
            <MessageCircle className="text-primary-content" />
          </div>
          <h1 className="text-2xl font-bold mt-4">Welcome back</h1>
          <p className="text-base-content/60 mt-1">
            Log in to continue chatting
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="form-control space-y-1">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
              <input
                type="email"
                className="input input-bordered w-full pl-10 py-6 rounded-md sm:rounded-xl bg-transparent" 
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control space-y-1">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 py-6 rounded-md sm:rounded-xl bg-transparent"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-base-content/40" />
                ) : (
                  <Eye className="w-5 h-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="btn btn-primary w-full rounded-md sm:rounded-xl py-6"
            disabled={isLoggingIn || isGuestLoggingIn}
          >
            {isLoggingIn && !isGuestLoggingIn ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="ml-2">Logging in...</span>
              </>
            ) : (
              "Log in"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 text-sm text-base-content/50">
            <div className="flex-1 h-px bg-primary/10" />
            OR
            <div className="flex-1 h-px bg-primary/10" />
          </div>

          {/* Guest login */}
          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={isLoggingIn || isGuestLoggingIn}
            className="btn btn-outline w-full rounded-md sm:rounded-xl py-6"
          >
            {isGuestLoggingIn ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="ml-2">Logging in as Guest...</span>
              </>
            ) : (
              "Continue as Guest"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-base-content/60 mt-6">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="link link-primary no-underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
