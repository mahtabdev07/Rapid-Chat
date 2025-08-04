import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isGuestLoggingIn, setIsGuestLoggingIn] = useState(false);

  const { login, isLoggingIn } = useAuthStore();

  // Handler for normal login
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  // Handler for guest login
  const handleGuestLogin = async () => {
    setIsGuestLoggingIn(true);
    const guestCredentials = {
      email: "guest@gmail.com",
      password: "guest@123",
    };
    try {
      await login(guestCredentials);
    } finally {
      setIsGuestLoggingIn(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-2 sm:p-12 h-screen">
      <div className="w-full max-w-md space-y-8 border border-primary/10 shadow p-10 rounded-4xl">
        {/* Logo and Heading */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
            <p className="text-base-content/60">Log in to your account</p>
          </div>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="text"
                className="input input-bordered rounded-xl text-lg py-6 bg-transparent focus:border-base-content/40 focus:outline-base-content/40 w-full pl-10"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                autoComplete="email"
                required
              />
            </div>
          </div>
          {/* Password Field */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered rounded-xl text-lg py-6 bg-transparent focus:border-base-content/40 focus:outline-base-content/40 w-full pl-10"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40 cursor-pointer" />
                )}
              </button>
            </div>
          </div>
          {/* Login Buttons */}
          <div className="flex flex-col items-center gap-3">
            {/* Normal Login */}
            <button
              type="submit"
              className="btn btn-primary w-full rounded-xl py-6"
              disabled={isLoggingIn || isGuestLoggingIn}
            >
              {isLoggingIn && !isGuestLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="ml-2">Logging in...</span>
                </>
              ) : (
                "Log in"
              )}
            </button>
            {/* Guest Login */}
            <button
              type="button"
              className="btn border border-white/40 w-full rounded-xl py-6"
              disabled={isLoggingIn || isGuestLoggingIn}
              onClick={handleGuestLogin}
            >
              {isGuestLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="ml-2">Logging in as Guest...</span>
                </>
              ) : (
                "Login as a Guest"
              )}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-base-content/60">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
