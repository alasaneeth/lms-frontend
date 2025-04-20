import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/AuthService/Auth';
import Auth from '../../services/AuthService/Auth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {

  console.log(AuthService.isAuthenticated())
  
 return AuthService.isAuthenticated() ? <>{children}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;
