import { MessageCircle, ShieldCheck, Zap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LandingNavbar } from "../components/LandingNavbar";

export default function LandingPage() {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;
  if (authUser) return <Navigate to="/app" replace />;

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <LandingNavbar />
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-22 sm:py-34 grid md:grid-cols-2 gap-16 items-center sm:text-start text-center">
          <div className="w-full max-w-xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Real‑time conversations.
              <br />
              <span className="text-primary">Zero friction.</span>
            </h1>
            <p className="mt-6 text-base-content/70 max-w-md">
              A fast, secure real‑time chat app with online presence, instant
              notifications, and a clean modern UI.
            </p>
            <div className="mt-8 flex gap-4 sm:justify-start justify-center">
              <Link to="/login" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/signup" className="btn btn-outline">
                Create Account
              </Link>
            </div>
          </div>

          {/* MOCK CHAT CARD */}
          <div className="relative">
            <div className="bg-base-200 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <div>
                    <div className="h-3 w-24 bg-base-300 rounded" />
                    <div className="h-2 w-16 bg-base-300 rounded mt-2" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-2/3 h-3 bg-base-300 rounded" />
                <div className="w-1/2 h-3 bg-base-300 rounded" />
              </div>
              <div className="flex items-center justify-between mb-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20" />
                  <div>
                    <div className="h-3 w-24 bg-base-300 rounded" />
                    <div className="h-2 w-16 bg-base-300 rounded mt-2" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-2/3 h-3 bg-base-300 rounded" />
                <div className="w-1/2 h-3 bg-base-300 rounded" />
                <div className="w-3/4 h-3 bg-primary/40 rounded ml-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-base-300">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-semibold text-center">
            Built for modern communication
          </h2>
          <p className="text-center text-base-content/70 mt-4 max-w-xl mx-auto">
            Everything you expect from a production‑ready chat application.
          </p>

          <div className="grid md:grid-cols-4 gap-8 mt-16">
            <Feature
              icon={<Zap />}
              title="Real‑time"
              desc="Instant message delivery using Socket.IO."
            />
            <Feature
              icon={<Users />}
              title="Online Presence"
              desc="Know who’s online, instantly."
            />
            <Feature
              icon={<MessageCircle />}
              title="Smart Notifications"
              desc="Sound + toast notifications."
            />
            <Feature
              icon={<ShieldCheck />}
              title="Secure"
              desc="Auth‑protected conversations."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-base-200 border-t border-base-300">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h3 className="text-3xl font-semibold">Start chatting in seconds</h3>
          <p className="text-base-content/70 mt-3">
            Sign up and experience real‑time messaging the right way.
          </p>
          <div className="mt-8">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Create free account
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-base-300 py-6 text-center text-sm text-base-content/60">
        © {new Date().getFullYear()} Realtime Chat App
      </footer>
    </div>
  );
}

const Feature = ({ icon, title, desc }) => (
  <div className="text-center">
    <div className="mx-auto w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h4 className="font-medium">{title}</h4>
    <p className="text-sm text-base-content/70 mt-2">{desc}</p>
  </div>
);
