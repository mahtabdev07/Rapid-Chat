import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import MainLayout from "./components/MainLayout";
import LandingPage from "./pages/LandingPage";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();

  console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <Loader className="size-10 animate-spin" />
        <p className="text-sm text-base-content/70">
          Please wait, the server will start in few seconds...
        </p>
      </div>
    );

  return (
    <div data-theme="night">
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={authUser ? <HomePage /> : <LandingPage />} />
          <Route
            path="/profile"
            element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
