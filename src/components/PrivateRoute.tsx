import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: React.ComponentType<Record<string, never>>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Component }) => {
  const token = localStorage.getItem('admin_token');
  return token ? <Component /> : <Navigate to="/admin" replace />;};

export default PrivateRoute;