import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect them to the /auth page, but save the current location they were trying to go to
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Role not authorized, redirect to their respective dashboard
    if (user.role === 'farmer') return <Navigate to="/dashboard/farmer" replace />;
    if (user.role === 'buyer') return <Navigate to="/dashboard/buyer" replace />;
    if (user.role === 'admin') return <Navigate to="/dashboard/admin" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
}
