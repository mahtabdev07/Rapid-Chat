import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const LandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300">
      <div className="max-w-[87rem] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <MessageCircle className="text-primary-content" size={18} />
          </div>
          <span className="text-xl font-semibold">Chatify</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn btn-ghost btn-md">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary btn-md">
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
};