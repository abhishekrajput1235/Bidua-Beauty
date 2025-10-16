// src/components/auth/ProtectedAdminRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { user, token } = useAuthStore();

  if (!token || !user) {
    // 🚫 Not logged in
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // 🚫 Logged in but not an admin
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return <>{children}</>;
}
